import type { App, Ref } from 'vue'
import { computed, getCurrentInstance, inject, provide, ref, unref } from 'vue'
import type { InstallOptions, MaybeRef, ProvideFn } from './types'

export const globalConfigKey = 'OpuntiaGlobalConfig'

const globalConfig = ref<InstallOptions>()

export function mergeObjects<T extends Record<string, any>, U extends Record<string, any>>(sourceObj: T, targetObj: U) {
  const keys = [...new Set([...(Object.keys(sourceObj)), ...(Object.keys(targetObj))])]
  const newObj: Record<string, any> = {}

  keys.forEach((key) => {
    newObj[key] = targetObj[key] ?? sourceObj[key]
  })

  return newObj
}

export function useGlobalConfig<T extends keyof InstallOptions, U extends InstallOptions[T]>(key: T, defaultValue?: U): Ref<Exclude<InstallOptions[T], undefined | U>>
export function useGlobalConfig(): Ref<InstallOptions>
export function useGlobalConfig(key?: keyof InstallOptions, defaultValue = undefined) {
  const app = getCurrentInstance()
  let config = inject<Ref<InstallOptions>>(globalConfigKey)

  if (!unref(config)) {
    config = ref(app ? app.appContext.provides[globalConfigKey] : globalConfig.value)
    provide(globalConfigKey, config)
  }

  if (key)
    return computed(() => config!.value?.[key] ?? defaultValue)
  else
    return config
}

export function provideGlobalConfig(config: MaybeRef<InstallOptions>, app?: App, global = false) {
  const inSetup = !!getCurrentInstance()
  const sourceConfig = inSetup ? useGlobalConfig() : undefined
  const provideFn = app?.provide ?? (inSetup ? provide : undefined) as ProvideFn

  if (!provideFn)
    return

  const context = computed(() => {
    const cfg = unref(config)
    if (!sourceConfig?.value)
      return cfg

    return mergeObjects(sourceConfig.value, cfg)
  })

  provideFn(globalConfigKey, context)

  if (global || !globalConfig.value)
    globalConfig.value = context.value

  return context
}
