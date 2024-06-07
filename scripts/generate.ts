import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { cwd } from 'node:process'
import inquirer from 'inquirer'
import { consola } from 'consola'

const generateComment = '/* @generate-code */'

function toLowerCase(input: string): string {
  return input.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase().replace(/\s+/g, '-')
}

function toPascalCase(input: string): string {
  return input.toLowerCase().replace(/(?:^|-)([a-z])/g, (_, letter) => letter.toUpperCase())
}

function toCamelCase(input: string): string {
  return input.toLowerCase().replace(/-(.)/g, (_, match) => match.toUpperCase())
}

function getEntryFile(componentName: string) {
  return `
import { installWithSFC } from '@opuntia-ui/utils'
import ${componentName} from './${componentName}.vue'
  
export type ${componentName}Instance = InstanceType<typeof ${componentName}>
  
export * from './props'
export * from './emits'
  
export const Op${componentName} = installWithSFC(${componentName})
  
export default Op${componentName}`
}

function getPropsFile(variableName: string, componentName: string) {
  return `
import type { ExtractPropTypes } from 'vue'

export const ${variableName}Props = {
  name: {
    type: String,
    default: '${componentName}',
  },
}

export type ${componentName}Props = ExtractPropTypes<typeof ${variableName}Props>`
}

function getEmitsFile(variableName: string, componentName: string) {
  return `
export const ${variableName}Emits = {
  hi: null
}

export type ${componentName}Emits = typeof ${variableName}Emits
  `
}

function getStyleFile(name: string) {
  return `
:root {
  --op-${name}-color: #000000;
}

.op-${name} {
  text-align: center;
  color: var(--op-${name}-color);
}`
}

function getComponentFile(name: string, variableName: string, componentName: string) {
  return `
<script lang="ts" setup>
import { ${variableName}Props } from './props'
import { ${variableName}Emits } from './emits'

defineOptions({
  name: 'Op${componentName}',
})

const props = defineProps(${variableName}Props)

const emit = defineEmits(${variableName}Emits)

function sayHello(){
  emit('hi', props.name)
}
</script>

<template>
  <div class="op-${name}" @click="sayHello">
    Hello {{ name }}!
    <slot />
  </div>
</template>

<style lang="scss">
@use './${name}' as *;
</style>`
}

function getTestFile(name: string, componentName: string) {
  return `
import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import ${componentName} from '../${componentName}.vue'

it('test use for ${componentName}.vue', () => {
  const wrapper = mount(${componentName})

  expect(wrapper.classes()).toContain('op-${name}')
})

describe('test props for ${componentName}.vue', () => {
  it('name', () => {
    const wrapper = mount(${componentName}, {
      props: {
        name: '${componentName}',
      },
    })

    expect(wrapper.find('.op-${name}').text().includes('${componentName}')).toBe(true)
  })
})

describe('test event for ${componentName}.vue', () => {
  it('hi', async () => {
    const handleHi = vi.fn()

    const wrapper = mount(${componentName}, {
      props: {
        onHi: handleHi,
      },
    })

    await wrapper.trigger('click')
    expect(handleHi).toHaveBeenCalledTimes(1)
  })
})

describe('test slots for ${componentName}.vue', () => {
  it('default', async () => {
    const defaultSlot = 'Default Slot'

    const wrapper = mount(${componentName}, {
      slots: {
        default: \`<div class="default-slot">\${defaultSlot}</div>\`,
      },
    })

    const slotEl = wrapper.find('.default-slot')
    expect(slotEl.exists()).toBe(true)
    expect(slotEl.text()).toBe(defaultSlot)
  })
})`
}

function getDocsFile(name: string, componentName: string) {
  return `
# ${componentName}

组件的描述信息。

## 基础用法
  
组件的基础用法。
  
:::demo
  
${name}/demo/basic
  
:::

## 属性

| 属性名 | 说明     | 类型       | 默认值           |
| ------ | -------- | ---------- | ---------------- |
| name   | 组件名称 | \`string\` | ${componentName} |

## 事件

| 事件名 | 说明         | 参数  |
| ------ | ------------ | ----- |
| hi  | 事件 | \`-\` |

## 插槽

| 插槽名  | 说明     | 参数  |
| ------- | -------- | ----- |
| default | 默认插槽 | \`-\` |

## 样式变量

| 变量名             | 说明     | 默认值      |
| ------------------ | -------- | ----------- |
| --op-${name}-color | 文字颜色 | \`#000000\` |
`
}

function getDemoFile(componentName: string) {
  return `
<script lang="ts" setup>
import { Op${componentName} } from 'opuntia-ui'
</script>
  
<template>
  <Op${componentName} />
</template>   
`
}

async function updateComponentEntryFile(name: string) {
  const componentEntryFile = resolve(cwd(), `packages/components/src/index.ts`)

  let content = await readFile(componentEntryFile, 'utf-8')
  const index = content.indexOf(generateComment)
  if (index > -1)
    content = `${content.slice(0, index)}export * from './${name}'\n${generateComment}${content.slice(index + generateComment.length)}`

  await writeFile(componentEntryFile, content)
}

