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
  const value = String(node.value).trim()

  if ((isUrl(value) || isImgPath(value)) && isImgExt(value)) {
    let next = {
      type: 'image',
      url: value,
      title: null,
      alt: null,
      position: node.position
    }

    // Add a link if we’re not already in one.
    if (parent.type !== 'link' && parent.type !== 'linkReference') {
      next = {
        type: 'link',
        url: value,
        title: null,
        children: [next],
        position: node.position
      }
    }

    parent.children[index] = next
  }
}
