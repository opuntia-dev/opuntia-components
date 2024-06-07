<script setup lang="ts">
import { computed, ref } from 'vue'
import { useData } from 'vitepress'
import { useClipboard } from '@vueuse/core'
import { repoMasterUrl } from '../constants'
import DemoButton from './demo/DemoButton.vue'
import DemoComponent from './demo/DemoComponent.vue'
import DemoSourceCode from './demo/DemoSourceCode.vue'

const props = defineProps({
  path: {
    type: String,
    required: true,
  },
  source: {
    type: String,
    required: true,
  },
  rawSource: {
    type: String,
    required: true,
  },
})

const { isDark } = useData()

const components = import.meta.glob('../../components/**/*.vue', { eager: true })

const pathDemos = computed(() => {
  const demos = {}
  Object.keys(components).forEach((key) => {
    demos[key.replace('../../components/', '').replace('.vue', '')]
      = components[key].default
  })
  return demos
})

const showCode = ref(false)

function toggleHandle() {
  showCode.value = !showCode.value
}

const { copy } = useClipboard({
  source: decodeURIComponent(props.rawSource),
  read: false,
})

function copyHandle() {
  copy()
}

const path = computed(() => {
  return props.path.replace(/\/\//g, '/')
})

function openHandle() {
  window.open(`${repoMasterUrl}/docs/${path.value}`)
}
</script>

<template>
  <ClientOnly>
    <div class="demo-wrapper">
      <div class="demo" :class="{ dark: isDark }">
        <div class="demo-component-wrapper">
          <DemoComponent :file="path" :comp="pathDemos[path]" />
        </div>
        <div class="demo-button-wrapper">
          <DemoButton @toggle="toggleHandle" @copy="copyHandle" @open="openHandle" />
        </div>
        <div v-show="showCode" class="demo-source-code-wrapper">
          <DemoSourceCode :source="source" />
        </div>
      </div>
    </div>
  </ClientOnly>
</template>

<style scoped lang="scss">
.demo-wrapper {
  .demo {
    border: 1px solid;
    border-color: var(--vp-c-divider);
    border-radius: 4px;
    padding: 0;

    .demo-component-wrapper,
    .demo-button-wrapper {
      padding: 0.5rem;
    }

    .demo-source-code-wrapper,
    .demo-button-wrapper {
      border-top: 1px solid;
      border-color: var(--vp-c-divider);
    }

    .demo-button-wrapper{
      background-color: var(--vp-c-bg-soft);
    }
  }
}
</style>
