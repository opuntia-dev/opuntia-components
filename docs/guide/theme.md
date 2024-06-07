# 主题样式

Opuntia UI 使用 [CSS Var](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Using_CSS_custom_properties) 来组织样式，变量分为通用样式变量和组件样式变量。

## 通用变量

| 变量名                  | 说明             | 默认值 |
| ----------------------- | ---------------- | ------ |
| `--op-font-size-min`    | `最小号字体大小` | `12px` |
| `--op-font-size-small`  | `小号字体大小`   | `14px` |
| `--op-font-size`        | `正常字体大小`   | `16px` |
| `--op-font-size-normal` | `正常字体大小`   | `16px` |
| `--op-font-size-large`  | `大号字体大小`   | `20px` |
| `--op-font-size-max`    | `最大号字体大小` | `28px` |

## 主题颜色变量

| 变量名               | 说明       | 默认值                |
| -------------------- | ---------- | --------------------- |
| `--op-color-base`    | `基础颜色` | `#333333` / `#ffffff` |
| `--op-color-primary` | `主题颜色` | `#15803d`             |

## 组件变量

各组件独有的样式变量请查看各组件文档底部的样式变量表格。

## 使用样式变量

::: code-group

```css [*.css]
body {
  font-size: var(--op-font-size);
}
```

```vue [*.vue]
<style>
body {
  font-size: var(--op-font-size);
}
</style>
```

:::

## 如何覆盖？

Opuntia UI 的样式变量全部挂载在 `:root {}` 下，您只需要在任意 `class` 类名上进行覆盖即可。

::: code-group

```css [*.css]
body {
  --op-font-size: 14px;
}
```

```vue [*.vue]
<style>
body {
  --op-font-size: 14px;
}
</style>
```

:::
