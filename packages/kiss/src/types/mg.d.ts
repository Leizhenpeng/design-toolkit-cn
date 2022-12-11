declare namespace masterGo {
        const mastergo: PluginAPI
        const mg: PluginAPI
        const console: Console
        const __html__: string

        function setTimeout(callback: Function, timeout: number): number
        function clearTimeout(timeoutID: number): void
        function setInterval(callback: Function, timeout: number): number
        function clearInterval(timeoutID: number): void
        function requestAnimationFrame(cb: (ts: number) => void): number
        function cancelAnimationFrame(requestID: number): void

        interface Console {
            log(message?: any, ...optionalParams: any[]): void
            error(message?: any, ...optionalParams: any[]): void
            assert(condition?: boolean, message?: string, ...data: any[]): void
            info(message?: any, ...optionalParams: any[]): void
            warn(message?: any, ...optionalParams: any[]): void
            clear(): void
        }

        interface Image {
            readonly href: string
            getBytesAsync(): Promise<Uint8Array>
        }

        type PluginEventType = 'selectionchange' | 'currentpagechange' | 'close' | 'themechange' | 'drop' | 'run'
        type ThemeColor = 'dark' | 'light'

        interface PluginAPI {
            readonly document: DocumentNode

            readonly ui: UIAPI

            readonly themeColor: ThemeColor

            readonly apiVersion: string

            readonly documentId: number

            readonly command: string

            readonly clientStorage: ClientStorageAPI

            readonly viewport: ViewportAPI

            closePlugin(): void

            on(type: PluginEventType, callback: CallableFunction): void
            once(type: PluginEventType, callback: CallableFunction): void
            off(type?: PluginEventType, callback?: CallableFunction): void

            commitUndo(): void
            triggerUndo(): void

            showUI(html: string, options?: ShowUIOptions): void

            getNodeById(id: string): SceneNode | null
            createRectangle(): RectangleNode
            createLine(): LineNode
            createEllipse(): EllipseNode
            createPolygon(): PolygonNode
            createStar(): StarNode
            createPen(): PenNode
            createText(): TextNode
            createFrame(children?: SceneNode[]): FrameNode
            createComponent(children?: SceneNode[]): ComponentNode
            createPage(): PageNode
            createSlice(): SliceNode
            createConnector(): ConnectorNode
            createNodeFromSvgAsync(svg: string): Promise<FrameNode>

            getHoverLayer(): PageNode | SceneNode

            /**
             * @deprecated
             * This function is deprecated, please use viewport.layoutGridVisible instead.
             */
            showGrid(show: boolean): void

            group(children: SceneNode[]): GroupNode
            union(children: SceneNode[]): BooleanOperationNode
            subtract(children: SceneNode[]): BooleanOperationNode
            intersect(children: SceneNode[]): BooleanOperationNode
            exclude(children: SceneNode[]): BooleanOperationNode
            flatten(nodes: SceneNode[]): PenNode

            saveVersionHistoryAsync(desc: string): Promise<void>

            notify(message: string, options?: NotifyOptions): void

            getStyleById(id: string): Style | null
            getTitleByFontFamilyAndStyle(fontFamily: string, fontStyle: string): FontAlias | null
            createFillStyle(config: CreateStyleConfig): PaintStyle
            createStrokeStyle(config: CreateStyleConfig): PaintStyle
            createEffectStyle(config: CreateStyleConfig): EffectStyle
            createTextStyle(config: CreateStyleConfig): TextStyle
            createGridStyle(config: CreateStyleConfig): GridStyle

            getLocalPaintStyles(): PaintStyle[]
            getLocalEffectStyles(): EffectStyle[]
            getLocalTextStyles(): TextStyle[]
            getLocalGridStyles(): GridStyle[]

            listAvailableFontsAsync(): Promise<Font[]>
            loadFontAsync(fontName: FontName): Promise<boolean>
            createImage(imageData: Uint8Array): Promise<Image>
            getImageByHref(href: string): Image

            /**
             * 订阅团队库数据
             */
            teamLibrary: TeamLibrary,
            importComponentByKeyAsync(ukey: string): Promise<ComponentNode>,
            importComponentSetByKeyAsync(ukey: string): Promise<ComponentSetNode>,
            importStyleByKeyAsync(ukey: string): Promise<Style>,

            hexToRGBA(hex: string): RGBA
            RGBAToHex(rgba: RGBA): string
        }

        interface Rect {
            readonly x: number
            readonly y: number
            readonly width: number
            readonly height: number
        }

        interface ViewportAPI {
            center: Vector
            zoom: number
            readonly bound: Rect
            rulerVisible: boolean
            layoutGridVisible: boolean
            scrollAndZoomIntoView(nodes: SceneNode[]): void
        }

        interface ClientStorageAPI {
            getAsync(key: string): Promise<any | undefined>
            setAsync(key: string, value: any): Promise<void>
            deleteAsync(key: string): Promise<void>
            keysAsync(): Promise<string[]>
        }

        type ShowUIOptions = {
            width?: number
            height?: number
            visible?: boolean
            x?: number | string
            y?: number | string
        }

        interface ExportSettingsConstraints {
            type: 'SCALE' | 'WIDTH' | 'HEIGHT'
            value: number
        }
        type ExportFileFormat = 'PNG' | 'JPG' | 'SVG' | 'PDF' | 'WEBP'
        type ExportSettings = {
            format: ExportFileFormat
            constraint?: ExportSettingsConstraints
            isSuffix?: boolean
            fileName?: string
            readonly useAbsoluteBounds?: boolean
        }

        interface ExportMixin {
            exportSettings: ReadonlyArray<ExportSettings>
            export(settings?: ExportSettings): Uint8Array | string // Defaults to PNG format
        }

        interface NotifyOptions {
            position?: 'top' | 'bottom'
            type?: 'normal' | 'highlight' | 'error' | 'warning' | 'success'
        }

        interface UIAPI {
            show(): void
            hide(): void
            close(): void
            resize(width: number, height: number): void

            postMessage(pluginMessage: any, origin?: string): void
            onmessage: ((pluginMessage: any, origin: string) => void) | undefined
        }
        type PublishStatus = 'UNPUBLISHED' | 'CURRENT' | 'CHANGED'
        interface PublishableMixin {
            description: string
            /**
             * 是否为团队库组件/样式
            */
            readonly isExternal: boolean
            readonly ukey: string
            readonly publishStatus: PublishStatus
        }

        /// /////////////////////////////////////////////////////////////////////////////
        // Styles

        type StyleType = 'PAINT' | 'TEXT' | 'EFFECT' | 'GRID'

        interface BaseStyle extends PublishableMixin {
            readonly id: string
            readonly type: StyleType
            name: string
            remove(): void
        }

        interface PaintStyle extends BaseStyle {
            type: 'PAINT'
            paints: ReadonlyArray<Paint>
        }

        interface NumValue {
            value: number
            unit: 'PIXELS' | 'PERCENT'
        }

        interface TextSegStyle {
            start: number
            end: number
            textStyleId: string
            textStyle: {
                fontName: FontName
                fontSize: number
                letterSpacing: LetterSpacing
                lineHeight: LineHeight
                textDecoration: TextDecoration
                textCase: TextCase
                fontWeight: number
            }
            fills: Paint[]
        }

        interface ListStyle {
            start: number
            end: number
            level: number
            type: 'ORDERED' | 'BULLETED' | 'NONE'
        }

        interface EffectStyle extends BaseStyle {
            type: 'EFFECT'
            effects: ReadonlyArray<Effect>
        }

        interface TextStyle extends BaseStyle {
            type: 'TEXT'
            decoration: TextDecoration
            fontSize: number
            letterSpacing: number
            letterSpacingUnit: NumValue['unit']
            textCase: TextCase
            lineHeight: LineHeight
        }

        interface FontAlias {
            title: string
            subtitle: string
        }

        interface GridStyle extends BaseStyle {
            type: 'GRID'
            layoutGrids: ReadonlyArray<LayoutGrid>
        }

        type Style = PaintStyle | EffectStyle | TextStyle | GridStyle

        /// /////////////////////////////////////////////////////////////////////////////
        // Datatypes

        type Transform = [[number, number, number], [number, number, number]]

        interface Vector {
            readonly x: number
            readonly y: number
        }

        interface RGB {
            readonly r: number
            readonly g: number
            readonly b: number
        }

        interface RGBA {
            readonly r: number
            readonly g: number
            readonly b: number
            readonly a: number
        }

        interface FontName {
            readonly family: string
            readonly style: string
        }

        type TextCase = 'ORIGINAL' | 'UPPER' | 'LOWER' | 'TITLE';

        type TextDecoration = 'NONE' | 'UNDERLINE' | 'STRIKETHROUGH'

        interface ShadowEffect {
            readonly type: 'DROP_SHADOW' | 'INNER_SHADOW'
            readonly color: RGBA
            // Effect的 x, y;
            readonly offset: Vector
            readonly spread: number
            readonly radius: number
            readonly isVisible: boolean
            readonly blendMode: BlendMode
        }

        interface BlurEffect {
            readonly type: 'LAYER_BLUR' | 'BACKGROUND_BLUR'
            readonly radius: number
            readonly isVisible: boolean
            readonly blendMode: BlendMode
        }

        type Effect = ShadowEffect | BlurEffect

        // 待确认
        type ConstraintType = 'START' | 'END' | 'STARTANDEND' | 'CENTER' | 'SCALE'

        interface Constraints {
            readonly horizontal: ConstraintType
            readonly vertical: ConstraintType
        }

        interface ColorStop {
            readonly position: number
            readonly color: RGBA
        }

        interface SolidPaint {
            readonly type: 'SOLID'
            readonly color: RGBA

            readonly isVisible?: boolean
            /**
             * It always be 1 when type is 'SOLID', please modify the alpha field in color instead.
             * 纯色模式下alpha始终为1, 请设置color中的alpha.
             */
            readonly alpha?: number
            readonly blendMode?: BlendMode
        }

        interface GradientPaint {
            readonly type:
            | 'GRADIENT_LINEAR'
            | 'GRADIENT_RADIAL'
            | 'GRADIENT_ANGULAR'
            | 'GRADIENT_DIAMOND'
            readonly transform: Transform
            readonly gradientStops: ReadonlyArray<ColorStop>
            readonly gradientHandlePositions?: [{ x: number, y: number }, { x: number, y: number }];
            readonly isVisible?: boolean
            readonly alpha?: number
            readonly blendMode?: BlendMode
        }

        interface ImagePaint {
            readonly type: 'IMAGE'
            readonly imageRef: string
            readonly scaleMode?: 'FILL' | 'TILE' | 'STRETCH' | 'FIT' | 'CROP'

            readonly isVisible?: boolean
            readonly alpha?: number
            readonly blendMode?: BlendMode
        }

        type Paint = SolidPaint | GradientPaint | ImagePaint

        type WindingRule = 'Nonzero' | 'Evenodd'

        // 待确定
        interface VectorVertex {
            readonly id: number
            readonly x: number
            readonly y: number
            readonly type: 'PATH_NODE' | 'CONTROL_NODE' // 0 路径端点  1 控制节点
            readonly strokeCap?: StrokeCap
            readonly strokeJoin?: StrokeJoin
            readonly cornerRadius?: number
        }

        // 待确定
        interface VectorRegion {
            readonly id: number
            readonly windingRule: WindingRule
            readonly pathIds?: ReadonlyArray<number>
        }

        interface VectorCtrl {
            x: number
            y: number
        }

        type LetterSpacing = {
            readonly value: number
            readonly unit: 'PIXELS' | 'PERCENT'
        }

        type LineHeight =
            | {
                readonly value: number
                readonly unit: 'PIXELS' | 'PERCENT'
            }
            | {
                readonly unit: 'AUTO'
            }

        type BlendMode =
            | 'NORMAL'
            | 'DARKEN'
            | 'MULTIPLY'
            | 'COLOR_BURN'
            | 'LIGHTEN'
            | 'SCREEN'
            | 'COLOR_DODGE'
            | 'OVERLAY'
            | 'SOFT_LIGHT'
            | 'HARD_LIGHT'
            | 'DIFFERENCE'
            | 'EXCLUSION'
            | 'HUE'
            | 'SATURATION'
            | 'COLOR'
            | 'LUMINOSITY'
            | 'PLUS_DARKER'
            | 'PLUS_LIGHTER'
            | 'PASS_THROUGH'

        interface Font {
            fontName: FontName
        }

        /// /////////////////////////////////////////////////////////////////////////////
        // Mixins

        interface BaseNodeMixin {
            readonly id: string
            readonly parent: (BaseNode & ChildrenMixin) | void
            name: string
            removed: boolean
            remove(): void
            getPluginData(key: string): string
            setPluginData(key: string, value: string): void
            getPluginDataKeys(): string[]
            removePluginData(key: string): void
            clearPluginData(): void
            getSharedPluginData(namespace: string, key: string): string
            setSharedPluginData(namespace: string, key: string, value: string): void
            getSharedPluginDataKeys(namespace: string): void
            removeSharedPluginData(namespace: string, key: string): void
            clearSharedPluginData(namespace: string): void
        }

        interface SceneNodeMixin {
            isVisible: boolean
            isLocked: boolean
        }

        interface ChildrenMixin<ChildrenNode = SceneNode> {
            readonly children: ReadonlyArray<ChildrenNode>
            appendChild(child: SceneNode): void
            insertChild(index: number, child: SceneNode): void

            findChildren(
                callback?: (node: SceneNode) => boolean
            ): ReadonlyArray<SceneNode>
            findChild(callback: (node: SceneNode) => boolean): SceneNode | null

            findAll(callback?: (node: SceneNode) => boolean): ReadonlyArray<SceneNode>
            findOne(callback: (node: SceneNode) => boolean): SceneNode | null
            findAllWithCriteria<T extends NodeType[]>(criteria: { types: T }): Array<{ type: T[number] } & SceneNode>
        }

        interface ConstraintMixin {
            constraints: Constraints
        }

        interface Bound {
            x: number
            y: number
            width: number
            height: number
        }

        type ScaleCenter = 'TOPLEFT' | 'TOP' | 'TOPRIGHT' | 'LEFT' | 'CENTER' | 'RIGHT' | 'BOTTOMLEFT' | 'BOTTOM' | 'BOTTOMRIGHT'

        interface ScaleOption {
            scaleCenter?: ScaleCenter
        }

        interface LayoutMixin {
            absoluteTransform: Transform
            relativeTransform: Transform
            bound: Bound
            x: number
            y: number
            width: number
            height: number
            rotation: number // In degrees
            constrainProportions: boolean
            layoutPositioning: 'AUTO' | 'ABSOLUTE' // applicable only inside auto-layout frames
            alignSelf: 'STRETCH' | 'INHERIT' // applicable only inside auto-layout frames
            flexGrow: 0 | 1 // applicable only inside auto-layout frames
            rescale(scale: number, scaleOption?: ScaleOption): void
            flip(direction: 'VERTICAL' | 'HORIZONTAL'): void
        }

        interface BlendMixin {
            opacity: number
            blendMode: BlendMode
            isMask: boolean
            effects: ReadonlyArray<Effect>
            effectStyleId: string
        }

        type StrokeCap = 'NONE' | 'ROUND' | 'SQUARE' | 'LINE_ARROW' | 'TRIANGLE_ARROW' | 'ROUND_ARROW' | 'RING' | 'DIAMOND' | 'LINE'
        type StrokeJoin = 'MITER' | 'BEVEL' | 'ROUND'
        type StrokeAlign = 'CENTER' | 'INSIDE' | 'OUTSIDE'
        type DashCap = 'NONE' | 'ROUND' | 'SQUARE'
        type StrokeStyle = 'SOLID' | 'DASH' | 'CUSTOM'
        type ConnectorStrokeCap = StrokeCap

        interface ConnectorEndpointPosition {
            readonly position: { x: number; y: number }
        }

        interface ConnectorEndpointConnected {
            readonly position: { x: number; y: number }
            readonly endpointNodeId: string
            readonly magnet: 'TOP' | 'LEFT' | 'BOTTOM' | 'RIGHT'
        }


        type ConnectorEndpoint =
            | ConnectorEndpointPosition
            | ConnectorEndpointConnected

        interface GeometryMixin {
            fills: ReadonlyArray<Paint>
            strokes: ReadonlyArray<Paint>
            strokeWeight: number
            strokeAlign: StrokeAlign
            strokeCap: StrokeCap
            strokeJoin: StrokeJoin
            strokeStyle: StrokeStyle
            dashCap: DashCap
            strokeDashes: ReadonlyArray<number>
            fillStyleId: string
            strokeStyleId: string
            /**
             * You have to ensure the layer has stroke before invoking this method.
             * 在调用接口之前需要确保layer有描边.
             */
            outlineStroke(): SceneNode | null
        }

        interface RectangleStrokeWeightMixin {
            strokeTopWeight: number
            strokeLeftWeight: number
            strokeBottomWeight: number
            strokeRightWeight: number
        }

        interface CornerMixin {
            // 待确认
            cornerSmooth: number
            cornerRadius: number | symbol
        }

        interface DefaultShapeMixin
            extends BaseNodeMixin,
            SceneNodeMixin,
            BlendMixin,
            GeometryMixin,
            LayoutMixin,
            ReactionMixin,
            ExportMixin { }

        interface DefaultContainerMixin
            extends BaseNodeMixin,
            ReactionMixin,
            SceneNodeMixin,
            ChildrenMixin,
            RectangleCornerMixin,
            BlendMixin,
            CornerMixin,
            ConstraintMixin,
            LayoutMixin,
            ExportMixin { }

        interface AutoLayout {
            flexMode: 'NONE' | 'HORIZONTAL' | 'VERTICAL'
            itemSpacing: number
            mainAxisAlignItems: 'FLEX_START' | 'FLEX_END' | 'CENTER' | 'SPACING_BETWEEN'
            crossAxisAlignItems: 'FLEX_START' | 'FLEX_END' | 'CENTER'
            mainAxisSizingMode: 'FIXED' | 'AUTO'
            crossAxisSizingMode: 'FIXED' | 'AUTO'
            strokesIncludedInLayout: boolean
            itemReverseZIndex: boolean
            paddingTop: number
            paddingRight: number
            paddingBottom: number
            paddingLeft: number
        }

        interface RowsColsLayoutGrid {
            readonly gridType: "ROWS" | "COLUMNS"

            readonly alignment: "LEFT" | "RIGHT" | "STRETCH" | "CENTER"
            readonly gutterSize: number
            readonly count: number
            readonly sectionSize?: number | null
            readonly offset?: number

            readonly isVisible?: boolean
            readonly color?: RGBA
            readonly id?: string
            readonly name?: string
        }

        interface GridLayoutGrid {
            readonly gridType: "GRID"

            readonly sectionSize: number

            readonly isVisible?: boolean
            readonly color?: RGBA
            readonly id?: string
            readonly name?: string
        }


        type LayoutGrid = RowsColsLayoutGrid | GridLayoutGrid

        interface FrameContainerMixin extends AutoLayout {
            clipsContent: boolean
            layoutGrids: ReadonlyArray<LayoutGrid>
            gridStyleId: string
            overflowDirection: OverflowDirection
        }

        type OverflowDirection = "NONE" | "HORIZONTAL" | "VERTICAL" | "BOTH"

        interface RectangleCornerMixin {
            topLeftRadius: number
            topRightRadius: number
            bottomLeftRadius: number
            bottomRightRadius: number
        }

        interface ReactionMixin {
            reactions: ReadonlyArray<Reaction>
        }

        interface OpaqueNodeMixin extends BaseNodeMixin, SceneNodeMixin, ExportMixin {
            readonly absoluteTransform: Transform
            relativeTransform: Transform
            x: number
            y: number
            readonly width: number
            readonly height: number
            readonly bound: Bound
        }

        interface MinimalBlendMixin {
            opacity: number
            blendMode: BlendMode
        }

        interface MinimalStrokesMixin {
            strokes: ReadonlyArray<Paint>
            strokeStyleId: string
            strokeWeight: number
            strokeJoin: StrokeJoin
            strokeAlign: StrokeAlign
            strokeStyle: StrokeStyle
            strokeCap: StrokeCap
            strokeDashes: ReadonlyArray<number>
            dashCap: DashCap
        }

        interface MinimalFillsMixin {
            fills: ReadonlyArray<Paint>
            fillStyleId: string
        }

        /// /////////////////////////////////////////////////////////////////////////////
        // Nodes

        interface DocumentNode {
            readonly type: 'DOCUMENT'
            name: string

            currentPage: PageNode

            readonly children: ReadonlyArray<PageNode>

            findAll(callback?: (node: SceneNode) => boolean): ReadonlyArray<SceneNode>
            findOne(callback: (node: SceneNode) => boolean): SceneNode | null
            findAllWithCriteria<T extends NodeType[]>(criteria: { types: T }): Array<{ type: T[number] } & SceneNode>
        }

        interface PageNode
            extends
            ChildrenMixin<SceneNode> {
            readonly type: 'PAGE'

            readonly id: string
            readonly parent: DocumentNode
            name: string
            removed: boolean
            remove(): void

            selection: ReadonlyArray<SceneNode>
            clone(): PageNode
            /**
             * 选中所有图层
             */
            selectAll(): void
            /**
             * 背景颜色
             */
            bgColor: RGBA
            /**
             * 原型所有的flow
             */
            readonly flowStartingPoints: FlowStartingPoint[]
            /**
             * 标签,默认'NONE'
             */
            label: 'NONE' | 'BLUE' | 'GREEN' | 'RED' | 'YELLOW' | 'PURPLE' | 'GRAY'
        }

        interface FrameNode extends DefaultContainerMixin, GeometryMixin, FrameContainerMixin, RectangleStrokeWeightMixin {
            readonly type: 'FRAME'
            clone(): FrameNode
            resizeToFit(): void
        }

        interface GroupNode extends DefaultContainerMixin, GeometryMixin, FrameContainerMixin {
            readonly type: 'GROUP'
            clone(): GroupNode
        }

        interface RectangleNode
            extends DefaultShapeMixin,
            ConstraintMixin,
            CornerMixin,
            RectangleStrokeWeightMixin,
            RectangleCornerMixin {
            readonly type: 'RECTANGLE'
            clone(): RectangleNode
        }

        interface LineNode extends DefaultShapeMixin, ConstraintMixin {
            readonly type: 'LINE'
            clone(): LineNode
            readonly height: number
            leftStrokeCap: StrokeCap
            rightStrokeCap: StrokeCap
        }

        interface EllipseNode extends DefaultShapeMixin, ConstraintMixin {
            readonly type: 'ELLIPSE'
            clone(): EllipseNode
            arcData: ArcData
        }

        interface PolygonNode extends DefaultShapeMixin, ConstraintMixin, CornerMixin {
            readonly type: 'POLYGON'
            pointCount: number
            clone(): PolygonNode
        }

        interface StarNode extends DefaultShapeMixin, ConstraintMixin, CornerMixin {
            readonly type: 'STAR'
            pointCount: number
            innerRadius: number
            clone(): StarNode
        }

        // interface VectorPath {
        //   readonly id: number
        //   readonly nodeIds: ReadonlyArray<number>
        // }
        type VectorPath = number[]

        type VectorPaths = ReadonlyArray<VectorPath>

        interface PenNetwork {
            paths: ReadonlyArray<VectorPaths>
            nodes: ReadonlyArray<VectorVertex>
            regions: ReadonlyArray<VectorRegion> | []
            ctrlNodes: ReadonlyArray<VectorCtrl>
        }

        interface PenPaths {
            windingRule: WindingRule
            data: string
        }

        interface PenNode extends DefaultShapeMixin, ConstraintMixin, CornerMixin {
            readonly type: 'PEN'
            penNetwork: PenNetwork
            set penPaths(paths: Array<PenPaths>)
            //@ts-ignore
            get penPaths(): PenPaths
            clone(): PenNode
        }

        interface BooleanOperationNode
            extends DefaultShapeMixin,
            FrameContainerMixin,
            Omit<ChildrenMixin, 'appendChild' | 'insertChild'>,
            CornerMixin {
            readonly type: 'BOOLEAN_OPERATION'
            booleanOperation: 'UNION' | 'INTERSECT' | 'SUBTRACT' | 'EXCLUDE'
            clone(): BooleanOperationNode
        }

        interface TextRangeStyle {
            fontName: FontName
            fontSize: number
            lineHeight: LineHeight
            textDecoration: TextDecoration
            letterSpacing: LetterSpacing
        }

        enum LinkFlagEnum {
            CURRPAGE = 'currPage',
            OTHERPAGE = 'otherPage',
            PROTOTYPE = 'prototype',
            OUTFILE = 'outFile',
            OWNWEBSITE = 'ownWebsite',
            OTHERLINK = 'otherLink',
        }

        interface Superlink {
            start: number
            end: number
            superlink: {
                layerId?: string
                link: string
                linkFlag: LinkFlagEnum
                pageId: string
            }
        }

        interface Hyperlink {
            type: 'PAGE' | 'NODE' | 'URL',
            value: string
        }
        interface HyperlinkWithRange {
            start: number
            end: number
            hyperlink: Hyperlink
        }

        interface TextNode extends DefaultShapeMixin, ConstraintMixin {
            readonly type: 'TEXT'
            characters: string
            readonly hasMissingFont: boolean
            /**
             * @deprecated
             * This attribute is deprecated, please use hyperlinks instead.
             */
            readonly superlinks: Array<Superlink>
            readonly hyperlinks: Array<HyperlinkWithRange>
            textAlignHorizontal: 'LEFT' | 'CENTER' | 'RIGHT' | 'JUSTIFIED'
            textAlignVertical: 'TOP' | 'CENTER' | 'BOTTOM'
            textAutoResize: 'NONE' | 'WIDTH_AND_HEIGHT' | 'HEIGHT'
            paragraphSpacing: number
            readonly textStyles: ReadonlyArray<TextSegStyle>
            readonly listStyles: ReadonlyArray<ListStyle>
            clone(): TextNode

            insertCharacters(start: number, characters: string): void
            deleteCharacters(start: number, end: number): void

            setRangeFontSize(start: number, end: number, fontSize: number): void
            setRangeTextDecoration(
                start: number,
                end: number,
                decoration: TextDecoration
            ): void
            setRangeFontName(start: number, end: number, fontName: FontName): void
            setRangeLetterSpacing(
                start: number,
                end: number,
                value: LetterSpacing
            ): void
            setRangeLineHeight(start: number, end: number, value: LineHeight): void
            setRangeFills(start: number, end: number, paints: Paint[]): void
            /**
             * @deprecated
             * This function is deprecated, please use setRangeHyperlink instead.
             */
            setRangeSuperLink(start: number, end: number, link: string | null): void
            setRangeHyperlink(start: number, end: number, hyperlink: Hyperlink | null): void
            setRangeTextCase(start: number, end: number, textCase: TextCase): void
            setRangeListStyle(start: number, end: number, type: 'ORDERED' | 'BULLETED' | 'NONE'): void

            setRangeFillStyleId(start: number, end: number, fillStyleId: string): void
            setRangeTextStyleId(start: number, end: number, textStyleId: string): void
        }

        interface ComponentNode extends DefaultContainerMixin, GeometryMixin, FrameContainerMixin, RectangleStrokeWeightMixin, PublishableMixin {
            readonly type: 'COMPONENT'
            readonly variantProperties: Array<VariantProperty> | undefined
            setVariantPropertyValues(property: Record<string, string>): void
            clone(): ComponentNode
            createInstance(): InstanceNode
            resizeToFit(): void
        }


        type VariantMixin = {
            property: string
            type: 'variant'
            values: string[]
        }

        interface VariantProperty {
            property: string
            value: string
        }

        type ComponentPropertyDefinitions = Array<VariantMixin>

        interface ComponentSetNode extends Omit<DefaultContainerMixin, 'appendChild' | 'insertChild'>, GeometryMixin, FrameContainerMixin, RectangleStrokeWeightMixin, PublishableMixin {
            readonly type: 'COMPONENT_SET'
            readonly componentPropertyDefinitions: ComponentPropertyDefinitions
            clone(): ComponentSetNode
            createVariantComponent(): void
            createVariantProperties(properties: Array<string>): void
            editVariantProperties(properties: Record<string, string>): void
            editVariantPropertyValues(properties: Record<string, { oldValue: string, newValue: string }>): void
            deleteVariantProperty(property: string): void
            resizeToFit(): void
        }

        interface InstanceNode extends Omit<DefaultContainerMixin, 'appendChild' | 'insertChild'>, GeometryMixin, FrameContainerMixin, RectangleStrokeWeightMixin {
            readonly type: 'INSTANCE'
            readonly variantProperties: Array<VariantProperty> | undefined
            setVariantPropertyValues(property: Record<string, string>): void
            clone(): InstanceNode
            /**
             * this is an async func
             */
            swapComponent(): void
            detachInstance(): InstanceNode
            mainComponent: ComponentNode | null
        }

        interface SliceNode extends BaseNodeMixin, LayoutMixin, ConstraintMixin, SceneNodeMixin, ExportMixin {
            readonly type: 'SLICE'
            clone(): SliceNode
            isPreserveRatio: boolean
        }

        interface ConnectorNode extends OpaqueNodeMixin, Pick<MinimalBlendMixin, 'opacity'>, Omit<MinimalStrokesMixin, 'strokeAlign'> {
            readonly type: 'CONNECTOR'
            createText(): TextSublayerNode
            readonly text: TextSublayerNode | null
            cornerRadius?: number
            connectorStart: ConnectorEndpoint
            connectorEnd: ConnectorEndpoint
            connectorStartStrokeCap: ConnectorStrokeCap
            connectorEndStrokeCap: ConnectorStrokeCap
            readonly strokeAlign: 'CENTER'
            clone(): ConnectorNode
        }

        interface TextSublayerNode extends MinimalFillsMixin {
            readonly id: string
            readonly hasMissingFont: boolean
            readonly textAlignHorizontal: 'CENTER'
            readonly textAlignVertical: 'CENTER'
            readonly textAutoResize: 'WIDTH_AND_HEIGHT'
            readonly hyperlinks: Array<HyperlinkWithRange>

            readonly textStyles: ReadonlyArray<TextSegStyle>

            paragraphSpacing: number

            characters: string
            insertCharacters(start: number, characters: string): void
            deleteCharacters(start: number, end: number): void

            setRangeFontSize(start: number, end: number, fontSize: number): void
            setRangeTextDecoration(
                start: number,
                end: number,
                decoration: TextDecoration
            ): void
            setRangeFontName(start: number, end: number, fontName: FontName): void
            setRangeLetterSpacing(
                start: number,
                end: number,
                value: LetterSpacing
            ): void
            setRangeLineHeight(start: number, end: number, value: LineHeight): void
            setRangeFills(start: number, end: number, paints: Paint[]): void
            setRangeHyperlink(start: number, end: number, hyperlink: Hyperlink | null): void
            setRangeTextCase(start: number, end: number, textCase: TextCase): void

            setRangeListStyle(start: number, end: number, type: 'ORDERED' | 'BULLETED' | 'NONE'): void

            setRangeFillStyleId(start: number, end: number, fillStyleId: string): void
            setRangeTextStyleId(start: number, end: number, textStyleId: string): void
        }


        interface CreateStyleConfig {
            name: string;
            /**
             * layerId
             */
            id: string;
            description?: string;
        }

        interface FlowStartingPoint {
            name: string
            id: string
            flowId: string
            description: string
        }
        interface Reaction {
            readonly trigger: Trigger;
            readonly action?: Action;
        }
        interface Action {
            readonly type: ActionType;
            readonly destinationId: string;
            readonly navigation: Navigation;
            readonly transition: Transition;
            readonly url: string;
            readonly scrollToXOffset?: number;
            readonly scrollToYOffset?: number;
        }

        type ActionType = 'BACK' | 'NODE' | 'URL' | 'CLOSE' | 'NONE';

        type Navigation = 'NAVIGATE' | 'OVERLAY' | 'SWAP_OVERLAY' | 'SCROLL_TO';

        interface Transition {
            readonly type: TransitionType;
            readonly duration: number;
            readonly direction: TransitionDirection;
            readonly easing: Easing;
        }

        type TransitionType = 'TANS_NONE' | 'INSTANT' | 'DISSOLVE' | 'SMART_ANIMATE' | 'MOVE_IN' | 'MOVE_OUT' | 'PUSH' | 'SLIDE_IN' | 'SLIDE_OUT' | 'DISPLACE'

        type TransitionDirection = 'LEFT' | 'RIGHT' | 'TOP' | 'BOTTOM'
        interface Easing {
            readonly type: EasingType;
            readonly easingFunctionCubicBezier: {
                x1: number;
                x2: number;
                y1: number;
                y2: number;
            };
        }

        type EasingType = 'LINEAR' | 'EASE_IN' | 'EASE_OUT' | 'EASE_IN_AND_OUT' | 'EASE_IN_BACK' | 'EASE_OUT_BACK' | 'EASE_IN_AND_OUT_BACK' | 'CUSTOM_CUBIC_BEZIER'
        interface Trigger {
            readonly type: TriggerType;
            readonly delay: number;
        }
        type TriggerType = 'ON_CLICK' | 'ON_DRAG' | 'ON_HOVER' | 'ON_PRESS' | 'MOUSE_ENTER' | 'MOUSE_LEAVE' | 'MOUSE_DOWN' | 'MOUSE_UP' | 'AFTER_DELAY'

        interface ArcData {
            /**
             * 起点弧度
             */
            startingAngle: number
            /**
             * 终点弧度
             */
            endingAngle?: number
            /**
             * 内径
             */
            innerRadius: number
        }

        interface PluginDrop {
            clientX: number
            clientY: number
            dropMetadata?: any
        }

        interface DropEvent {
            x: number
            y: number
            absoluteX: number
            absoluteY: number
            dropMetadata?: any
        }

        interface TeamLibraryComponent {
            readonly id: string;
            readonly name: string;
            readonly ukey: string;
            readonly description: string;
            readonly type: "COMPONENT" | 'COMPONENT_SET'
        }

        interface TeamLibraryStyle {
            readonly id: string;
            readonly name: string;
            readonly ukey: string;
            readonly description: string;
            readonly type: StyleType;
        }

        type TeamLibrary = ReadonlyArray<{
            readonly name: string;
            readonly id: string;
            readonly componentList: TeamLibraryComponent[]
            readonly style: {
                paints: ReadonlyArray<TeamLibraryStyle>
                effects: ReadonlyArray<TeamLibraryStyle>
                texts: ReadonlyArray<TeamLibraryStyle>
                grids: ReadonlyArray<TeamLibraryStyle>
            }
        }>

        type BaseNode = DocumentNode | PageNode | SceneNode

        /**
         * 画布节点
         */
        type SceneNode =
            | GroupNode
            | FrameNode
            | PenNode
            | StarNode
            | LineNode
            | EllipseNode
            | PolygonNode
            | RectangleNode
            | TextNode
            | ComponentNode
            | ComponentSetNode
            | InstanceNode
            | BooleanOperationNode
            | SliceNode
            | ConnectorNode

        type NodeType =
            | 'DOCUMENT'
            | 'PAGE'
            | 'GROUP'
            | 'FRAME'
            | 'RECTANGLE'
            | 'TEXT'
            | 'LINE'
            | 'ELLIPSE'
            | 'POLYGON'
            | 'STAR'
            | 'PEN'
            | 'COMPONENT'
            | 'COMPONENT_SET'
            | 'INSTANCE'
            | 'BOOLEAN_OPERATION'
            | 'SLICE'
            | 'CONNECTOR'
}

export { masterGo }