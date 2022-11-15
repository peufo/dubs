import escapeHtml from 'escape-html'
import { Text, CustomTypes } from 'slate'

export function serialize(nodes: CustomTypes[]): string {
  return nodes
    .map((node) => {
      if (!node) return ''
      let klass: string[] = []
      if (node.bold) klass.push('font-bold')
      if (node.italic) klass.push('italic')
      if (node.underline) klass.push('underline')
      if (node.strikethrough) klass.push('line-through')
      if (node.type === 'indent') klass.push('indent-2')

      if (Text.isText(node))
        return `<span class="${klass}">${escapeHtml(node.text)}</span>`

      const html = serialize(node.children as CustomTypes[])

      if (node.type === 'link') {
        const href = escapeHtml(node.url as string)
        return `<a href="${href}" class="${klass}">${html}</a>`
      }

      let tag = node.type || 'p'
      if (node.type === 'quote') tag = 'blockquote'
      return `<${tag} class="${klass}">${html}</${tag}>`
    })
    .join('')
}
