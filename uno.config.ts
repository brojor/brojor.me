import { defineConfig, presetWind3, transformerDirectives } from 'unocss'

export default defineConfig({
  presets: [
    presetWind3(),
  ],
  rules: [
    [/^shape-\[(.*deg)\]$/, ([_, deg]) => ({
      '--un-gradient': 'var(--un-gradient-shape), var(--un-gradient-stops)',
      '--un-gradient-shape': `${deg}`,
    })],
    ['switcher-slider-height', { height: 'calc(100% - calc(var(--padding) * 2))' }],
    ['header-backdrop', { '-webkit-backdrop-filter': 'saturate(180%) blur(20px)', 'backdrop-filter': 'saturate(180%) blur(20px)' }],
  ],
  shortcuts: {
    'bg-default': 'bg-white dark:bg-zinc-950',
    'border-accent': 'border-accent-light/40 dark:border-accent-dark/40 hover:border-accent-light dark:hover:border-accent-dark',
    'border-card': 'border-black/10 dark:border-white/10 hover:border-accent-light/60 dark:hover:border-accent-dark/40',
    'flex-center': 'flex items-center justify-center',
    'text-accent': 'text-accent-light dark:text-accent-dark',
    'text-default': 'text-black-mute dark:text-white-mute',
    'text-soft': 'text-black-soft dark:text-white-soft',
    'text-strong': 'text-black dark:text-white',
    'toggle-option': 'px-2 py-[1px] rounded-md z-1 cursor-pointer select-none text-sm font-medium transition-colors text-zinc-400 dark:text-zinc-500 hover:text-zinc-600 dark:hover:text-zinc-400',
    'toggle-option-active': 'text-black dark:text-zinc-50 hover:text-black dark:hover:text-zinc-50',
    'toggle-slider': 'absolute top-[var(--padding)] left-[var(--padding)] switcher-slider-height bg-accent-light/70 dark:bg-accent-dark/70 rounded-md transition-all duration-300 pointer-events-none',
    'toggle-switch': 'relative inline-flex rounded-lg bg-zinc-100/80 dark:bg-zinc-900/80 border border-black/15 dark:border-white/15 hover:border-black/30 dark:hover:border-white/30 p-[var(--padding)] transition-colors',
  },
  theme: {
    colors: {
      'accent-coral-peach': '#C98A7D',
      'accent-dark': '#00BA9E',
      'accent-light': '#00A68D',
      'black': '#000',
      'black-mute': '#555',
      'black-soft': '#1A1A1A',
      'white': '#fff',
      'white-mute': '#bbb',
      'white-soft': '#ddd',
    },
    fontFamily: {
      'landing-page': 'Geist Mono',
      'mono': 'DM Mono',
      'sans': 'Inter',
    },
  },
  transformers: [
    transformerDirectives(),
  ],
  variants: [
    (matcher) => {
      if (!matcher.startsWith('hoverable:'))
        return matcher
      return {
        matcher: matcher.slice(10),
        parent: '@media (hover: hover)',
      }
    },
  ],
})
