import type { AppContext, Plugin } from 'vue'

export type InstallWithSFC<T> = T & Plugin

export type InstallWithContext<T> = InstallWithSFC<T> & {
  _context: AppContext | null
}
