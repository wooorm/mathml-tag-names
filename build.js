import assert from 'node:assert/strict'
import fs from 'node:fs/promises'
import {fromHtml} from 'hast-util-from-html'
import {selectAll} from 'hast-util-select'
import {toString} from 'hast-util-to-string'
import {mathmlTagNames as before} from './index.js'

const mathmlTagNames = new Set(before)

// Crawl MathMl 1.0.
const response1 = await fetch(
  'https://www.w3.org/TR/1998/REC-MathML-19980407/appendixF.html'
)
const tree1 = fromHtml(await response1.text())

const links = selectAll('ul ul ul ul a', tree1)

for (const link of links) {
  const head = link.children[0]
  assert(head)
  let value = toString(head)
  const start = value.indexOf('<')
  const end = value.indexOf('>')
  assert(start !== -1, 'non-negative start')
  assert(end !== -1, 'non-negative end')

  value = value.slice(start + 1, end)

  if (value.at(-1) === '/') {
    value = value.slice(0, -1)
  }

  mathmlTagNames.add(value)
}

// Crawl MathMl 2.0.
const response2 = await fetch('https://www.w3.org/TR/MathML2/appendixl.html')
const tree2 = fromHtml(await response2.text())
const titles2 = selectAll('.div1 .div2:first-child dl dt', tree2)

for (const title of titles2) {
  const value = toString(title)

  // See GH-6
  if (value.slice(0, 2) !== 'm:') {
    mathmlTagNames.add(value)
  }
}

// Crawl MathMl 3.0.
const response3 = await fetch('https://w3c.github.io/mathml/appendixi.html')
const tree3 = fromHtml(await response3.text())

const titles3 = selectAll('.div1 .div2:first-child dl dt', tree3)

for (const title of titles3) {
  const value = toString(title)
  mathmlTagNames.add(value)
}

await fs.writeFile(
  'index.js',
  [
    '/**',
    ' * List of known MathML tag names.',
    ' *',
    ' * @type {ReadonlyArray<string>}',
    ' */',
    'export const mathmlTagNames = ' +
      JSON.stringify([...mathmlTagNames].sort(), undefined, 2),
    ''
  ].join('\n')
)
