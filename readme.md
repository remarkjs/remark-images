# remark-images

[![Build][build-badge]][build]
[![Coverage][coverage-badge]][coverage]
[![Downloads][downloads-badge]][downloads]
[![Size][size-badge]][size]
[![Sponsors][sponsors-badge]][collective]
[![Backers][backers-badge]][collective]
[![Chat][chat-badge]][chat]

**[remark][]** plugin to add a simpler image syntax.

## Contents

*   [What is this?](#what-is-this)
*   [When should I use this?](#when-should-i-use-this)
*   [Install](#install)
*   [Use](#use)
*   [API](#api)
    *   [`unified().use(remarkImages[, options])`](#unifieduseremarkimages-options)
    *   [`defaultImageExtensions`](#defaultimageextensions)
*   [Syntax](#syntax)
*   [Syntax tree](#syntax-tree)
*   [Types](#types)
*   [Compatibility](#compatibility)
*   [Security](#security)
*   [Related](#related)
*   [Contribute](#contribute)
*   [License](#license)

## What is this?

This package is a [unified][] ([remark][]) plugin to add a simpler image syntax.

**unified** is a project that transforms content with abstract syntax trees
(ASTs).
**remark** adds support for markdown to unified.
**mdast** is the markdown AST that remark uses.
This is a remark plugin that transforms mdast.

## When should I use this?

Images are [notoriously unintuitive][tweet] in markdown.
This projects adds a different way to include images: by pasting in a URL or
path to them (such as `./image.jpg`).
The behavior added by this plugin is nice when you’re authoring your own
markdown and are sure that you’re explaining what happens in images in
surrounding prose.

Another plugin, [`remark-unwrap-images`][remark-unwrap-images], could be useful
to unwrap images on their own in a paragraph.

## Install

This package is [ESM only](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c).
In Node.js (version 12.20+, 14.14+, or 16.0+), install with [npm][]:

```sh
npm install remark-images
```

In Deno with [`esm.sh`][esmsh]:

```js
import remarkImages from 'https://esm.sh/remark-images@3'
```

In browsers with [`esm.sh`][esmsh]:

```html
<script type="module">
  import remarkImages from 'https://esm.sh/remark-images@3?bundle'
</script>
```

## Use

Say we have the following file `example.md`:

```markdown
Below will render an image:

https://c8r-x0.s3.amazonaws.com/lab-components-macbook.jpg
```

And our module `example.js` looks as follows:

```js
import {read} from 'to-vfile'
import {remark} from 'remark'
import remarkImages from 'remark-images'

main()

async function main() {
  const file = await remark()
    .use(remarkImages)
    .process(await read('example.md'))

  console.log(String(file))
}
```

Now, running `node example` yields:

```markdown
Below will render an image:

[![](https://c8r-x0.s3.amazonaws.com/lab-components-macbook.jpg)](https://c8r-x0.s3.amazonaws.com/lab-components-macbook.jpg)
```

## API

This package exports the identifier `defaultImageExtensions`.
The default export is `remarkImages`.

### `unified().use(remarkImages[, options])`

Plugin to add a simpler image syntax.
Transform URLs in text that reference images (see `defaultImageExtensions`) to
images.

##### `options`

Configuration (optional).

###### `options.imageExtensions`

List of file extensions recognized as images (`Array<string>?`, default
[`defaultImageExtensions`](#defaultimageextensions)).

### `defaultImageExtensions`

List of file extensions recognized as an image by default (constant
`['svg', 'png', 'jpg', 'jpeg', 'gif', 'webp', 'avif']`).
Note: extension does not include `.`, only the extension name.

## Syntax

This plugin looks for URLs and paths, on their own, that end in an image
extension (see `defaultImageExtensions`).
If they occur inside a link already, then only an image is created.
If they instead do not occur in a link, the image is also linked.

Some examples of URLs and paths are:

*   `https://example.com/image.jpg`
*   `/image.jpg`
*   `./image.jpg`
*   `../image.jpg`

## Syntax tree

This plugin adds mdast [`Image`][image] and [`Link`][link] nodes to the syntax
tree.
These are the same nodes that represent images through `![](url)` and links
through `[text](url)` syntax.

## Types

This package is fully typed with [TypeScript][].
There are no extra exported types.

## Compatibility

Projects maintained by the unified collective are compatible with all maintained
versions of Node.js.
As of now, that is Node.js 12.20+, 14.14+, and 16.0+.
Our projects sometimes work with older versions, but this is not guaranteed.

This plugin works with `unified` version 3+ and `remark` version 4+.

## Security

Although this plugin should be safe to use, always be careful with user input.
For example, it’s possible to hide JavaScript inside images (such as GIFs,
WebPs, and SVGs).
User provided images open you up to a [cross-site scripting (XSS)][xss] attack.

This may become a problem if the markdown later transformed to
**[rehype][]** (**[hast][]**) or opened in an unsafe markdown viewer.

## Related

*   [`remarkjs/remark-unwrap-images`][remark-unwrap-images]
    — remove the wrapping paragraph for images
*   [`remarkjs/remark-embed-images`](https://github.com/remarkjs/remark-embed-images)
    — embed local images as data URIs

## Contribute

See [`contributing.md`][contributing] in [`remarkjs/.github`][health] for ways
to get started.
See [`support.md`][support] for ways to get help.

This project has a [code of conduct][coc].
By interacting with this repository, organization, or community you agree to
abide by its terms.

## License

[MIT][license] © [John Otander][author]

<!-- Definitions -->

[build-badge]: https://github.com/remarkjs/remark-images/workflows/main/badge.svg

[build]: https://github.com/remarkjs/remark-images/actions

[coverage-badge]: https://img.shields.io/codecov/c/github/remarkjs/remark-images.svg

[coverage]: https://codecov.io/github/remarkjs/remark-images

[downloads-badge]: https://img.shields.io/npm/dm/remark-images.svg

[downloads]: https://www.npmjs.com/package/remark-images

[size-badge]: https://img.shields.io/bundlephobia/minzip/remark-images.svg

[size]: https://bundlephobia.com/result?p=remark-images

[sponsors-badge]: https://opencollective.com/unified/sponsors/badge.svg

[backers-badge]: https://opencollective.com/unified/backers/badge.svg

[collective]: https://opencollective.com/unified

[chat-badge]: https://img.shields.io/badge/chat-discussions-success.svg

[chat]: https://github.com/remarkjs/remark/discussions

[npm]: https://docs.npmjs.com/cli/install

[esmsh]: https://esm.sh

[health]: https://github.com/remarkjs/.github

[contributing]: https://github.com/remarkjs/.github/blob/HEAD/contributing.md

[support]: https://github.com/remarkjs/.github/blob/HEAD/support.md

[coc]: https://github.com/remarkjs/.github/blob/HEAD/code-of-conduct.md

[license]: license

[author]: https://johno.com

[remark]: https://github.com/remarkjs/remark

[unified]: https://github.com/unifiedjs/unified

[xss]: https://en.wikipedia.org/wiki/Cross-site_scripting

[typescript]: https://www.typescriptlang.org

[rehype]: https://github.com/rehypejs/rehype

[hast]: https://github.com/syntax-tree/hast

[tweet]: https://twitter.com/gruber/status/1246489863932821512

[remark-unwrap-images]: https://github.com/remarkjs/remark-unwrap-images

[image]: https://github.com/syntax-tree/mdast#image

[link]: https://github.com/syntax-tree/mdast#link
