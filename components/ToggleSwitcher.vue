<script setup lang="ts">
interface Option {
  icon?: string
  label?: string
  value: string | number | boolean
}

const props = defineProps({
  options: {
    type: Array as PropType<Option[]>,
    required: true,
    validator(value: Option[]) {
      return value.length === 2
    },
  },
  id: {
    type: String,
    required: true,
  },
})

const model = defineModel<string | number | boolean>({
  required: true,
})

const optionRefs = [ref<HTMLElement | null>(null), ref<HTMLElement | null>(null)]
const widths = ref({ first: 0, second: 0 })
const isInitialized = ref(false)
const hasIcons = props.options[0].icon && props.options[1].icon

function updateWidths() {
  if (hasIcons) {
    widths.value = {
      first: 36,
      second: 36,
    }
  }
  else if (optionRefs[0].value && optionRefs[1].value) {
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

  const isFirst = model.value === props.options[0].value
  return {
    width: `${isFirst ? widths.value.first : widths.value.second}px`,
    transform: isFirst ? 'translateX(0)' : `translateX(${widths.value.first}px)`,
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
    style="--padding: 2px"
  >
    <legend class="sr-only">
      {{ $t(`toggleSwitcher.legend.${id}`) }}
    </legend>

    <label
      v-for="(option, index) in options"
      :key="index"
      :ref="(el) => optionRefs[index].value = el as HTMLElement"
      class="toggle-option"
      :class="{ 'toggle-option-active': model === option.value }"
    >
      <input
        v-model="model"
        class="sr-only"
        type="radio"
        :value="option.value"
        :name="id"
      >
      <template v-if="option.icon">
        <Icon :name="option.icon" :size="20" />
        <span class="sr-only">
          {{ option.label }}
        </span>
      </template>
      <template v-else>
        {{ option.value }}
      </template>
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
