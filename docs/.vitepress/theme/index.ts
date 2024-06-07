import theme from 'vitepress/theme'
import { Demo } from '../components'
import './style.css'

export default {
  ...theme,
  enhanceApp({ app }) {
    app.component('Demo', Demo)
  },
}
