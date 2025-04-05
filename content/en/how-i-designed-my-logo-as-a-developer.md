---
title: "Developer in the Role of Designer: My Journey to Creating a Logo for My Personal Website"
description: "Discover the secrets of creating a minimalist logo from concept to implementation. Learn how to connect programming thinking with graphic design and create a strong visual identity for your website."
publishedDate: "2025-03-29"
modifiedDate: "2025-03-29"
tags:
 - logo
 - design
 - figma
 - svg
 - nuxt
translationKey: "developer-designer-logo"
readingTime: 10
---

::blog-post-header{:title="title" :published-date="publishedDate" :reading-time="readingTime"}
::

When I decided to create my personal website, I knew I needed a strong visual identity. A logo is the first thing visitors will see – it's a visual shortcut to who I am and what I do. In this article, I'll guide you through the entire process of creating my logo from the initial idea to the final form, and I'll introduce you to the tools that helped me most during this creative journey.

## Why I Decided to Create My Own Logo

Of course - I could have approached a graphic designer or used one of the online logo generation tools. But as a developer and problem-solving enthusiast, I saw it as an opportunity:

1. **Perfectly capture my identity** - Nobody knows my values and vision better than myself
2. **Learn new skills** - Dive deeper into graphic design and vector graphics
3. **Save resources** - A low-budget solution that can be modified as needed

## Intent and Requirements

When creating the logo, I focused on simplicity and memorability. The best logos are often the simplest ones - easily recognizable and functional in various contexts. A minimalist approach ensures that the logo will work effectively across all types of media - from business cards to mobile applications.

The logo had to meet several practical requirements:
- **Scalability** - Functional in both small and large dimensions
- **Monochrome version** - For various usage contexts
- **Responsiveness** - Ability to use as a favicon or in different formats

## Logo Concept: BroJor

As the foundation for my logo, I wanted to use the word BroJor, which is an abbreviation of the first three letters of my first and last name - Bronislav Jordán. This approach allowed me to create a unique but meaningful identifier.

### Typography as the Foundation

When selecting a typeface, I considered the psychology of typography - while serif fonts evoke tradition and formality, sans-serif fonts exude modernity and cleanliness. Sans-serif is an ideal choice for technology projects due to its readability on digital devices and minimalist character.

## Creation Process

### Phase 1: Generating Typographic Variants Using Nuxt 3

