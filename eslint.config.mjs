import antfu from '@antfu/eslint-config'
// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
  antfu({
    unocss: true,
  }),
  {
    files: ['**/*.md', '**/*.mdx'],
    rules: {
      'no-irregular-whitespace': 'off',
    },
  },
  {
    files: ['nuxt.config.ts', 'uno.config.ts'],
    rules: {
      'perfectionist/sort-objects': 'error',
    },
  },
)
