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
      'white': '#fff',
      'white-soft': '#ddd',
      'white-mute': '#bbb',
      'black': '#000',
      'black-soft': '#1A1A1A',
      'black-mute': '#555',
      'accent-light': '#00A68D',
      'accent-dark': '#00BA9E',
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
    'text-default': 'text-black-mute dark:text-white-mute',
    'text-soft': 'text-black-soft dark:text-white-soft',
    'text-strong': 'text-black dark:text-white',
    'text-accent': 'text-accent-light dark:text-accent-dark',
    'bg-default': 'bg-white dark:bg-zinc-950',
    'border-card': 'border-black/10 dark:border-white/10 hover:border-accent-light/60 dark:hover:border-accent-dark/40',
    'border-accent': 'border-accent-light/40 dark:border-accent-dark/40 hover:border-accent-light dark:hover:border-accent-dark',
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
