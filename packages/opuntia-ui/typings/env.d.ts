/// <reference types="vite/client" />

import type { INSTALLED_KEY } from '../src/installer'

declare module '@vue/runtime-core' {
  export interface App {
    [INSTALLED_KEY]?: boolean
  }
}

export { }
