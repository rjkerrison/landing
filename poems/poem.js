const init = () => {
  const poems = document.querySelectorAll('section')
  Array.from(poems).forEach(formatLines)
}

const formatLines = (poem, poemIndex) => {
  const title = poem.querySelector('h2').textContent
  const paragraphs = Array.from(poem.querySelectorAll('p'))
  const lines = paragraphs.flatMap((paragraph) =>
    Array.from(paragraph.childNodes).filter((n) => n.nodeType === 3)
  )
  lines.forEach((lineNode, index) =>
    formatLine(lineNode, index, title, poemIndex)
  )
  console.log(title, lines.length)
}

const formatLine = (lineNode, index, title, poemIndex) => {
  const line = document.createElement('span')
  line.classList.add('line')
  line.setAttribute('data-line-number', index + 1)
  line.setAttribute('title', `${title}, line ${index + 1}`)
  line.setAttribute('id', `poem-${poemIndex}-line-${index + 1}`)
  lineNode.replaceWith(line)
  line.appendChild(lineNode)
}

/* 
  if (index % 5 === 4) {
    const lineNumber = document.createElement('span')
    lineNumber.classList.add('line-number')
    line.textContent = index + 1
    line.appendChild(lineNumber)
  }
*/

window.addEventListener('DOMContentLoaded', init)
