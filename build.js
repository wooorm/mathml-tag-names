import assert from 'node:assert'
import https from 'node:https'
import fs from 'node:fs'
import concatStream from 'concat-stream'
import {bail} from 'bail'
import {unified} from 'unified'
import rehypeParse from 'rehype-parse'
import {selectAll} from 'hast-util-select'
import {toString} from 'hast-util-to-string'
import {mathmlTagNames} from './index.js'

const proc = unified().use(rehypeParse)

let count = 0

// Crawl MathMl 1.0.
https.get(
  'https://www.w3.org/TR/1998/REC-MathML-19980407/appendixF.html',
  (response) => {
    response
      .pipe(
        concatStream((buf) => {
          const links = selectAll('ul ul ul ul a', proc.parse(buf))
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

            if (!mathmlTagNames.includes(value)) mathmlTagNames.push(value)
          }

          done()
        })
      )
      .on('error', bail)
  }
)

// Crawl MathMl 2.0.
https.get('https://www.w3.org/TR/MathML2/appendixl.html', (response) => {
  response
    .pipe(
      concatStream((buf) => {
        const titles = selectAll(
          '.div1 .div2:first-child dl dt',
          proc.parse(buf)
        )
        let index = -1

        while (++index < titles.length) {
          const value = toString(titles[index])

          if (
            !mathmlTagNames.includes(value) &&
            value.slice(0, 2) !== 'm:' // See GH-6
          ) {
            mathmlTagNames.push(value)
          }
        }

        done()
      })
    )
    .on('error', bail)
})

// Crawl MathMl 3.0.
https.get('https://w3c.github.io/mathml/appendixi.html', (response) => {
  response
    .pipe(
      concatStream((buf) => {
        const titles = selectAll(
          '.div1 .div2:first-child dl dt',
          proc.parse(buf)
        )
        let index = -1

        while (++index < titles.length) {
          const value = toString(titles[index])

          if (!mathmlTagNames.includes(value)) {
            mathmlTagNames.push(value)
          }
        }

        done()
      })
    )
    .on('error', bail)
})

function done() {
  if (++count === 3) {
    fs.writeFile(
      'index.js',
      [
        '/**',
        ' * List of known MathML tag names.',
        ' *',
        ' * @type {Array<string>}',
        ' */',
        'export const mathmlTagNames = ' +
          JSON.stringify(mathmlTagNames.sort(), null, 2),
        ''
      ].join('\n'),
      bail
    )
  }
}
