import assert from 'node:assert/strict'
import test from 'node:test'
import {remark} from 'remark'
import remarkImages from 'remark-images'

test('remarkImages', async function (t) {
  await t.test('should expose the public api', async function () {
    assert.deepEqual(Object.keys(await import('remark-images')).sort(), [
      'default',
      'defaultImageExtensions'
    ])
  })

  await t.test('should not support non-image URLs', async function () {
    assert.equal(
      String(await remark().use(remarkImages).process('<https://example.com>')),
      '<https://example.com>\n'
    )
  })

  await t.test('should support absolute URLs to images', async function () {
    assert.equal(
      String(
        await remark()
          .use(remarkImages)
          .process('https://example.com/example.jpg')
      ),
      '[![](https://example.com/example.jpg)](https://example.com/example.jpg)\n'
    )
  })

  await t.test('should support absolute paths to images', async function () {
    assert.equal(
      String(await remark().use(remarkImages).process('/example.jpg')),
      '[![](/example.jpg)](/example.jpg)\n'
    )
  })

  await t.test('should support relative paths to images', async function () {
    assert.equal(
      String(await remark().use(remarkImages).process('./example.jpg')),
      '[![](./example.jpg)](./example.jpg)\n'
    )
  })

  await t.test(
    'should support very relative paths to images',
    async function () {
      assert.equal(
        String(await remark().use(remarkImages).process('../example.jpg')),
        '[![](../example.jpg)](../example.jpg)\n'
      )
    }
  )

  await t.test('should support autolinks', async function () {
    assert.equal(
      String(
        await remark()
          .use(remarkImages)
          .process('<https://example.com/example.jpg>')
      ),
      '[![](https://example.com/example.jpg)](https://example.com/example.jpg)\n'
    )
  })

  await t.test('should support links', async function () {
    assert.equal(
      String(
        await remark()
          .use(remarkImages)
          .process(
            '[https://example.com/alpha.jpg](https://example.com/bravo.jpg)'
          )
      ),
      '[![](https://example.com/alpha.jpg)](https://example.com/bravo.jpg)\n'
    )
  })

  await t.test('should support link references', async function () {
    assert.equal(
      String(
        await remark()
          .use(remarkImages)
          .process(
            '[https://example.com/alpha.jpg][1]\n\n[1]: https://example.com/bravo.jpg'
          )
      ),
      '[![](https://example.com/alpha.jpg)][1]\n\n[1]: https://example.com/bravo.jpg\n'
    )
  })

  await t.test(
    'should support image URLs inside other stuff',
    async function () {
      assert.equal(
        String(
          await remark()
            .use(remarkImages)
            .process('**https://example.com/alpha.jpg**')
        ),
        '**[![](https://example.com/alpha.jpg)](https://example.com/alpha.jpg)**\n'
      )
    }
  )

  await t.test(
    'should support image URLs inside other stuff in links',
    async function () {
      assert.equal(
        String(
          await remark()
            .use(remarkImages)
            .process(
              '[**https://example.com/alpha.jpg**](https://example.com/bravo.jpg)'
            )
        ),
        '[**![](https://example.com/alpha.jpg)**](https://example.com/bravo.jpg)\n'
      )
    }
  )

  await t.test('should support png extension as image', async function () {
    assert.equal(
      String(await remark().use(remarkImages).process('/example.png')),
      '[![](/example.png)](/example.png)\n'
    )
  })

  await t.test('should support svg extension as image', async function () {
    assert.equal(
      String(await remark().use(remarkImages).process('/example.svg')),
      '[![](/example.svg)](/example.svg)\n'
    )
  })

  await t.test('should support jpeg extension as image', async function () {
    assert.equal(
      String(await remark().use(remarkImages).process('/example.jpeg')),
      '[![](/example.jpeg)](/example.jpeg)\n'
    )
  })

  await t.test('should support gif extension as image', async function () {
    assert.equal(
      String(await remark().use(remarkImages).process('/example.gif')),
      '[![](/example.gif)](/example.gif)\n'
    )
  })

  await t.test('should support webp extension as image', async function () {
    assert.equal(
      String(await remark().use(remarkImages).process('/example.webp')),
      '[![](/example.webp)](/example.webp)\n'
    )
  })

  await t.test('should support avif extension as image', async function () {
    assert.equal(
      String(await remark().use(remarkImages).process('/example.avif')),
      '[![](/example.avif)](/example.avif)\n'
    )
  })

  await t.test(
    'should support custom extension as image through options',
    async function () {
      assert.equal(
        String(
          await remark()
            .use(remarkImages, {imageExtensions: ['custom']})
            .process('/example.custom')
        ),
        '[![](/example.custom)](/example.custom)\n'
      )
    }
  )

  await t.test(
    'should support removing a default extension',
    async function () {
      assert.equal(
        String(
          await remark()
            .use(remarkImages, {imageExtensions: ['custom']})
            .process('/example.jpg')
        ),
        '/example.jpg\n'
      )
    }
  )

  await t.test('should not allow whitespace in paths', async function () {
    assert.equal(
      String(await remark().use(remarkImages).process('/a b c.jpg')),
      '/a b c.jpg\n'
    )
  })
})
