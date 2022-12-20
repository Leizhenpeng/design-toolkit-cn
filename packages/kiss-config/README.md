
# unplugin-kiss-config
> 🍙 自动生成figma,masterGo,jsDesign多个平台manifest.json的打包插件



## Add config in package.json
```json
...
   "pluginInfo": {
        "name": "Rectangle Creator",
        "api": "1.0.0",
        "id": {
            "masterGo": "80090183159920",
            "figma": "1183407018802193143",
            "jsDesign": "_Cm929J-cu10cmqrzbnIS"
        },
        "editorType": {
            "masterGo": [
                "masterGo"
            ],
            "figma": [
                "figma",
                "figjam"
            ],
            "jsDesign": [
                "jsDesign"
            ]
        }
    },
...
```

## Install

```sh
npm i unplugin-kiss-config
```

## Option
```
{
  outDir:'string' //自动生成配置文件的目录名称,默认为'plugin'
  client:'figma' | 'masterGo' | 'jsDesign' //平台名称,建议通过环境变量来设置 process.env.CLIENT_ENV || 'figma'
}
```


<details>
<summary>esbuild</summary><br>

```js
// esbuild.config.js
import { build } from 'esbuild'
import { KissConfigPlugin } from 'unplugin-kiss-config/esbuild'

build({
  plugins: [
    KissConfigPlugin(/* options */)
  ],
})
```

<br></details>

<details>
<summary>Rollup</summary><br>

```js
// rollup.config.js
import { KissConfigPlugin } from 'unplugin-kiss-config/rollup'

export default {
  plugins: [
    KissConfigPlugin(/* options */)
  ],
}
```

<br></details>

<details>
<summary>Vite</summary><br>

```js
// vite.config.ts
import { KissConfigPlugin } from 'unplugin-kiss-config/vite'

export default defineConfig({
  plugins: [
    KissConfigPlugin(/* options */)
  ],
})
```

<br></details>

<details>
<summary>Webpack</summary><br>

```js
// webpack.config.js
const { KissConfigPlugin } = require('unplugin-kiss-config/webpack')

module.exports = {
  plugins: [
    KissConfigPlugin(/* options */),
  ],
}
```

<br></details>
