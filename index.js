import isUrl from 'is-url'
import {visitParents} from 'unist-util-visit-parents'
import {convert} from 'unist-util-is'

const isImgExt = (value) => /\.(svg|png|jpg|jpeg|gif)$/.test(value)
const isAbsolutePath = (value) => value.startsWith('/')
const isRelativePath = (value) =>
  value.startsWith('./') || value.startsWith('../')
const isImgPath = (value) => isAbsolutePath(value) || isRelativePath(value)
const isInteractive = convert(['link', 'linkReference'])

export default function remarkImages() {
  return transform
}

function transform(tree) {
  visitParents(tree, 'text', ontext)
}

function ontext(node, parents) {
  const value = String(node.value).trim()

  if ((isUrl(value) || isImgPath(value)) && isImgExt(value)) {
    let interactive = false
    let length = parents.length
    const siblings = parents[length - 1].children

    // Check if we’re in interactive content.
    while (length--) {
      if (isInteractive(parents[length])) {
        interactive = true
        break
      }
    }

    let next = {
      type: 'image',
      url: value,
      title: null,
      alt: null,
      position: node.position
    }

    // Add a link if we’re not already in one.
    if (!interactive) {
      next = {
        type: 'link',
        url: value,
        title: null,
        children: [next],
        position: node.position
      }
    }

    siblings[siblings.indexOf(node)] = next
  }
}
