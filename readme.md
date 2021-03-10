# mathml-tag-names

[![Build][build-badge]][build]
[![Coverage][coverage-badge]][coverage]
[![Downloads][downloads-badge]][downloads]
[![Size][size-badge]][size]

List of known MathML tag names.
Includes the elements from [MathML 1][mathml1], [MathML 2][mathml2], and
[MathML 3][mathml3].

The repo contains a script to crawl specs to include newly introduced tag names.

## Install

This package is ESM only: Node 12+ is needed to use it and it must be `import`ed
instead of `require`d.

[npm][]:

```sh
npm install mathml-tag-names
```

## Use

```js
var mathmlTagNames = require('mathml-tag-names')

console.log(mathmlTagNames.length) // => 202

console.log(mathmlTagNames.slice(0, 20))
```

Yields:

```js
[ 'abs',
  'and',
  'annotation',
  'annotation-xml',
  'apply',
  'approx',
  'arccos',
  'arccosh',
  'arccot',
  'arccoth',
  'arccsc',
  'arccsch',
  'arcsec',
  'arcsech',
  'arcsin',
  'arcsinh',
  'arctan',
  'arctanh',
  'arg',
  'bind' ]
```

## API

This package exports the following identifiers: `mathmlTagNames`.
There is no default export.

### `mathmlTagNames`

`Array.<string>` — List of lowercase tag names.

## Related

*   [`html-tag-names`](https://github.com/wooorm/html-tag-names)
    — List of HTML tags
*   [`svg-tag-names`](https://github.com/wooorm/svg-tag-names)
    — List of SVG tags
*   [`svg-element-attributes`](https://github.com/wooorm/svg-element-attributes)
    — Map of SVG elements to allowed attributes
*   [`html-element-attributes`](https://github.com/wooorm/html-element-attributes)
    — Map of HTML elements to allowed attributes
*   [`aria-attributes`](https://github.com/wooorm/aria-attributes)
    — List of ARIA attributes

## License

[MIT][license] © [Titus Wormer][author]

<!-- Definition -->

[build-badge]: https://github.com/wooorm/mathml-tag-names/workflows/main/badge.svg

[build]: https://github.com/wooorm/mathml-tag-names/actions

[coverage-badge]: https://img.shields.io/codecov/c/github/wooorm/mathml-tag-names.svg

[coverage]: https://codecov.io/github/wooorm/mathml-tag-names

[downloads-badge]: https://img.shields.io/npm/dm/mathml-tag-names.svg

[downloads]: https://www.npmjs.com/package/mathml-tag-names

[size-badge]: https://img.shields.io/bundlephobia/minzip/mathml-tag-names.svg

[size]: https://bundlephobia.com/result?p=mathml-tag-names

[npm]: https://docs.npmjs.com/cli/install

[license]: license

[author]: https://wooorm.com

[mathml1]: https://www.w3.org/TR/1998/REC-MathML-19980407/appendixF.html

[mathml2]: https://www.w3.org/TR/MathML2/appendixl.html

[mathml3]: https://www.w3.org/TR/MathML3/appendixi.html
