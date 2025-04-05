---
title: "Vitest: Testujte rychlostí blesku"
description: "Seznamte se s Vitestem, revolučním testovacím nástrojem, který zrychluje JavaScript testování až 4x oproti Jestu a nabízí nativní podporu ESM modulů."
publishedDate: "2025-03-20"
modifiedDate: "2025-03-20"
tags:
  - vitest
  - testovani
  - javascript
  - vite
  - jest
translationKey: "vitest-testing"
readingTime: 7
---

::blog-post-header{:title="title" :published-date="publishedDate" :reading-time="readingTime"}
::

Kdy jste naposledy čekali na dokončení testů vašeho JavaScript projektu a přemýšleli, jestli by to nešlo rychleji? Pokud jste jako většina vývojářů, pravděpodobně často. Naštěstí existuje řešení, které může váš testovací workflow zcela změnit. Jmenuje se [**Vitest**](https://vitest.dev/) a dnes se na něj podíváme zblízka.

## Proč současné testování nestačí

Přiznejme si to – testování v JavaScriptu nebylo nikdy perfektní. Zatímco nástroje jako [Jest](https://jestjs.io/) odvádějí skvělou práci, stále existují problémy:

- **Pomalé spuštění testů** – kolik kávy jste už vypili při čekání na dokončení testů?
- **Oddělené konfigurace** – jedna pro build, druhá pro testy... proč?
- **Problémy s ESM** – Jest a moderní [ECMAScript moduly](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules) nikdy nebyly nejlepší přátelé

A tady přichází na scénu Vitest a mění pravidla hry.

## Vitest: Když se Vite potká s testováním

Vitest není jen další testovací nástroj – je to **kompletní přehodnocení** toho, jak by testování v moderním JavaScript světě mělo vypadat.

Vitest byl vytvořen [Anthonym Fu](https://antfu.me/) a jeho první verze byla vydána v prosinci 2021. Tento testovací framework staví na základech [Vite](https://vite.dev/) – ultrarychlého vývojového serveru a build nástroje, za kterým stojí [Evan You](https://evanyou.me/) (tvůrce [Vue.js](https://vuejs.org/)). A stejně jako "vite" ve francouzštině znamená "rychlý", i Vitest následuje toto motto.

> "Vitest se snaží stát testovacím runnerem volby pro Vite projekty a solidní alternativou i pro projekty, které Vite nepoužívají." – z oficiální dokumentace Vitest
>

## 5 důvodů, proč Vitest změní váš pohled na testování

### 1. Bleskem rychlé testy

Zapomeňte na minuty čekání. Díky architektuře postavené na Vite je Vitest **až 4x rychlejší** než Jest. Jak? Vite používá nativní ES moduly a chytré cachování, které dramaticky zrychluje spouštění testů.

```bash
## Spuštění testů trvá zlomek času v porovnání s Jestem
npm test ## A jste hotovi dřív, než stihnu dvakrát mrknout.

```

### 2. Jedna konfigurace vládne všem

```javascript
// vite.config.js
export default {
  // Konfigurace pro váš build
  build: { },

  // ... která se automaticky používá i pro testy!
  test: {
    environment: 'jsdom',
    coverage: {
      reporter: ['text', 'json', 'html'],
    }
  }
}
```

Konec duplicitních konfigurací! Vitest používá stejný `vite.config.js` jako váš projekt. Cokoliv nastavíte pro vývoj – aliasy, pluginy, transformace – to vše je automaticky dostupné i pro vaše testy.

### 3. Moderní JavaScript bez kompromisů

Vitest je **prvním významným testovacím frameworkem**, který nativně využívá ECMAScript moduly. Zatímco Jest stále transpiluje váš kód zpět do CommonJS, Vitest spouští vaše testy tak, jak byly napsány – s plnou podporou moderních funkcí JavaScriptu.

Vitest je jako sportovec, který trénuje ve stejných podmínkách, v jakých bude závodit – žádná nepříjemná překvapení při přechodu do produkce.

### 4. Přátelské setkání s Jestem

```javascript
// Váš starý Jest test
test('funguje perfektně ve Vitestu', () => {
  expect(2 + 2).toBe(4)
  expect({ name: 'Vitest' }).toMatchSnapshot()
})
```

Přecházíte z Jestu? Žádný problém! Vitest podporuje Jest API, takže většina vašich testů bude fungovat bez změny. `describe`, `it`, `expect` – vše funguje, jak byste očekávali.

### 5. Výkonný i v monorepo projektech

Máte složitý monorepo s mnoha balíčky? Vitest má řešení s funkcí **Workspaces**. Testujte napříč různými projekty jedním příkazem, sdílejte konfiguraci a užijte si plynulý testovací proces.

## Reálné srovnání: Vitest vs. Jest

| Aspekt          | Vitest           | Jest                  |
| --------------- | ---------------- | --------------------- |
| **Rychlost**    | ⚡⚡⚡⚡⚡            | ⚡⚡⚡                   |
| **ESM podpora** | Nativní          | Omezená (transpilace) |
| **Konfigurace** | Sdílená s Vite   | Samostatná            |
| **Watch mode**  | Ultra-rychlý HMR | Standardní            |
| **TypeScript**  | Přímá podpora    | Vyžaduje nastavení    |
| **Komunita**    | Rychle rostoucí  | Zralá, rozsáhlá       |
| **Dokumentace** | Rozvíjející se   | Vynikající            |

## Jak začít: Od nuly k Vitestu za 5 minut

Začít s Vitestem je jednodušší, než si myslíte:

1. **Instalace:**

```bash
npm install -D vitest
```

2. **Přidání skriptu do package.json:**

```json
{
  "scripts": {
    "test": "vitest",
    "test:ui": "vitest --ui",
    "coverage": "vitest run --coverage"
  }
}
```

3. **Vytvoření prvního testu:**

```javascript
// sum.test.js
import { expect, test } from 'vitest'
import { sum } from './sum.js'

test('sčítá 1 + 2 a vrací 3', () => {
  expect(sum(1, 2)).toBe(3)
})
```

4. **Spuštění:**
```bash
npm test
```

A to je vše! Váš první test běží rychlostí blesku.

## Migrace z Jestu není noční můra

Obáváte se, že přechod na Vitest bude bolestivý? Nebojte se! Většina projektů vyžaduje jen minimální změny:

1. Nahraďte `jest.fn()` za `vi.fn()`
2. Aktualizujte importy testovacích funkcí
3. Přesuňte konfiguraci z `jest.config.js` do `vite.config.js`

Pro většinu testů nebudete muset měnit ani řádek kódu!

## Závěrem: Je čas na změnu?

JavaScript ekosystém se neustále vyvíjí a testování by nemělo zůstat pozadu. Vitest představuje novou generaci testovacích nástrojů, které lépe odpovídají moderním potřebám webového vývoje.

Pokud používáte Vite, přechod na Vitest je téměř povinnost. Pokud ne, stále stojí za zvážení pro svou rychlost, jednoduchost a moderní přístup.

S ohledem na všechny tyto výhody se nabízí jednoduchá otázka: "Proč ještě nepoužíváte Vitest ve svém projektu?”
