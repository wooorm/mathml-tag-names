import assert from 'node:assert/strict'
import fs from 'node:fs/promises'
import fetch from 'node-fetch'
import {fromHtml} from 'hast-util-from-html'
import {selectAll} from 'hast-util-select'
import {toString} from 'hast-util-to-string'
import {mathmlTagNames} from './index.js'

// Crawl MathMl 1.0.
const response1 = await fetch(
  'https://www.w3.org/TR/1998/REC-MathML-19980407/appendixF.html'
)
const text1 = await response1.text()
const tree1 = fromHtml(text1)

const links = selectAll('ul ul ul ul a', tree1)
let index = -1

while (++index < links.length) {
  let value = toString(links[index].children[0])
  const start = value.indexOf('<')
  const end = value.indexOf('>')
  assert(start !== -1, 'non-negative start')
  assert(end !== -1, 'non-negative end')

  value = value.slice(start + 1, end)

  if (value.charAt(value.length - 1) === '/') {
    value = value.slice(0, -1)
  }

  mathmlTagNames.push(value)
}

// Crawl MathMl 2.0.
const response2 = await fetch('https://www.w3.org/TR/MathML2/appendixl.html')
const text2 = await response2.text()
const tree2 = fromHtml(text2)
const titles2 = selectAll('.div1 .div2:first-child dl dt', tree2)
index = -1

while (++index < titles2.length) {
  const value = toString(titles2[index])

  if (
    value.slice(0, 2) !== 'm:' // See GH-6
  ) {
    mathmlTagNames.push(value)
  }
}

// Crawl MathMl 3.0.
const response3 = await fetch('https://w3c.github.io/mathml/appendixi.html')
const text3 = await response3.text()
const tree3 = fromHtml(text3)

const titles3 = selectAll('.div1 .div2:first-child dl dt', tree3)
index = -1

while (++index < titles3.length) {
  const value = toString(titles3[index])
  mathmlTagNames.push(value)
}

const list = [...new Set(mathmlTagNames)].sort()

await fs.writeFile(
  'index.js',
  [
    '/**',
    ' * List of known MathML tag names.',
    ' *',
    ' * @type {Array<string>}',
    ' */',
    'export const mathmlTagNames = ' + JSON.stringify(list, null, 2),
    ''
  ].join('\n')
)
