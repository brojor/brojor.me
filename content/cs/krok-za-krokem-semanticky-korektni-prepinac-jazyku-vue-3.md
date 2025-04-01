---
title: "Krok za krokem: Sémanticky korektní přepínač jazyků ve Vue 3"
description: "Vytvořte sémanticky korektní a plně přístupný přepínač jazyků s elegantní animací ve Vue 3. Krok za krokem od návrhu po implementaci s důrazem na a11y."
date: "2025-04-01"
tags:
  - vue
  - pristupnost
  - UI
  - typescript
  - i18n
translationKey: "semantic-language-switcher"
readingTime: 10
---

::blog-post-header{:title="title" :date="date" :reading-time="readingTime"}
::

Na vícejazyčném webu je přepínač jazyků klíčovým prvkem uživatelského rozhraní. Tato nenápadná, ale důležitá komponenta musí být intuitivní, vizuálně srozumitelná a především [přístupná](https://developer.mozilla.org/en-US/docs/Web/Accessibility) pro všechny uživatele, včetně těch, kteří používají čtečky obrazovek nebo ovládají web pouze klávesnicí.

### Časté nedostatky jazykových přepínačů

Při implementaci jazykového přepínače často narážíme na několik běžných problémů:

1. **Nevhodná sémantika HTML** - Často se spokojíme s obyčejnými `<div>` a `<span>`, které postrádají správný význam pro asistivní technologie
2. **Opomíjení přístupnosti** - Zapomínáme na uživatele, kteří nemohou, nebo nechtějí používat myš
3. **Zanedbání estetiky a UX** - Podceňujeme vizuální zpětnou vazbu a přepínač není dostatečně intuitivní pro uživatele
4. **Jednorázová řešení** - Vytváříme jednorázová řešení místo modulárních komponent, které by se daly použít i v jiných částech aplikace

V tomto článku vás provedu procesem redesignu jazykového přepínače na mém osobním webu s důrazem na všechny výše uvedené aspekty.

## Analýza původního řešení

Původní implementace jazykového přepínače byla jednoduchá:

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

Toto řešení sice fungovalo, ale nevyhovovalo z hlediska sémantiky, přístupnosti ani designu.

## Cíle redesignu

Po identifikaci nedostatků jsem si stanovil následující cíle pro novou implementaci:

- **Správná struktura HTML** - Použití vhodných elementů, které nejlépe reprezentují funkci přepínače
- **Podpora klávesnice a asistivních technologií** - Zajistit, aby komponenta fungovala správně i bez myši a s čtečkami obrazovky
- **Vizuální zpětná vazba** - Jasné indikace aktuálního stavu a interakcí (focus, hover)
- **Plynulé animace** - Plynulý přechod mezi stavy pro lepší uživatelský zážitek
- **Modulární a znovupoužitelná komponenta** - Navrhnout komponentu tak, aby ji bylo možné snadno použít i v jiných částech aplikace
- **Jednoduché API** - Minimalizovat složitost integrace do existujícího kódu

## Volba technického přístupu
S definovanými cíli jsem mohl přistoupit k výběru vhodného technického přístupu, který by všechny tyto požadavky naplnil.

### Existující řešení

Před vlastní implementací jsem zvážil existující řešení, především knihovny poskytující přístupné UI komponenty.

Dvě populární volby pro Vue 3 jsou:

- **[Headless UI](https://headlessui.dev/)** - Neostylované, přístupné komponenty od Tailwind Labs
- **[Radix Vue](https://www.radix-vue.com/)** - Port React knihovny zaměřený na přístupnost

Obě knihovny nabízejí `RadioGroup` komponenty, které by teoreticky mohly sloužit jako základ pro jazykový přepínač.

### Důvody pro vlastní implementaci

I přes kvalitu těchto knihoven jsem upřednostnil vlastní implementaci z těchto důvodů:

1. **Minimalizace závislostí** - Přidání externí knihovny kvůli jediné komponentě zhoršuje výkon webu
2. **Kontrola nad animacemi** - Vlastní implementace umožňuje vytvořit přesně takový vizuální efekt, jaký potřebuji
3. **Flexibilita a učení** - Vytvoření komponenty od základů prohlubuje porozumění principům přístupnosti
4. **Integrace s existujícím kódem** - Vlastní řešení lépe zapadá do architektury mého webu bez nutnosti přizpůsobovat se API knihovny

### Technické rozhodnutí

Po zvážení různých možností jsem se rozhodl implementovat přepínač jako skupinu radio buttonů s animovaným indikátorem. Tato volba nabízí několik výhod:

- [Radio buttony](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/radio) jsou sémanticky správná volba pro výběr jedné možnosti z několika
- Prohlížeče poskytují vestavěnou podporu pro ovládání klávesnicí
- [Fieldset](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/fieldset) a [legend](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/legend) poskytují správný kontext pro skupinu souvisejících vstupů

## Sémantická struktura HTML
Po rozhodnutí implementovat vlastní řešení s radio buttony bylo dalším krokem navrhnout správnou sémantickou strukturu HTML:

```vue
<template>
  <fieldset
    role="radiogroup"
    aria-label="Přepínač jazyka"
    class="toggle-switch"
    style="--padding: 4px"
  >
    <legend class="sr-only">
      Jazyk
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

Tato HTML struktura využívá několik klíčových prvků:

**Fieldset a legend**
- Element `<fieldset>` přirozeně seskupuje související vstupy
- `<legend>` poskytuje popisek pro celou skupinu (zde skrytý vizuálně třídou `sr-only`, ale stále dostupný pro čtečky)

**Radio inputs**
- Radio buttony jsou sémanticky správná volba pro výběr jedné možnosti z několika
- Jsou vizuálně skryté pomocí třídy `sr-only`, ale zůstávají přístupné pro klávesnici a asistivní technologie

**Labels**
- Každá volba má svůj vlastní label, který tvoří viditelnou část přepínače
- Díky správnému propojení labelu s inputem získáváme "zdarma" funkce prohlížeče - při kliknutí na label se automaticky aktivuje příslušný radio button, bez nutnosti přidávat vlastní `@click` handler

### ARIA atributy a přístupnost

Pro lepší podporu asistivních technologií jsem přidal následující ARIA atributy:

- `role="radiogroup"` pro fieldset zajišťuje správnou interpretaci skupiny
- `aria-label="Přepínač jazyka"` poskytuje název skupiny
- `aria-hidden="true"` na slideru zajišťuje, že čtečky ignorují tento vizuální prvek

Sémanticky správná struktura zlepšuje přístupnost a zároveň minimalizuje množství JavaScriptu, které musíme psát. Prohlížeč za nás řeší přepínání stavu při kliknutí a navigaci pomocí klávesnice.

## Technická implementace
Se správně navrženou HTML strukturou jsem se mohl zaměřit na implementaci funkční logiky komponenty.

### Propojení s rodičovskou komponentou

Vue 3.4+ nabízí zjednodušený způsob pro obousměrnou vazbu dat pomocí `defineModel()`:

```typescript
const model = defineModel()
```

Co to prakticky znamená?
- Když uživatel přepne jazyk, hodnota `model` se automaticky aktualizuje
- Zároveň se změna propaguje do rodičovské komponenty
- Nemusíme ručně definovat vlastní prop a emit události

Pro porovnání, ve starších verzích Vue bychom museli psát:

```typescript
const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])

// A pak v kódu používat:
emit('update:modelValue', newValue)
```

### Dynamické měření a pozicování

Pro správné zobrazení posuvného indikátoru (slideru) potřebujeme znát přesné rozměry jednotlivých tlačítek. K tomu využíváme reference na DOM elementy:

```typescript
const optionRefs = [ref(null), ref(null)]
```

V šabloně pak připojíme tyto reference k jednotlivým elementům:

```vue
<label
  v-for="(option, index) in options"
  :key="index"
  :ref="el => optionRefs[index].value = el"
  class="toggle-option"
>
  <!-- Obsah labelu -->
</label>
```

Po inicializaci komponenty a při každé změně rozměrů potřebujeme znovu vypočítat velikost a pozici slideru:

```typescript
// Reaktivní objekt pro uložení naměřených šířek
const widths = ref({
  first: 0,
  second: 0,
})

// Funkce pro aktualizaci rozměrů
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
  // Nastavíme inicializovaný stav až v dalším snímku animace
  // pro plynulé zobrazení slideru
  requestAnimationFrame(() => {
    isInitialized.value = true
  })
})
```

Na základě aktuální vybrané hodnoty dynamicky počítáme pozici a velikost slideru:

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

Pro jazykový přepínač s krátkými kódy jako "cs" a "en" by stačilo použít pevné šířky, avšak pro přepínače s různě dlouhými texty je dynamické měření rozměrů nezbytné. Tento přístup dělá z naší komponenty znovupoužitelný nástroj pro různé typy přepínačů.

### Kontrola vstupních parametrů a inicializace

Pro zajištění správného fungování komponenty je důležité:

1. **Validace props**
   - Ověření, že máme přesně dvě možnosti (pro tento konkrétní design)

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

2. **Ošetření inicializace**
   - Slider se zobrazí až po inicializaci rozměrů
   - Vyhýbáme se blikání během výpočtu pozic

```typescript
const isInitialized = ref(false)