To find the ideal font for my logo, I created a simple [Nuxt 3](https://nuxt.com/) application that allowed me to visualize the word "BroJor" in various modern sans-serif fonts. The implementation was straightforward:

```shell
pnpm create nuxt -M @nuxt/fonts font-visualizer
```

```typescript
// nuxt.config.js
export default defineNuxtConfig({
  modules: ['@nuxt/fonts'],
  fonts: {
    families: [
      { name: 'Helvetica', global: true },
      { name: 'Montserrat', global: true },
      { name: 'Roboto', global: true },
      { name: 'Lato', global: true },
      { name: 'Open Sans', global: true },
      { name: 'Avenir', global: true },
      { name: 'Futura', global: true },
      { name: 'Poppins', global: true },
      { name: 'Proxima Nova', global: true },
      { name: 'Nunito', global: true },
    ]
  },
})
```

The [@nuxt/fonts](https://nuxt.com/modules/fonts) module handles all CSS code and when it finds a `font-family` declaration, it performs the following steps:
- Searches for used fonts from web font providers such as Google Fonts, Bunny Fonts, Fontshare and Adobe
- Automatically generates `@font-face` rules that direct the browser to the correct font source files

When dynamically setting `font-family` via the `:style` directive, it's important to set the `global` property to `true` in each font's option object. This step ensures proper application of the font throughout the application.

```vue
<!-- pages/font-family.vue -->
<script setup>
const fonts = [
  'Helvetica',
  'Montserrat',
  'Roboto',
  'Lato',
  'Open Sans',
  'Avenir',
  'Futura',
  'Poppins',
  'Proxima Nova',
  'Nunito',
]
</script>

<template>
  <div>
    <p v-for="font in fonts" :key="font" :style="{ fontFamily: font }">
      BroJor
    </p>
  </div>
</template>

<style>
p {
  font-size: 100px;
  margin-block: 1rem;
  font-weight: 500;
}
</style>
```

This approach allowed me to effectively compare how different fonts affect the look and feel of my logo.

### Phase 2: Selecting Open Sans and the Square Brackets Concept

Of the fonts compared, I was most impressed by [Open Sans](https://fonts.google.com/specimen/Open+Sans), primarily due to the characteristic descender of the letter "J". I had previously considered surrounding the logo with square brackets, which are typical for programming languages and would naturally reference my profession. The descender of the letter "J" fit perfectly into this concept, as it could be elegantly directed toward the bottom horizontal line of the left bracket.

![Detail of connecting the J descender with the square bracket](/developer-designer-logo-web/j-bracket-connection.png)

### Phase 3: Experiments with Thickness and Spacing

After selecting the font-family, I generated all its weights to visually select the right one:

```vue
<!-- pages/font-weight.vue -->
<script setup>
const weights = [300, 400, 500, 600, 700, 800]
</script>

<template>
  <p v-for="weight in weights" :key="weight" :style="{ fontWeight: weight }">
    BroJor
  </p>
</template>

<style>
p {
  font-size: 100px;
  margin-block: 1rem;
  font-family: 'Open Sans';
}
</style>
```

I selected weight 700, which ensures that the logo will be prominent and distinct without appearing too heavy. I also experimented with letter spacing and tested how the logo works in various sizes.

### Phase 4: Vectorization in Figma

After I was satisfied with the typography, I increased the font-size to the maximum size that would fit on my screen and took a screenshot. I transferred this to [Figma](https://www.figma.com/), which offers a simple and intuitive environment for working with vector graphics.

In this phase, I used the [Image Tracer](https://www.figma.com/community/plugin/735707089415755407/image-tracer) plugin, which allowed me to create a vector path around the letters in the image. The license costs $10, but the first five uses are free, which was sufficient for my needs.

### Phase 5: Finalizing the Design and Adding Programming Elements

After creating the vector path, I drew in the square brackets and directed the tail of the letter "J" according to my intention – toward the bottom horizontal line of the left bracket. This detail connects the text element with the square brackets and creates a harmonious whole that reflects my professional focus.

The next step was highlighting the first three letters of the logo (Bro), which strengthens brand recognition and creates an interesting visual accent.

### Phase 6: Color Palette

For my brand color, I chose a color that in color psychology combines the stability of blue and the creativity of green. This combination is suitable for a logo that should reflect innovation, digital environment, cleanliness, and freshness. Specifically, I used a turquoise shade with the value #5DA994, which:

1. Is sufficiently distinctive but not aggressive
2. Works great on both light and dark backgrounds
3. Evokes a technological environment while still appearing friendly

### Phase 7: Optimizing SVG for Web

Once I had the final [SVG file](https://developer.mozilla.org/en-US/docs/Web/SVG), the next key step was its optimization. For this purpose, the following tools can be used:

- **[SVGO](https://github.com/svg/svgo)** - A command-line tool for optimizing SVG
- **[SVGOMG](https://optimize.svgomg.net/)** - A web application built on SVGO with a clear interface

Optimization includes:
1. Removing unnecessary metadata and comments
2. Eliminating hidden layers and unused definitions
3. Merging overlapping paths
4. Rounding numerical values for smaller file size
5. Cleaning up attributes and styles

```bash
# Example of using SVGO in the command line
svgo input.svg -o output.svg
```

Reducing the file size has a direct impact on website loading speed, which improves both user experience and SEO score.

Importantly, the optimization had no negative impact on the visual quality of the logo – it looks exactly the same, just "slimmer" from a technical perspective.

## Benefits of Vector Logo

The decision to use a logo in vector form brings several significant advantages:

1. **Infinite scaling without quality loss** - The logo remains sharp at any size, from favicon to billboard
2. **Ability to change color using CSS** - Ideal for dark mode, hover effects, and other interactive elements
3. **Small file size** - SVG is an extremely economical format, which contributes to fast website loading
4. **Animation possibilities** - SVG elements can be animated using CSS or JavaScript

For a more detailed comparison of SVG with raster formats such as JPEG or PNG, I recommend reading the article ["When and Why to Use SVG, WebP, PNG, and JPEG: A Comprehensive Guide"](https://www.peckadesign.cz/blog/kdy-a-proc-pouzivat-svg-webp-png-a-jpeg) by [Tereza Čaklošová](https://www.linkedin.com/in/tereza-cak/), which excellently complements the theoretical foundations to the practical experiences described in this article.

## Implementing the Logo on the Website

Implementing the SVG logo into the website was straightforward - just place the resulting file in the `/public` folder and then integrate it into the website header using this code:

```vue
<NuxtLink to="/">
    <img src="/logo.svg" alt="Logo" />
</NuxtLink>
```

## What I Learned

This entire process brought me valuable lessons:

1. **Simplicity is key** - A minimalist approach creates timeless and flexible logos
2. **Connecting technology and design** - Programming thinking can be successfully applied to visual problems
3. **Iterative approach** - As with software development, it's important to test and adjust
4. **Value of vector graphics** - SVG format provides incredible flexibility for web projects

## Recommendations for Those Who Want to Create Their Own Logo

If you want to embark on a similar project, here are my tips:

1. **Start with a concept** - Find a basic idea that characterizes you
2. **Experiment with typography** - Font itself can be a strong foundation for a logo
3. **Add a personal element** - Something that reflects your focus or personality
4. **Keep it simple** - Complex logos are harder to remember and problematic in various contexts
5. **Think about technical implementation** - The logo should be easily usable across different media

## Conclusion

The final design fulfilled all my original intentions. The minimalist approach to the logo naturally connects my personal identity with my professional focus. Beyond being a visual element, it's also a symbol of my approach to problem-solving - combining technical precision, creative thinking, and emphasis on functionality.

![Final logo design](/developer-designer-logo-web/final-logo.png)

The journey itself from the initial thought to the final logo had as much value for me as the result, and it's exactly this kind of creative experience that I seek in all my projects.
