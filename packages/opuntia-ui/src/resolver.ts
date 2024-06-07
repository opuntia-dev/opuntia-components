import type { ComponentResolver } from 'unplugin-vue-components'

export function OpuntiaResolver(): ComponentResolver {
  return {
    type: 'component',
    resolve: (name: string) => {
      if (name.match(/Op[A-Z]/))
        return { name, from: 'opuntia-ui' }
    },
  }
}
