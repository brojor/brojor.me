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
    'toggle-switch': 'relative inline-flex rounded-lg bg-zinc-100/80 dark:bg-zinc-900/80 border border-black/10 dark:border-white/10 p-[var(--padding)] transition-colors',
    'toggle-option': 'px-2 py-[2px] rounded-md z-1 cursor-pointer select-none text-sm font-medium transition-colors text-zinc-400 dark:text-zinc-500 hover:text-zinc-600 dark:hover:text-zinc-400',
    'toggle-option-active': 'text-black dark:text-zinc-50 hover:text-black dark:hover:text-zinc-50',
    'toggle-slider': 'absolute top-[var(--padding)] left-[var(--padding)] switcher-slider-height bg-accent-light/70 dark:bg-accent-dark/70 rounded-md transition-all duration-300 pointer-events-none',
  },
  presets: [
    presetWind3(),
  ],
  transformers: [
    transformerDirectives(),
  ],
})