export async function updateVolarFile(componentName: string) {
  const path = resolve(cwd(), `packages/opuntia-ui/src/volar.d.ts`)
  let content = await readFile(path, 'utf-8')

  const index = content.indexOf(generateComment)
  if (index > -1)
    content = `${content.slice(0, index)}Op${componentName}: typeof import('opuntia-ui')['Op${componentName}']\n    ${generateComment}${content.slice(index + generateComment.length)}`

  await writeFile(path, content)
}

export async function updateComponentsFile(componentName: string) {
  const path = resolve(cwd(), `packages/opuntia-ui/src/components.ts`)
  let content = await readFile(path, 'utf-8')

  const importIndex = content.indexOf(generateComment)
  if (importIndex > -1)
    content = `${content.slice(0, importIndex)}Op${componentName},\n  ${generateComment}${content.slice(importIndex + generateComment.length)}`

  const exportIndex = content.indexOf(generateComment, content.indexOf(generateComment) + 1)
  if (exportIndex > -1)
    content = `${content.slice(0, exportIndex)}Op${componentName},\n  ${generateComment}${content.slice(exportIndex + generateComment.length)}`

  await writeFile(path, content)
}

export async function updateDocsFile(name: string, componentName: string) {
  const path = resolve(cwd(), `docs/.vitepress/constants.ts`)
  let content = await readFile(path, 'utf-8')

  const index = content.indexOf(generateComment)
  if (index > -1)
    content = `${content.slice(0, index)}{\n    text: '${componentName}',\n    link: '/components/${name}',\n  },\n  ${generateComment}${content.slice(index + generateComment.length)}`

  await writeFile(path, content)
}

inquirer.prompt({
  name: 'name',
  message: 'Name of the generate component: (Use lowercase letters and a dash for naming, eg: button or button-group)',
  validate: (input: string) => /^[a-zA-Z\-]+$/.test(input),
  transformer: (input: string) => {
    return toLowerCase(input)
  },
}).then(async ({ name: _name }) => {
  const { templates } = await inquirer.prompt({
    name: 'templates',
    message: 'Select the template code you want to generate:',
    type: 'checkbox',
    choices: [
      { name: 'Component files', value: 'component' },
      { name: 'Unit test files for component', value: 'component-test' },
      { name: 'Docs files', value: 'docs' },
      { name: 'Demo files for docs', value: 'docs-demo' },
      { name: 'Update import statement for you selected', value: 'import', checked: true, disabled: 'Required' },

    ],
    default: ['component', 'component-test', 'docs', 'docs-demo', 'import'],
  })
  consola.info('Start generating component files...')

  const name = toLowerCase(_name)
  const variableName = toCamelCase(name)
  const componentName = toPascalCase(name)

  const componentPath = resolve(cwd(), `packages/components/src/${name}`)
  const componentTestPath = `${componentPath}/__tests__`

  const docsPath = resolve(cwd(), `docs/components/${name}`)
  const docsDemoPath = `${docsPath}/demo`

  if (templates.includes('component')) {
    await Promise.all([
      mkdir(componentPath),
      writeFile(`${componentPath}/props.ts`, getPropsFile(variableName, componentName)),
      writeFile(`${componentPath}/emits.ts`, getEmitsFile(variableName, componentName)),
      writeFile(`${componentPath}/${componentName}.vue`, getComponentFile(name, variableName, componentName)),
      writeFile(`${componentPath}/${name}.scss`, getStyleFile(name)),
      writeFile(`${componentPath}/index.ts`, getEntryFile(componentName)),
    ]).finally(() => {
      consola.success(`The ${name} component file is successfully generated.`)
    })
  }

  if (templates.includes('component-test')) {
    await Promise.all([
      mkdir(componentTestPath),
      writeFile(`${componentTestPath}/${name}.spec.ts`, getTestFile(name, componentName)),
    ]).finally(() => {
      consola.success(`The unit test file of the ${name} component is successfully generated.`)
    })
  }

  if (templates.includes('docs')) {
    await Promise.all([
      mkdir(docsPath),
      writeFile(`${docsPath}/index.md`, getDocsFile(name, componentName)),
    ]).finally(() => {
      consola.success(`The ${name} docs file is successfully generated.`)
    })
  }

  if (templates.includes('docs-demo')) {
    await Promise.all([
      mkdir(docsDemoPath),
      writeFile(`${docsDemoPath}/basic.vue`, getDemoFile(componentName)),
    ]).finally(() => {
      consola.success(`The demo file of the ${name} docs is successfully generated.`)
    })
  }

  await Promise.all([
    templates.includes('component') && [updateComponentEntryFile(name), updateComponentsFile(componentName), updateVolarFile(componentName)].flat(),
    templates.includes('docs') && updateDocsFile(name, componentName),
  ]).finally(() => {
    consola.success(`The import statement is updated.`)
  })
}).catch((error) => {
  consola.error(error)
})
