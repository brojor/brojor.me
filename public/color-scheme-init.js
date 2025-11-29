// This script prevents flashing incorrect theme on initial load
// const selectedScheme = localStorage.getItem('vueuse-color-scheme')
// const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches

// document.documentElement.classList.add(
//   selectedScheme && ['light', 'dark'].includes(selectedScheme)
//     ? selectedScheme
//     : prefersDark ? 'dark' : 'light',
// )

// TEMPORARILY FORCED TO DARK MODE
localStorage.setItem('vueuse-color-scheme', 'dark')
document.documentElement.classList.add('dark')
