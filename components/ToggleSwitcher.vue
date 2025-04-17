<script setup lang="ts">
const props = defineProps({
  options: {
    type: Array as PropType<string[]>,
    required: true,
    validator(value: string[]) {
      return value.length === 2
    },
  },
  id: {
    type: String,
    required: true,
  },
})

const model = defineModel<string>({
  required: true,
})

const optionRefs = [ref<HTMLElement | null>(null), ref<HTMLElement | null>(null)]
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
    class="toggle-switch"
    style="--padding: 4px"
  >
    <legend class="sr-only">
      {{ $t(`toggleSwitcher.legend.${id}`) }}
    </legend>

    <label
      v-for="(option, index) in options"
      :key="index"
      :ref="(el) => optionRefs[index].value = el as HTMLElement"
      class="toggle-option"
      :class="{ 'toggle-option-active': model === option }"
    >
      <input
        v-model="model"
        class="sr-only"
        type="radio"
        :value="option"
        :name="id"
      >{{ option }}
    </label>

    <div
      class="toggle-slider"
      aria-hidden="true"
      :style="sliderStyle"
    />
  </fieldset>
</template>

<style>
  .toggle-switch:has(input:focus-visible) {
    outline: 1px solid #5DA994;
  }
</style>
