import escapeHtml from 'escape-html'
import { Text, CustomTypes } from 'slate'

export function serialize(nodes: CustomTypes[]): string {
  return nodes
    .map((node) => {
      if (!node) return ''
      if (Text.isText(node)) {
        let text = escapeHtml(node.text)
        if (node.bold) return `<b>${text}</b>`
        if (node.code) return `<code>${text}</code>`
        if (node.italic) return `<em>${text}</em>`
        return text
      }

      const html = serialize(node.children as CustomTypes[])

      if (node.type === 'link')
        return `<a href="${escapeHtml(node.url as string)}">${html}</a>`

      if (node.type === 'quote') return `<blockquote>${html}</blockquote>`

      if (node.type === 'indent')
        return `<div style="padding-left: 2em;">${html}</div>`

      return `<${node.type || 'p'}>${html}</${node.type || 'p'}>`
    })
    .join('')
}
