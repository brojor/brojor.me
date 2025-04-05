---
title: "Step by Step: Semantically Correct Language Switcher in Vue 3"
description: "Create a semantically correct and fully accessible language switcher with elegant animation in Vue 3. Step by step from design to implementation with emphasis on a11y."
publishedDate: "2025-04-01"
modifiedDate: "2025-04-01"
tags:
  - vue
  - accessibility
  - UI
  - typescript
  - i18n
translationKey: "semantic-language-switcher"
readingTime: 10
---

::blog-post-header{:title="title" :published-date="publishedDate" :reading-time="readingTime"}
::

On a multilingual website, the language switcher is a key element of the user interface. This unobtrusive yet important component must be intuitive, visually clear, and above all [accessible](https://developer.mozilla.org/en-US/docs/Web/Accessibility) to all users, including those who use screen readers or navigate the web using only a keyboard.

### Common Shortcomings of Language Switchers

When implementing a language switcher, we often encounter several common issues:

1. **Inappropriate HTML semantics** - We often settle for ordinary `<div>` and `<span>` elements, which lack proper meaning for assistive technologies
2. **Neglecting accessibility** - We forget about users who cannot or do not want to use a mouse
3. **Neglecting aesthetics and UX** - We underestimate visual feedback and the switcher isn't sufficiently intuitive for users
4. **One-off solutions** - We create one-time solutions instead of modular components that could be used in other parts of the application

In this article, I'll guide you through the process of redesigning the language switcher on my personal website with emphasis on all the aspects mentioned above.

## Analysis of the Original Solution

The original implementation of the language switcher was simple:

```vue
<template>
  <div class="language-switcher">
    <a
      v-for="loc in locales"
      :key="loc.code"
      :class="{ active: loc.code === currentLocale?.code }"
      @click.prevent.stop="switchLocale(loc.code)"
    >
      {{ loc.code }}
    </a>
  </div>
</template>
```

This solution worked, but it was inadequate in terms of semantics, accessibility, and design.

## Redesign Goals

After identifying the shortcomings, I set the following goals for the new implementation:

- **Proper HTML structure** - Using appropriate elements that best represent the function of the switcher
- **Keyboard and assistive technology support** - Ensuring the component works correctly even without a mouse and with screen readers
- **Visual feedback** - Clear indications of current state and interactions (focus, hover)
- **Smooth animations** - Smooth transition between states for a better user experience
- **Modular and reusable component** - Designing the component so it can be easily used in other parts of the application
- **Simple API** - Minimizing the complexity of integration into existing code

## Choosing a Technical Approach
With defined goals, I could proceed to select an appropriate technical approach that would fulfill all these requirements.

### Existing Solutions

Before my own implementation, I considered existing solutions, primarily libraries providing accessible UI components.

Two popular choices for Vue 3 are:

- **[Headless UI](https://headlessui.dev/)** - Unstyled, accessible components from Tailwind Labs
- **[Radix Vue](https://www.radix-vue.com/)** - A port of the React library focused on accessibility

Both libraries offer `RadioGroup` components that could theoretically serve as a basis for a language switcher.

### Reasons for Custom Implementation

Despite the quality of these libraries, I preferred my own implementation for these reasons:

1. **Minimizing dependencies** - Adding an external library for a single component worsens website performance
2. **Control over animations** - Custom implementation allows creating exactly the visual effect I need
3. **Flexibility and learning** - Creating a component from scratch deepens understanding of accessibility principles
4. **Integration with existing code** - A custom solution better fits into my website architecture without having to adapt to a library's API

### Technical Decision

After considering various options, I decided to implement the switcher as a group of radio buttons with an animated indicator. This choice offers several advantages:

- [Radio buttons](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/radio) are semantically the correct choice for selecting one option from several
- Browsers provide built-in support for keyboard control
- [Fieldset](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/fieldset) and [legend](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/legend) provide the proper context for a group of related inputs

## Semantic HTML Structure
After deciding to implement a custom solution with radio buttons, the next step was to design the correct semantic HTML structure:

```vue
<template>
  <fieldset
    role="radiogroup"
    aria-label="Language Switcher"
    class="toggle-switch"
    style="--padding: 4px"
  >
    <legend class="sr-only">
      Language
    </legend>

    <label
      v-for="(option, index) in options"
      :key="index"
      :ref="el => optionRefs[index].value = el"
      class="toggle-option"
      :class="{ 'toggle-option-active': model === option }"
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
      class="toggle-slider"
      aria-hidden="true"
      :style="sliderStyle"
    />
  </fieldset>
</template>
```

This HTML structure uses several key elements:

**Fieldset and legend**
- The `<fieldset>` element naturally groups related inputs
- `<legend>` provides a label for the entire group (visually hidden here with the `sr-only` class, but still available for screen readers)

**Radio inputs**
- Radio buttons are the semantically correct choice for selecting one option from several
- They are visually hidden using the `sr-only` class, but remain accessible for keyboard and assistive technologies

**Labels**
- Each option has its own label, which forms the visible part of the switcher
- Thanks to the proper connection between the label and input, we get browser features "for free" - clicking on a label automatically activates the corresponding radio button, without the need to add a custom `@click` handler

### ARIA Attributes and Accessibility

For better support of assistive technologies, I added the following ARIA attributes:

- `role="radiogroup"` for the fieldset ensures correct interpretation of the group
- `aria-label="Language Switcher"` provides a name for the group
- `aria-hidden="true"` on the slider ensures that screen readers ignore this visual element

A semantically correct structure improves accessibility while minimizing the amount of JavaScript we need to write. The browser handles state switching when clicking and keyboard navigation for us.

## Technical Implementation
With a properly designed HTML structure, I could focus on implementing the functional logic of the component.

### Connection with the Parent Component

Vue 3.4+ offers a simplified way for two-way data binding using `defineModel()`:

```typescript
const model = defineModel()
```

What does this mean practically?
- When a user switches language, the `model` value is automatically updated
- At the same time, the change propagates to the parent component
- We don't need to manually define a custom prop and emit events

For comparison, in older versions of Vue we would have to write:

```typescript
const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])

// And then use in code:
emit('update:modelValue', newValue)
```

### Dynamic Measurement and Positioning

For proper display of the sliding indicator, we need to know the exact dimensions of individual buttons. We use references to DOM elements for this:

```typescript
const optionRefs = [ref(null), ref(null)]
```

In the template, we attach these references to individual elements:

```vue
<label
  v-for="(option, index) in options"
  :key="index"
  :ref="el => optionRefs[index].value = el"
  class="toggle-option"
>
  <!-- Label content -->
</label>
```

After component initialization and with every dimension change, we need to recalculate the size and position of the slider:

```typescript
// Reactive object for storing measured widths
const widths = ref({
  first: 0,
  second: 0,
})

// Function for updating dimensions
function updateWidths() {
  if (optionRefs[0].value && optionRefs[1].value) {
    widths.value = {
      first: optionRefs[0].value.offsetWidth,
      second: optionRefs[1].value.offsetWidth,
    }
  }
}

onMounted(() => {
  updateWidths()
  // Set initialized state in the next animation frame
  // for smooth slider display
  requestAnimationFrame(() => {
    isInitialized.value = true
  })
})
```

Based on the current selected value, we dynamically calculate the position and size of the slider:

```typescript
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
```

For a language switcher with short codes like "cs" and "en", fixed widths would be sufficient, but for switchers with texts of varying lengths, dynamic dimension measurement is essential. This approach makes our component a reusable tool for different types of switchers.

### Input Parameter Checking and Initialization

To ensure proper functioning of the component, it's important to:

1. **Validate props**
   - Verify that we have exactly two options (for this specific design)

```typescript
const props = defineProps({
  options: {
    type: Array,
    required: true,
    validator(value) {
      return value.length === 2
    },
  },
})
```

2. **Handle initialization**
   - The slider is displayed only after dimension initialization
   - We avoid flickering during position calculations

```typescript
const isInitialized = ref(false)

onMounted(() => {
  updateWidths()
  requestAnimationFrame(() => {
    isInitialized.value = true
  })
})
```

## Styling and Animation
Once the functional logic was in place, I could proceed to the visual aspect and styling of the component.

### Dynamic Slider Styles

- Calculation of position and width of the slider according to the current selection
- Smooth animation using [CSS transitions](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_transitions/Using_CSS_transitions)

```typescript
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
```

### Focus Styles and Accessibility

Special style for focus state ensures good visibility when using keyboard control:

```css
.toggle-option:has(input:focus-visible) {
  outline: 1px solid #5DA994;
}
```

Using the `:has` selector allows us to style the parent element based on the state of a nested input, which is a modern and elegant solution.

### UnoCSS Configuration

For styling, I use [UnoCSS](https://unocss.dev/) with custom shortcuts:

```typescript
// uno.config.ts
export default defineConfig({
  shortcuts: {
    'toggle-switch': 'relative inline-flex rounded-lg bg-zinc-900/80 border border-solid border-white/10 p-[var(--padding)]',
    'toggle-option': 'px-2 py-[2px] rounded-md z-1 cursor-pointer select-none text-sm font-medium transition-colors text-zinc-500',
    'toggle-option-active': 'text-zinc-50',
    'toggle-slider': 'absolute top-[var(--padding)] left-[var(--padding)] switcher-slider-height bg-zinc-700 rounded-md transition-all duration-300 pointer-events-none',
  },
})
```

The variable system (like `--padding`) ensures consistency and easy adjustment of appearance.

## Integration into Existing Code
With the completed and fully functional component, it was time to integrate it into the existing language switcher code.

After creating the general `ToggleSwitcher.vue` component, integration into the existing language switcher was very simple:

```vue
<!-- LanguageSwitcher.vue -->
<template>
  <ToggleSwitcher v-model="locale" :options="locales.map(loc => loc.code)" />
</template>
```

The original complex template with custom styles was replaced by a single line that uses the general component. This approach:

1. **Simplifies code** - Fewer lines, less duplication
2. **Improves maintainability** - Changes only need to be made in one place
3. **Supports reusability** - The same component can be used for other switchers

## Final Solution Demo

The resulting switcher takes the form of an elegant slider, where the active option is highlighted by a sliding indicator. The switcher responds to clicks and keyboard control and provides visual feedback for focus states.

![Language switcher animation](/toggle-switch/toggle-switch.gif){width=200 data-no-margin}

## Conclusion and Tips

### Key Principles

Creating a semantically correct and fully accessible language switcher is not a trivial task, but with modern Vue 3 tools and the right approach to HTML and CSS, excellent results can be achieved.

- **Always prefer correct HTML semantics** - Using the right elements is the foundation of accessibility
- **Accessibility is not an optional feature** - Remember users with different needs and devices

### Practical Recommendations

When creating similar components, I recommend:

- **Use modern Vue 3 features** like defineModel and the Composition API
- **Separate general components from specific uses** - Investment in reusability pays off

The implementation of an elegant and accessible language switcher is a great example of how aesthetics, functionality, and accessibility can be combined into one harmonious whole.
