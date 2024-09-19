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

* [What is this?](#what-is-this)
* [When should I use this?](#when-should-i-use-this)
* [Install](#install)
* [Use](#use)
* [API](#api)
  * [`defaultImageExtensions`](#defaultimageextensions)
  * [`unified().use(remarkImages[, options])`](#unifieduseremarkimages-options)
  * [`Options`](#options)
* [Syntax](#syntax)
* [Syntax tree](#syntax-tree)
* [Types](#types)
* [Compatibility](#compatibility)
* [Security](#security)
* [Related](#related)
* [Contribute](#contribute)
* [License](#license)

## What is this?

This package is a [unified][] ([remark][]) plugin to add a simpler image syntax.

## When should I use this?

Images are [notoriously unintuitive][tweet] in markdown.
This projects adds a different way to include images: by pasting in a URL or
path to them (such as `./image.jpg`).
The behavior added by this plugin is nice when you’re authoring your own
markdown and are sure that you’re explaining what happens in images in
surrounding prose (as you can’t add alt text with this).

Another plugin, [`remark-unwrap-images`][remark-unwrap-images], could be useful
to unwrap images on their own in a paragraph.

## Install

This package is [ESM only][esm].
In Node.js (version 16+), install with [npm][]:

```sh
npm install remark-images
```

In Deno with [`esm.sh`][esmsh]:

```js
import remarkImages from 'https://esm.sh/remark-images@4'
```

In browsers with [`esm.sh`][esmsh]:

```html
<script type="module">
  import remarkImages from 'https://esm.sh/remark-images@4?bundle'
</script>
```

## Use

Say we have the following file `example.md`:

```markdown
Original plates from Clyde Tombaugh’s discovery of Pluto:

https://upload.wikimedia.org/wikipedia/en/c/c6/Pluto_discovery_plates.png
```

…and a module `example.js`:

```js
import {remark} from 'remark'
import remarkImages from 'remark-images'
import {read} from 'to-vfile'

const file = await remark()
  .use(remarkImages)
  .process(await read('example.md'))

console.log(String(file))
```

…then running `node example.js` yields:

```markdown
Original plates from Clyde Tombaugh’s discovery of Pluto:

[![](https://upload.wikimedia.org/wikipedia/en/c/c6/Pluto_discovery_plates.png)](https://upload.wikimedia.org/wikipedia/en/c/c6/Pluto_discovery_plates.png)
```

## API

This package exports the identifier
[`defaultImageExtensions`][api-default-image-extensions].
The default export is [`remarkImages`][api-remark-images].

### `defaultImageExtensions`

Extensions recognized as images by default (`Array<string>`).
Currently `['avif', 'gif', 'jpeg', 'jpg', 'png', 'svg', 'webp']`.

### `unified().use(remarkImages[, options])`

Add a simpler image syntax.

###### Parameters

* `options` ([`Options`][api-options], optional)
  — configuration

###### Returns

Transform ([`Transformer`][unified-transformer]).

### `Options`

Configuration (TypeScript type).

###### Fields

* `imageExtensions` (`Array<string>`, default:
  [`defaultImageExtensions`][api-default-image-extensions])
  — file extensions (without dot) to treat as images
* `link` (`boolean`, default: `true`)
  — whether to wrap the image with a link to it

## Syntax

This plugin looks for URLs and paths, on their own, that end in an image
extension.
If they occur inside a link already, then only an image is created.
If they instead do not occur in a link, the image is also linked.

Some examples of URLs and paths are:

* `https://example.com/image.jpg`
* `/image.jpg`
* `./image.jpg`
* `../image.jpg`

## Syntax tree

This plugin adds mdast [`Image`][mdast-image] and [`Link`][mdast-link] nodes to
the syntax tree.
These are the same nodes that represent images through `![](url)` and links
through `[text](url)` syntax.

## Types

This package is fully typed with [TypeScript][].
It exports the additional type [`Options`][api-options].

## Compatibility

Projects maintained by the unified collective are compatible with maintained
versions of Node.js.

When we cut a new major release, we drop support for unmaintained versions of
Node.
This means we try to keep the current release line, `remark-images@^4`,
compatible with Node.js 16.

This plugin works with `unified` version 3+ and `remark` version 4+.

## Security

Although this plugin should be safe to use, always be careful with user input.
For example, it’s possible to hide JavaScript inside images (such as GIFs,
WebPs, and SVGs).
User provided images open you up to a [cross-site scripting (XSS)][wiki-xss]
attack.

This may become a problem if the markdown later transformed to
**[rehype][]** (**[hast][]**) or opened in an unsafe markdown viewer.

## Related

* [`remark-unwrap-images`][remark-unwrap-images]
  — remove the wrapping paragraph for images
* [`remark-embed-images`](https://github.com/remarkjs/remark-embed-images)
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

[size-badge]: https://img.shields.io/bundlejs/size/remark-images

[size]: https://bundlejs.com/?q=remark-images

[sponsors-badge]: https://opencollective.com/unified/sponsors/badge.svg

[backers-badge]: https://opencollective.com/unified/backers/badge.svg

[collective]: https://opencollective.com/unified

[chat-badge]: https://img.shields.io/badge/chat-discussions-success.svg

[chat]: https://github.com/remarkjs/remark/discussions

[npm]: https://docs.npmjs.com/cli/install

[esm]: https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c

[esmsh]: https://esm.sh

[health]: https://github.com/remarkjs/.github

[contributing]: https://github.com/remarkjs/.github/blob/main/contributing.md

[support]: https://github.com/remarkjs/.github/blob/main/support.md

[coc]: https://github.com/remarkjs/.github/blob/main/code-of-conduct.md

[license]: license

[author]: https://johno.com

[hast]: https://github.com/syntax-tree/hast

[mdast-image]: https://github.com/syntax-tree/mdast#image

[mdast-link]: https://github.com/syntax-tree/mdast#link

[rehype]: https://github.com/rehypejs/rehype

[remark]: https://github.com/remarkjs/remark

[remark-unwrap-images]: https://github.com/remarkjs/remark-unwrap-images

[tweet]: https://twitter.com/gruber/status/1246489863932821512

[typescript]: https://www.typescriptlang.org

[unified]: https://github.com/unifiedjs/unified

[unified-transformer]: https://github.com/unifiedjs/unified#transformer

[wiki-xss]: https://en.wikipedia.org/wiki/Cross-site_scripting

[api-default-image-extensions]: #defaultimageextensions

[api-options]: #options

[api-remark-images]: #unifieduseremarkimages-options
