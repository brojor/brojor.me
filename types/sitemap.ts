export type LangCode = 'cs' | 'en'
export type Hreflang = 'cs-CZ' | 'en-US' | 'x-default'

export interface BlogPostMetadata {
  lang: LangCode
  slug: string
  translationKey: string
}

export interface BlogPostTranslation {
  hreflang: Hreflang
  href: string
}

export interface BlogPostTranslations {
  [key: string]: Record<LangCode, string>
}
