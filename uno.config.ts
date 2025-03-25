import { defineConfig, presetWind3, transformerDirectives } from 'unocss'

export default defineConfig({
  theme: {
    fontFamily: {
      sans: 'Inter',
      mono: 'DM Mono',
      condensed: 'Roboto Condensed',
      wisper: 'Bad Script',
    },
    colors: {
      'fg': '#bbb',
      'fg-mid': '#ccc',
      'fg-deep': '#ddd',
      'fg-deeper': '#fff',
      'bg': '#09090b',
      'bg-deep': '#12121a',
      'bg-deeper': '#1c1c28',
      'accent-sea-green': '#5DA994',
      'accent-sandy-brown': '#BD976A',
      'accent-soft-rose': '#CB7676',
      'accent-olive-green': '#80A665',
      'accent-coral-peach': '#C98A7D',
    },
  },
  rules: [
    [/^shape-\[(.*deg)\]$/, ([_, deg]) => ({
      '--un-gradient-shape': `${deg}`,
      '--un-gradient': 'var(--un-gradient-shape), var(--un-gradient-stops)',
    })],
  ],
  presets: [
    presetWind3(),
  ],
  transformers: [
    transformerDirectives(),
  ],
})
