const isUrl = require('is-url')
const visit = require('unist-util-visit')

const isImgExt = str => /\.(svg|png|jpg|jpeg|gif)$/.test(str)
const isAbsolutePath = str => str.startsWith('/')
const isRelativePath = str => str.startsWith('./') || str.startsWith('../')
const isImgPath = str => isAbsolutePath(str) || isRelativePath(str)

module.exports = images

function images() {
  return transform
}

function transform(tree) {
  visit(tree, 'text', ontext)
}

function ontext(node, index, parent) {
  const text = String(node.value).trim()

  if ((isUrl(text) || isImgPath(text)) && isImgExt(text)) {
    parent.children[index] = {
      type: 'image',
      url: text,
      title: null,
      alt: null,
      position: node.position
    }
  }
}
