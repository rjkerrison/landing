const availableLocales = {
  en: {
    locale: 'en-GB',
    alternativeLocales: ['en', 'en-US'],
    site: '/',
  },
  fr: {
    locale: 'fr-FR',
    alternativeLocales: ['fr', 'fr-CA'],
    site: '/fr',
  },
}

function getCurrentLang() {
  return document.querySelector('meta[lang]').getAttribute('lang')
}

function getPreferredLocale() {
  const userLocales = [
    ...window.navigator.languages,
    window.navigator.language,
    window.navigator.userLanguage,
  ]

  for (let i = 0; i < userLocales.length; i++) {
    const locale = userLocales[i]
    for (let key of Object.keys(availableLocales)) {
      const spec = availableLocales[key]
      if (spec.locale === locale) {
        return spec
      }
      if (spec.alternativeLocales.some((x) => x === locale)) {
        return spec
      }
    }
  }
  // Default to English
  return availableLocales.en
}

function redirectIfOtherLocalePreferred() {
  const currentLang = getCurrentLang()
  const locale = getPreferredLocale()
  if (currentLang === locale.locale) {
    return
  }

  const currentSite = window.location
  if (currentSite === locale.site) {
    return
  }
  window.location = locale.site
}

redirectIfOtherLocalePreferred()