onMounted(() => {
  updateWidths()
  requestAnimationFrame(() => {
    isInitialized.value = true
  })
})
```

## Stylování a animace
Jakmile byla funkční logika na svém místě, mohl jsem přistoupit k vizuální stránce a stylování komponenty.

### Dynamické styly slideru

- Výpočet pozice a šířky slideru podle aktuální volby
- Plynulá animace pomocí [CSS transitions](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_transitions/Using_CSS_transitions)

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

### Focus styly a přístupnost

Speciální styl pro focus stav zajišťuje dobrou viditelnost při ovládání klávesnicí:

```css
.toggle-option:has(input:focus-visible) {
  outline: 1px solid #5DA994;
}
```

Použití `:has` selektoru nám umožňuje stylovat rodičovský element na základě stavu vnořeného inputu, což je moderní a elegantní řešení.

### UnoCSS konfigurace

Pro stylování využívám [UnoCSS](https://unocss.dev/) s vlastními shortcuty:

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

Systém proměnných (jako `--padding`) zajišťuje konzistenci a snadnou úpravu vzhledu.

## Integrace do existujícího kódu
S dokončenou a plně funkční komponentou přišel čas na její integraci do existujícího kódu jazykového přepínače.

Po vytvoření obecné komponenty `ToggleSwitcher.vue` byla integrace do existujícího jazykového přepínače velmi jednoduchá:

```vue
<!-- LanguageSwitcher.vue -->
<template>
  <ToggleSwitcher v-model="locale" :options="locales.map(loc => loc.code)" />
