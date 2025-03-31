<script setup>
const props = defineProps({
  options: {
    type: Array,
    required: true,
    validator(value) {
      return value.length === 2
    },
  },
})

const model = defineModel({
  required: true,
})

const optionRefs = [ref(null), ref(null)]
const widths = ref({ first: 0, second: 0 })
const isInitialized = ref(false)

function updateWidths() {
  if (optionRefs[0].value && optionRefs[1].value) {
    widths.value = {
      first: optionRefs[0].value.offsetWidth,
      second: optionRefs[1].value.offsetWidth,
    }
  }
}

const sliderStyle = computed(() => {
  if (!isInitialized.value) {
    return { opacity: '0' }
  }

  const isFirst = model.value === props.options[0]
  return {
    width: `${isFirst ? widths.value.first : widths.value.second}px`,
    transform: isFirst ? 'none' : `translateX(${widths.value.first}px)`,
    opacity: '1',
  }
})

onMounted(() => {
  updateWidths()
  requestAnimationFrame(() => {
    isInitialized.value = true
  })
})
</script>

<template>
  <fieldset
    role="radiogroup"
    aria-label="Přepínač jazyka"
    class="language-switch"
    style="--padding: 4px"
  >
    <legend class="sr-only">
      Jazyk
    </legend>

    <label
      v-for="(option, index) in options"
      :key="index"
      :ref="el => optionRefs[index].value = el"
      class="language-option"
      :class="{ 'language-option-active': model === option }"
    >
      <input
        v-model="model"
        class="sr-only"
        type="radio"
        :value="option"
        name="language"
      >
      {{ option }}
    </label>

    <div
      class="language-slider"
      aria-hidden="true"
      :style="sliderStyle"
    />
  </fieldset>
</template>

<style>
  .language-option:has(input:focus-visible) {
    outline: 1px solid #5DA994;
  }
</style>
