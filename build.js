import fs from 'fs'
import https from 'https'
import concat from 'concat-stream'
import bail from 'bail'
import unified from 'unified'
import html from 'rehype-parse'
import {selectAll} from 'hast-util-select'
import toString from 'hast-util-to-string'
import {mathmlTagNames} from './index.js'

var proc = unified().use(html)

var count = 0

// Crawl MathMl 1.0.
https.get(
  'https://www.w3.org/TR/1998/REC-MathML-19980407/appendixF.html',
  onmathml1
)

// Crawl MathMl 2.0.
https.get('https://www.w3.org/TR/MathML2/appendixl.html', onmathml2)

// Crawl MathMl 3.0.
https.get('https://w3c.github.io/mathml/appendixi.html', onmathml3)

function onmathml1(response) {
  response.pipe(concat(onconcat)).on('error', bail)

  function onconcat(buf) {
    var links = selectAll('ul ul ul ul a', proc.parse(buf))
    var index = -1
    var value

    while (++index < links.length) {
      value = toString(links[index].children[0])

      value = value.slice(value.indexOf('<') + 1, value.indexOf('>'))

      if (value.charAt(value.length - 1) === '/') {
        value = value.slice(0, -1)
      }

      if (!mathmlTagNames.includes(value)) mathmlTagNames.push(value)
    }

    done()
  }
}

function onmathml2(response) {
  response.pipe(concat(onconcat)).on('error', bail)

  function onconcat(buf) {
    var titles = selectAll('.div1 .div2:first-child dl dt', proc.parse(buf))
    var index = -1
    var value

    while (++index < titles.length) {
      value = toString(titles[index])

      if (
        !mathmlTagNames.includes(value) &&
        value.slice(0, 2) !== 'm:' // See GH-6
      ) {
        mathmlTagNames.push(value)
      }
    }

    done()
  }
}

function onmathml3(response) {
  response.pipe(concat(onconcat)).on('error', bail)

  function onconcat(buf) {
    var titles = selectAll('.div1 .div2:first-child dl dt', proc.parse(buf))
    var index = -1
    var value

    while (++index < titles.length) {
      value = toString(titles[index])

      if (!mathmlTagNames.includes(value)) {
        mathmlTagNames.push(value)
      }
    }

    done()
  }
}

function done() {
  if (++count === 3) {
    fs.writeFile(
      'index.js',
      'export var mathmlTagNames = ' +
        JSON.stringify(mathmlTagNames.sort(), null, 2) +
        '\n',
      bail
    )
  }
}
