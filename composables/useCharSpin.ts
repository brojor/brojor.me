interface SpinOptions {
  offset?: number // posun ustalování znaků (v počtu znaků)
  speed?: number // rychlost animace v ms (interval jednotlivých kroků)
  stepSize?: number // velikost kroku (v počtu znaků)
}

export function useCharSpin(target: Ref<HTMLElement | null>, options: SpinOptions = {}) {
  const letters = 'abcdefghijklmnopqrstuvwxyz'
  const randomLetter = () => letters[Math.floor(Math.random() * letters.length)]

  let interval: ReturnType<typeof setInterval> | null = null
  let originalText = ''

  function spin() {
    const el = target.value
    if (!el)
      return

    originalText = el.textContent || ''
    let iteration = 0

    if (interval)
      clearInterval(interval)

    const { offset = 0, speed = 50, stepSize = 1 / 6 } = options

    interval = setInterval(() => {
      el.textContent = [...originalText].map((char, index) => {
        if (index < iteration - offset)
          return char
        return char === char.toUpperCase()
          ? randomLetter().toUpperCase()
          : randomLetter()
      }).join('')

      iteration += stepSize

      if (iteration - offset >= originalText.length) {
        clearInterval(interval!)
        interval = null
      }
    }, speed)
  }

  onBeforeUnmount(() => {
    if (interval) {
      clearInterval(interval)
      interval = null
    }
  })

  return { spin }
}
