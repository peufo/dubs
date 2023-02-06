import escapeHtml from 'escape-html'
import { Text } from 'slate'
import type { CustomTypes } from 'slate'
import type { Media } from 'types'

export function serialize(nodes: CustomTypes[]): string {
  return nodes
    .map((node) => {
      if (!node) return ''
      let klass: string[] = []
      if (node.bold) klass.push('font-bold')
      if (node.italic) klass.push('italic')
      if (node.underline) klass.push('underline')
      if (node.strikethrough) klass.push('line-through')
      if (node.type === 'h1') klass.push('text-5xl')
      if (node.type === 'h2') klass.push('text-4xl')
      if (node.type === 'h3') klass.push('text-3xl')
      if (node.type === 'h4') klass.push('text-2xl')
      if (node.type === 'h5') klass.push('text-xl')
      if (node.type === 'h6') klass.push('text-lg')
      if (node.type === 'indent') klass.push('indent-2')
      if (node.type === 'code') klass.push('font-mono')

      if (Text.isText(node)) {
        if (node.text === '') return ''
        node.text.replaceAll('\n', '<br/>')
        const text = node.text
          .split('\n')
          .map((txt) => escapeHtml(txt))
          .join('</br>')
        return `<p class="${klass}">${text}</p>`
      }

      if (node.type === 'upload') {
        const img = node.value as Media
        const url = img.sizes.card.url
        return `<img src="${url}" alt="${img.title}" />`
      }

      const html = serialize(node.children as CustomTypes[])
      if (!html) return ''

      if (node.type === 'link') {
        klass.push('underline')
        const href = escapeHtml(node.url as string)
        const target = node.newTab ? '_blank' : ''
        return `<a href="${href}" class="${klass}" target="${target}">${html}</a>`
      }

      let tag = node.type || 'p'
      if (node.type === 'quote') tag = 'blockquote'

      return `<${tag} class="${klass}">${html}</${tag}>`
    })
    .join('')
}
