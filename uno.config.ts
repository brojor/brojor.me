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
    ['switcher-slider-height', { height: 'calc(100% - calc(var(--padding) * 2))' }],
  ],
  shortcuts: {
    'language-switch': 'relative inline-flex rounded-lg bg-zinc-900/80 border border-solid border-white/10 p-[var(--padding)]',
    'language-option': 'px-2 py-[2px] rounded-md z-1 cursor-pointer select-none text-sm font-medium transition-colors text-zinc-500',
    'language-option-active': 'text-zinc-50',
    'language-slider': 'absolute top-[var(--padding)] left-[var(--padding)] switcher-slider-height bg-zinc-700 rounded-md transition-all duration-300 pointer-events-none',
  },
  presets: [
    presetWind3(),
  ],
  transformers: [
    transformerDirectives(),
  ],
})
