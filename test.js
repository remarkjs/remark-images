import test from 'tape'
import {remark} from 'remark'
import remarkImages from './index.js'

test('remarkImages', (t) => {
  t.equal(
    remark().use(remarkImages).processSync('<https://example.com>').toString(),
    '<https://example.com>\n',
    'should not support non-image URLs'
  )

  t.equal(
    remark()
      .use(remarkImages)
      .processSync('https://example.com/example.jpg')
      .toString(),
    '[![](https://example.com/example.jpg)](https://example.com/example.jpg)\n',
    'should support absolute URLs to images'
  )

  t.equal(
    remark().use(remarkImages).processSync('/example.jpg').toString(),
    '[![](/example.jpg)](/example.jpg)\n',
    'should support absolute paths to images'
  )

  t.equal(
    remark().use(remarkImages).processSync('./example.jpg').toString(),
    '[![](./example.jpg)](./example.jpg)\n',
    'should support relative paths to images'
  )

  t.equal(
    remark().use(remarkImages).processSync('../example.jpg').toString(),
    '[![](../example.jpg)](../example.jpg)\n',
    'should support very relative paths to images'
  )

  t.equal(
    remark()
      .use(remarkImages)
      .processSync('<https://example.com/example.jpg>')
      .toString(),
    '[![](https://example.com/example.jpg)](https://example.com/example.jpg)\n',
    'should support autolinks'
  )

  t.equal(
    remark()
      .use(remarkImages)
      .processSync(
        '[https://example.com/alpha.jpg](https://example.com/bravo.jpg)'
      )
      .toString(),
    '[![](https://example.com/alpha.jpg)](https://example.com/bravo.jpg)\n',
    'should support links'
  )

  t.equal(
    remark()
      .use(remarkImages)
      .processSync(
        '[https://example.com/alpha.jpg][1]\n\n[1]: https://example.com/bravo.jpg'
      )
      .toString(),
    '[![](https://example.com/alpha.jpg)][1]\n\n[1]: https://example.com/bravo.jpg\n',
    'should support link references'
  )

  t.equal(
    remark()
      .use(remarkImages)
      .processSync('**https://example.com/alpha.jpg**')
      .toString(),
    '**[![](https://example.com/alpha.jpg)](https://example.com/alpha.jpg)**\n',
    'should support image URLs inside other stuff'
  )

  t.equal(
    remark()
      .use(remarkImages)
      .processSync(
        '[**https://example.com/alpha.jpg**](https://example.com/bravo.jpg)'
      )
      .toString(),
    '[**![](https://example.com/alpha.jpg)**](https://example.com/bravo.jpg)\n',
    'should support image URLs inside other stuff in links'
  )

  t.equal(
    remark().use(remarkImages).processSync('/example.png').toString(),
    '[![](/example.png)](/example.png)\n',
    'should support png extension as image'
  )

  t.equal(
    remark().use(remarkImages).processSync('/example.svg').toString(),
    '[![](/example.svg)](/example.svg)\n',
    'should support svg extension as image'
  )

  t.equal(
    remark().use(remarkImages).processSync('/example.jpeg').toString(),
    '[![](/example.jpeg)](/example.jpeg)\n',
    'should support jpeg extension as image'
  )

  t.equal(
    remark().use(remarkImages).processSync('/example.gif').toString(),
    '[![](/example.gif)](/example.gif)\n',
    'should support gif extension as image'
  )

  t.equal(
    remark().use(remarkImages).processSync('/example.webp').toString(),
    '[![](/example.webp)](/example.webp)\n',
    'should support webp extension as image'
  )

  t.equal(
    remark().use(remarkImages).processSync('/example.avif').toString(),
    '[![](/example.avif)](/example.avif)\n',
    'should support avif extension as image'
  )

  t.equal(
    remark()
      .use(remarkImages, {imageExtensions: ['custom']})
      .processSync('/example.custom')
      .toString(),
    '[![](/example.custom)](/example.custom)\n',
    'should support custom extension as image through options'
  )

  t.end()
})