</template>
```

Původní komplexní šablona s vlastními styly byla nahrazena jedním řádkem, který využívá obecnou komponentu. Tento přístup:

1. **Zjednodušuje kód** - Méně řádků, méně duplicity
2. **Zlepšuje udržovatelnost** - Úpravy stačí provést na jednom místě
3. **Podporuje znovupoužitelnost** - Stejnou komponentu lze použít i pro jiné přepínače

## Ukázka finálního řešení

Výsledný přepínač má podobu elegantního slideru, kde aktivní volba je zvýrazněna posuvným indikátorem. Přepínač reaguje na kliknutí i na ovládání klávesnicí a poskytuje vizuální zpětnou vazbu pro focus stavy.

![Animace přepínače jazyků](/toggle-switch/toggle-switch.gif){width=200 data-no-margin}

## Závěr a tipy

### Klíčové principy

Vytvoření sémanticky korektního a plně přístupného přepínače jazyků není triviální úkol, ale s moderními nástroji Vue 3 a správným přístupem k HTML a CSS se dá dosáhnout výborných výsledků.

- **Vždy preferujte správnou sémantiku HTML** - Použití správných elementů je základ přístupnosti
- **Přístupnost není volitelná funkce** - Pamatujte na uživatele s různými potřebami a zařízeními

### Doporučení pro praxi

Při vytváření podobných komponent doporučuji:

- **Využívejte moderní Vue 3 funkce** jako defineModel a kompoziční API
- **Oddělujte obecné komponenty od specifických použití** - Investice do znovupoužitelnosti se vyplatí

Implementace elegantního a přístupného přepínače jazyků je skvělý příklad, jak lze skloubit estetiku, funkcionalitu a přístupnost do jednoho harmonického celku.
