# mathml-tag-names

[![Build][build-badge]][build]
[![Coverage][coverage-badge]][coverage]
[![Downloads][downloads-badge]][downloads]
[![Size][size-badge]][size]

List of known MathML tag names.

## Contents

*   [What is this?](#what-is-this)
*   [When should I use this?](#when-should-i-use-this)
*   [Install](#install)
*   [Use](#use)
*   [API](#api)
    *   [`mathmlTagNames`](#mathmltagnames)
*   [Types](#types)
*   [Compatibility](#compatibility)
*   [Security](#security)
*   [Related](#related)
*   [Contribute](#contribute)
*   [License](#license)

## What is this?

This is a list of MathML tag names.
It includes all tag names from [MathML 1][mathml1], [MathML 2][mathml2], and
[MathML 3][mathml3].
The repo is includes scripts to regenerate the data from the specs.

## When should I use this?

You can use this package when you need to know what tag names are allowed in
any version of MathML.

## Install

This package is [ESM only][esm].
In Node.js (version 12.20+, 14.14+, or 16.0+), install with [npm][]:

```sh
npm install mathml-tag-names
```

In Deno with [`esm.sh`][esmsh]:

```js
import {mathmlTagNames} from 'https://esm.sh/mathml-tag-names@3'
```

In browsers with [`esm.sh`][esmsh]:

```html
<script type="module">
  import {mathmlTagNames} from 'https://esm.sh/mathml-tag-names@3?bundle'
</script>
```

## Use

```js
import {mathmlTagNames} from 'mathml-tag-names'

console.log(mathmlTagNames.length) // => 189

console.log(mathmlTagNames.slice(0, 10))
```

Yields:

```js
[
  'abs',
  'and',
  'annotation',
  'annotation-xml',
  'apply',
  'approx',
  'arccos',
  'arccosh',
  'arccot',
  'arccoth'
]
```

## API

This package exports the following identifiers: `mathmlTagNames`.
There is no default export.

### `mathmlTagNames`

List of known (lowercase) MathML tag names (`Array<string>`).

## Types

This package is fully typed with [TypeScript][].

## Compatibility

This package is at least compatible with all maintained versions of Node.js.
As of now, that is Node.js 12.20+, 14.14+, and 16.0+.
It also works in Deno and modern browsers.

## Security

This package is safe.

## Related

*   [`wooorm/html-tag-names`](https://github.com/wooorm/html-tag-names)
    — list of HTML tag names
*   [`wooorm/svg-tag-names`](https://github.com/wooorm/svg-tag-names)
    — list of SVG tag names
*   [`wooorm/svg-element-attributes`](https://github.com/wooorm/svg-element-attributes)
    — map of SVG elements to attributes
*   [`wooorm/html-element-attributes`](https://github.com/wooorm/html-element-attributes)
    — map of HTML elements to attributes
*   [`wooorm/aria-attributes`](https://github.com/wooorm/aria-attributes)
    — list of ARIA attributes

## Contribute

Yes please!
See [How to Contribute to Open Source][contribute].

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

[esmsh]: https://esm.sh

[license]: license

[author]: https://wooorm.com

[esm]: https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c

[typescript]: https://www.typescriptlang.org

[contribute]: https://opensource.guide/how-to-contribute/

[mathml1]: https://www.w3.org/TR/1998/REC-MathML-19980407/appendixF.html

[mathml2]: https://www.w3.org/TR/MathML2/appendixl.html

[mathml3]: https://www.w3.org/TR/MathML3/appendixi.html
