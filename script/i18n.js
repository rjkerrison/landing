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

function getPreferredLocale(current) {
  const userLocales = [
    ...window.navigator.languages,
    window.navigator.language,
    window.navigator.userLanguage,
  ]
  if (userLocales.some((x) => x === current)) {
    return tryGetMatch(current)
  }

  for (let i = 0; i < userLocales.length; i++) {
    const locale = userLocales[i]
    const match = tryGetMatch(locale)
    if (match) {
      return match
    }
  }
  // Default to English
  return availableLocales.en
}

function tryGetMatch(localeCode) {
  for (let key of Object.keys(availableLocales)) {
    const spec = availableLocales[key]
    if (isMatchingLocale(spec, localeCode)) {
      return spec
    }
  }
  return null
}

function isMatchingLocale(availableLocale, localeCode) {
  const isPerfectMatch = availableLocale.locale === localeCode
  const isCloseMatch = availableLocale.alternativeLocales.some(
    (x) => x === localeCode
  )
  return isPerfectMatch || isCloseMatch
}

function redirectIfOtherLocalePreferred() {
  const currentLang = getCurrentLang()
  const locale = getPreferredLocale(currentLang)
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
