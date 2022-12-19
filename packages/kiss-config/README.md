# unplugin-kiss-config

## Install

```sh
npm i unplugin-kiss-config
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
