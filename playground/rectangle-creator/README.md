# rectangle-creator

## 📦 Install

```bash
pnpm install
```

## 🔨DEV

### In Figma

1. `pnpm run dev-figma`
2. open `Figma` > `Plugins` > `Development` > `import plugin from manifest...` > `/plugin/figma/manifest.json`


### In JsDesign

1. `pnpm run dev-js`
2. open `即时设计` > `插件` > `开发者` > `从manifest导入插件` > `/plugin/jsDesign/manifest.json`

### In MasterGo

1. `pnpm run dev-mg`
2. open `MasterGO` > `插件` > `开发者` >`创建/添加插件` > `从manifest导入插件` > `/plugin/mastergo/manifest.json`



## 🦪 Build 

一次性全平台打包

`pnpm run build-all`

或单独打包

`pnpm run build-figma` 


`pnpm run build-mg`


`pnpm run build-js`

## 🚀 Features
- **KISS**: Power By [Kiss](https://github.com/Leizhenpeng/design-tooltik-cn/tree/main/packages/kiss-core).
- **HMR**: Support HMR(Hot Module Replacement) of Plugin
- **Vite**: Bundle user interface and js code using ViteJs
- **React**: Use ReactJs to write the user interface

## 📄 License

[MIT](LICENSE).



