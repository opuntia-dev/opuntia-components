import type { Plugin } from 'vue'
import type { InstallOptions } from '@opuntia-ui/utils'
import { provideGlobalConfig } from '@opuntia-ui/utils'
import { version } from '../package.json'
import { components } from './components'

export const INSTALLED_KEY = Symbol('INSTALLED_KEY')

export function createInstaller(components: Plugin[] = []) {
  const install = (app: any, options?: InstallOptions) => {
    if (app[INSTALLED_KEY])
      return

    app[INSTALLED_KEY] = true
    components.forEach(c => app.use(c))

    if (options)
      provideGlobalConfig(options, app, true)
  }

  return {
    install,
    version,
  }
}

export const installer = createInstaller(components)

export default installer
