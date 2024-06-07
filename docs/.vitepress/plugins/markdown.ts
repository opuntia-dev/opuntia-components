import { resolve } from 'node:path'
import { readFileSync } from 'node:fs'
import { cwd } from 'node:process'
import type MarkdownIt from 'markdown-it'
import markdownItContainer from 'markdown-it-container'
import type Token from 'markdown-it/lib/token'
import type Renderer from 'markdown-it/lib/renderer'
import { getHighlighter } from 'shiki'

interface ContainerOpts {
  marker?: string | undefined
  validate?: (params: string) => boolean
  render?: (
    tokens: Token[],
    index: number,
    options: any,
    env: any,
    self: Renderer
  ) => string
}

export async function MarkdownPlugin(md: MarkdownIt) {
  const highlighter = await getHighlighter({
    themes: ['github-light', 'github-dark'],
    langs: ['vue', 'vue-html', 'typescript', 'javascript'],
  })

  md.use(markdownItContainer, 'demo', {
    validate(params) {
      return !!params.trim().match(/^demo\s*(.*)$/)
    },

    render(tokens, idx) {
      if (tokens[idx].nesting === 1) {
        let source = ''
        const sourceFileToken = tokens[idx + 2]
        const sourceFile = sourceFileToken.children?.[0].content ?? ''

        if (sourceFileToken.type === 'inline') {
          source = readFileSync(
            resolve(cwd(), 'components', `${sourceFile}.vue`),
            'utf-8',
          )
        }

        if (!source)
          throw new Error(`Incorrect source file: ${sourceFile}`)

        const shikiSource = highlighter.codeToHtml(source, {
          lang: 'vue',
          themes: {
            light: 'github-light',
            dark: 'github-dark',
          },
        })
        return `<Demo :demos="demos" source="${encodeURIComponent(shikiSource)}" path="${sourceFile}" raw-source="${encodeURIComponent(source)}">`
      }
      else {
        return '</Demo>'
      }
    },
  } as ContainerOpts)
}
