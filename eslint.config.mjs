import antfu from '@antfu/eslint-config'
// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
  antfu(),
  {
    files: ['**/*.md', '**/*.mdx'],
    rules: {
      'no-irregular-whitespace': 'off',
    },
  },
)
