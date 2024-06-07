import type { App, InjectionKey, Ref } from 'vue'

export type MaybeRef<T> = T | Ref<T>

export interface InstallOptions {
  zIndex?: MaybeRef<number>
  size?: MaybeRef<string>
}

export type ProvideFn = (<T>(key: string | InjectionKey<T>, value: T) => App<any>) | (<T>(key: string | number | InjectionKey<T>, value: T) => void) | undefined
