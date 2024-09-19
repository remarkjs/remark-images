/**
 * @import {Image, Link, RootContent, Root} from 'mdast'
 */

/**
 * @typedef Options
 *   Configuration (optional).
 * @property {ReadonlyArray<string> | null | undefined} [imageExtensions]
 *   File extensions (without dot) to treat as images (default:
 *   `defaultImageExtensions`).
 * @property {boolean | null | undefined} [link]
 *   Whether to wrap the image with a link to it (default: `true`).
 */

import {collapseWhiteSpace} from 'collapse-white-space'
import isUrl from 'is-url'
import {position} from 'unist-util-position'
import {visitParents} from 'unist-util-visit-parents'

/** @type {Readonly<Options>} */
const emptyOptions = {}

/**
 * Add a simpler image syntax.
 *
 * @param {Readonly<Options> | null | undefined} [options]
 *   Configuration (optional).
 * @returns
 *   Transform.
 */
export default function remarkImages(options) {
  const settings = options || emptyOptions
  const imageExtensions = settings.imageExtensions || defaultImageExtensions
  const imageExtensionRegex = new RegExp(`\\.(${imageExtensions.join('|')})$`)
  const link = settings.link !== false

  /**
   * Transform.
   *
   * @param {Root} tree
   *   Tree.
   * @returns {undefined}
   *   Nothing.
   */
  return function (tree) {
    visitParents(tree, 'text', function (node, parents) {
      const value = collapseWhiteSpace(node.value, {
        style: 'html',
        trim: true
      })

      if (
        // Cannot contain whitespace (collapsed, so there can only be spaces):
        !value.includes(' ') &&
        // Looks like a URL or path:
        (isUrl(value) ||
          value.startsWith('/') ||
          value.startsWith('./') ||
          value.startsWith('../')) &&
        // Ends in known extension:
        imageExtensionRegex.test(value)
      ) {
        let interactive = false
        let length = parents.length

        // Check if we’re in interactive content.
        while (length--) {
          const parent = parents[length]
          if (parent.type === 'link' || parent.type === 'linkReference') {
            interactive = true
            break
          }
        }

        /** @type {Image | Link} */
        let replacement = {
          type: 'image',
          url: value,
          title: null,
          alt: '',
          position: position(node)
        }

        // Add a link if we’re not already in one.
        if (link && !interactive) {
          replacement = {
            type: 'link',
            url: value,
            title: null,
            children: [replacement],
            position: position(node)
          }
        }

        const parent = parents[parents.length - 1]
        /** @type {Array<RootContent>} */
        const siblings = parent.children
        siblings[siblings.indexOf(node)] = replacement
      }
    })
  }
}

/**
 * Extensions recognized as images by default.
 *
 * @type {ReadonlyArray<string>}
 */
export const defaultImageExtensions = [
  'avif',
  'gif',
  'jpeg',
  'jpg',
  'png',
  'svg',
  'webp'
]
