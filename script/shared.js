const links = [
  ['/', 'Home'],
  ['/textbook', 'Textbook'],
  ['/ticker-board', 'Ticker Board'],
]

if (window.language === 'fr') {
  links[0][1] = 'Accueil'
  links[1][1] = "Cahier d'exercises"
  links[2][1] = 'Afficheur à palettes'
}

const createNav = () => {
  const nav = document.createElement('nav')
  const ul = document.createElement('ul')

  links.forEach(([url, text]) => {
    const li = document.createElement('li')
    const a = document.createElement('a')
    a.href = url
    a.textContent = text
    li.appendChild(a)
    ul.appendChild(li)
  })

  nav.appendChild(ul)
  return nav
}

window.addEventListener('DOMContentLoaded', () => {
  const header = document.createElement('header')
  header.id = 'rjk-shared-header'
  const div = document.createElement('div')
  div.classList.add('inner')

  const nav = createNav()

  const pageH1 = document.querySelector('h1')
  if (!pageH1) {
    const h1 = document.createElement('h1')
    h1.textContent = window.mainHeading || 'Robin James Kerrison'
    div.appendChild(h1)
  } else {
    const p = document.createElement('p')
    p.textContent = pageH1.textContent || 'Robin James Kerrison'
    div.appendChild(p)
  }

  div.appendChild(nav)
  header.appendChild(div)
  document.body.insertBefore(header, document.body.firstElementChild)
})
