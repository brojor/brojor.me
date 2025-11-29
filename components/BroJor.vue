<script setup lang="ts">
const partOne = ref<HTMLElement | null>(null)
const partTwo = ref<HTMLElement | null>(null)
const { spin: spinChars } = useCharSpin(partOne)
const { spin: spinChars2 } = useCharSpin(partTwo, { offset: 3 })

const isSpinning = ref(false)

function spin() {
  if (isSpinning.value)
    return

  isSpinning.value = true

  spinChars()
  spinChars2()

  setTimeout(() => {
  }, 3 * 300)

  setTimeout(() => {
    isSpinning.value = false
  }, 6 * 300)
}

onMounted(spin)
</script>

<template>
  <span @mouseover="spin">
    <span ref="partOne" class="text-[#00D7B8]">Bro</span>
    <span ref="partTwo">jor</span>
  </span>
</template>
