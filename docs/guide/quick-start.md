# 快速上手

如何在项目中使用 Opuntia UI。

## 安装

建议使用 pnpm 作为您的包管理工具。

::: code-group

```sh [pnpm]
pnpm add opuntia-ui
```

```sh [yarn]
yarn add opuntia-ui
```

```sh [npm]
npm install opuntia-ui
```

:::

## 完整导入

```ts
// main.ts
import { createApp } from 'vue'
import Opuntia from 'opuntia-ui'

import 'opuntia-ui/style.css'

import App from './App.vue'

const app = createApp(App)

app.use(Opuntia).mount('#app')
```

## 按需导入

通过安装 `unplugin-vue-components` 和 `unplugin-auto-import` 插件，实现组件自动导入。

::: code-group

```sh [pnpm]
pnpm add unplugin-vue-components unplugin-auto-import -D
```

```sh [yarn]
yarn add unplugin-vue-components unplugin-auto-import -D
```

```sh [npm]
npm install unplugin-vue-components unplugin-auto-import -D
```

:::

然后把下列代码插入到你的 `Vite` 配置文件中

```ts
// vite.config.ts
import { defineConfig } from 'vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { OpuntiaResolver } from 'opuntia-ui'

export default defineConfig({
  // ...
  plugins: [
    // ...
    AutoImport({
      resolvers: [OpuntiaResolver()],
    }),
    Components({
      resolvers: [OpuntiaResolver()],
    }),
  ],
})
```

你也可用手动导入你需要的组件。

```vue
<script>
import { OpTodo } from 'opuntia-ui'

export default {
  components: { OpTodo },
}
</script>

<template>
  <OpTodo />
</template>
```

:::warning

目前，针对 CSS 文件的自动导入尚未完成，现在仍然需要全局导入样式文件。

```ts
// main.ts
import 'opuntia-ui/style.css'
```

:::

### Volar 支持

如果您使用 Volar，请在 `tsconfig.json` 中通过 `compilerOptions.type` 指定全局组件类型。

```json
// tsconfig.json
{
  "compilerOptions": {
    // ...
    "types": ["opuntia-ui/volar"]
  }
}
```

## 浏览器直接引入

直接通过浏览器的 HTML 标签导入 Opuntia UI，然后就可以使用全局变量 `OpuntiaUI` 了。

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Opuntia UI</title>
  <link rel="stylesheet" href="./style.css">
</head>

<body>
  <div id="app"></div>

  <script src="https://cdn.jsdelivr.net/npm/vue"></script>
  <script src="./opuntia-ui.umd.cjs"></script>
  <script>
    const app = Vue.createApp({
      template: '<op-todo />'
    })
    app.use(OpuntiaUI).mount('#app')
  </script>
</body>

</html>
```
