import { installer } from './installer'

import '@opuntia-ui/theme'

export * from '@opuntia-ui/components'
export * from '@opuntia-ui/utils'
export * from './resolver'

export const install = installer.install

export default installer
