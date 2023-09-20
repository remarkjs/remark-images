import assert from 'node:assert/strict'
import test from 'node:test'
import {remark} from 'remark'
import remarkImages, {defaultImageExtensions} from './index.js'

test('remarkImages', async function (t) {
  await t.test('should not support non-image URLs', async function () {
    assert.equal(
      remark()
        .use(remarkImages)
        .processSync('<https://example.com>')
        .toString(),
      '<https://example.com>\n'
    )
  })

  await t.test('should support absolute URLs to images', async function () {
    assert.equal(
      remark()
        .use(remarkImages)
        .processSync('https://example.com/example.jpg')
        .toString(),
      '[![](https://example.com/example.jpg)](https://example.com/example.jpg)\n'
    )
  })

  await t.test('should support absolute paths to images', async function () {
    assert.equal(
      remark().use(remarkImages).processSync('/example.jpg').toString(),
      '[![](/example.jpg)](/example.jpg)\n'
    )
  })

  await t.test('should support relative paths to images', async function () {
    assert.equal(
      remark().use(remarkImages).processSync('./example.jpg').toString(),
      '[![](./example.jpg)](./example.jpg)\n'
    )
  })

  await t.test(
    'should support very relative paths to images',
    async function () {
      assert.equal(
        remark().use(remarkImages).processSync('../example.jpg').toString(),
        '[![](../example.jpg)](../example.jpg)\n'
      )
    }
  )

  await t.test('should support autolinks', async function () {
    assert.equal(
      remark()
        .use(remarkImages)
        .processSync('<https://example.com/example.jpg>')
        .toString(),
      '[![](https://example.com/example.jpg)](https://example.com/example.jpg)\n'
    )
  })

  await t.test('should support links', async function () {
    assert.equal(
      remark()
        .use(remarkImages)
        .processSync(
          '[https://example.com/alpha.jpg](https://example.com/bravo.jpg)'
        )
        .toString(),
      '[![](https://example.com/alpha.jpg)](https://example.com/bravo.jpg)\n'
    )
  })

  await t.test('should support link references', async function () {
    assert.equal(
      remark()
        .use(remarkImages)
        .processSync(
          '[https://example.com/alpha.jpg][1]\n\n[1]: https://example.com/bravo.jpg'
        )
        .toString(),
      '[![](https://example.com/alpha.jpg)][1]\n\n[1]: https://example.com/bravo.jpg\n'
    )
  })

  await t.test(
    'should support image URLs inside other stuff',
    async function () {
      assert.equal(
        remark()
          .use(remarkImages)
          .processSync('**https://example.com/alpha.jpg**')
          .toString(),
        '**[![](https://example.com/alpha.jpg)](https://example.com/alpha.jpg)**\n'
      )
    }
  )

  await t.test(
    'should support image URLs inside other stuff in links',
    async function () {
      assert.equal(
        remark()
          .use(remarkImages)
          .processSync(
            '[**https://example.com/alpha.jpg**](https://example.com/bravo.jpg)'
          )
          .toString(),
        '[**![](https://example.com/alpha.jpg)**](https://example.com/bravo.jpg)\n'
      )
    }
  )

  await t.test('should support png extension as image', async function () {
    assert.equal(
      remark().use(remarkImages).processSync('/example.png').toString(),
      '[![](/example.png)](/example.png)\n'
    )
  })

  await t.test('should support svg extension as image', async function () {
    assert.equal(
      remark().use(remarkImages).processSync('/example.svg').toString(),
      '[![](/example.svg)](/example.svg)\n'
    )
  })

  await t.test('should support jpeg extension as image', async function () {
    assert.equal(
      remark().use(remarkImages).processSync('/example.jpeg').toString(),
      '[![](/example.jpeg)](/example.jpeg)\n'
    )
  })

  await t.test('should support gif extension as image', async function () {
    assert.equal(
      remark().use(remarkImages).processSync('/example.gif').toString(),
      '[![](/example.gif)](/example.gif)\n'
    )
  })

  await t.test('should support webp extension as image', async function () {
    assert.equal(
      remark().use(remarkImages).processSync('/example.webp').toString(),
      '[![](/example.webp)](/example.webp)\n'
    )
  })

  await t.test('should support avif extension as image', async function () {
    assert.equal(
      remark().use(remarkImages).processSync('/example.avif').toString(),
      '[![](/example.avif)](/example.avif)\n'
    )
  })

  await t.test(
    'should support custom extension as image through options',
    async function () {
      assert.equal(
        remark()
          .use(remarkImages, {imageExtensions: ['custom']})
          .processSync('/example.custom')
          .toString(),
        '[![](/example.custom)](/example.custom)\n'
      )
    }
  )

  await t.test(
    'should support removing a default extension',
    async function () {
      assert.equal(
        remark()
          .use(remarkImages, {imageExtensions: ['custom']})
          .processSync('/example.jpg')
          .toString(),
        '/example.jpg\n'
      )
    }
  )

  await t.test(
    'should export default image extensions for reuse',
    async function () {
      assert.ok(
        Array.isArray(defaultImageExtensions) &&
          defaultImageExtensions.every((ext) => typeof ext === 'string')
      )
    }
  )
})
