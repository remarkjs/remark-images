var remark = require('remark')
var test = require('tape')
var images = require('.')

test('remark-images', function(t) {
  t.equal(
    remark()
      .use(images)
      .processSync('https://example.com')
      .toString(),
    '<https://example.com>\n',
    'should not support non-image URLs'
  )

  t.equal(
    remark()
      .use(images)
      .processSync('https://example.com/example.jpg')
      .toString(),
    '[![](https://example.com/example.jpg)](https://example.com/example.jpg)\n',
    'should support absolute URLs to images'
  )

  t.equal(
    remark()
      .use(images)
      .processSync('/example.jpg')
      .toString(),
    '[![](/example.jpg)](/example.jpg)\n',
    'should support absolute paths to images'
  )

  t.equal(
    remark()
      .use(images)
      .processSync('./example.jpg')
      .toString(),
    '[![](./example.jpg)](./example.jpg)\n',
    'should support relative paths to images'
  )

  t.equal(
    remark()
      .use(images)
      .processSync('../example.jpg')
      .toString(),
    '[![](../example.jpg)](../example.jpg)\n',
    'should support very relative paths to images'
  )

  t.end()
})
