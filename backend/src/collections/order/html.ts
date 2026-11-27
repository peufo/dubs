import { Order, Shop, User } from 'types'

export function getHTML(order: Order): string {
  const html = `
    <div style="max-width: 500px; margin: auto;">
      <h2>__TITLE__</h2>
      <p>__MESSAGE__</p>
      <div style="padding: 0.5em 1em; border: solid lightgrey 1px; border-radius: 0.5em;">
        ${getOrderItemsHTML(order)}
        ${getShippingFeeHTML(order)}
        <div style="display: flex; border-top: solid grey 1px; padding-top: 8px;">
          <span>Total</span>
          <b style="margin-left: auto;">${order.amountDue.toFixed(2)} CHF</b>
        </div>
      </div>
      __DELIVERY__
      __CONTACT__
    </div>
  `
  return html
}

function getShippingFeeHTML(order: Order): string {
  if (order.delivery !== 'shipping') return ''
  const fee = order.shippingFee || 0
  return `
    <div style="display: flex; padding-bottom: 10px;">
      <span>Frais de livraison</span>
      <span style="margin-left: auto;">${fee ? `${fee.toFixed(2)} CHF` : 'Offerts'}</span>
    </div>
  `
}

/** Mode de remise : retrait sur place ou livraison à l'adresse du client */
export function getDeliveryHTML(order: Order, shop: Shop, client: User): string {
  if (order.delivery === 'shipping') {
    const address = [client.street, `${client.zipCode || ''} ${client.city || ''}`]
      .map((line) => escapeHTML(line?.trim() || ''))
      .filter(Boolean)
      .join('<br>')
    return section(
      'Livraison',
      `Votre commande sera livrée à l'adresse :<br><b>${address}</b>
      ${textToHTML(shop.shipping?.details, '<br><br>')}`
    )
  }
  return section(
    'Retrait sur place',
    textToHTML(shop.pickup?.details) ||
      'Nous vous contacterons pour convenir du retrait de votre commande.'
  )
}

export function getContactHTML(shop: Shop): string {
  const { name, phone, email } = shop.contact || {}
  const lines = [
    name && escapeHTML(name),
    phone && `<a href="tel:${escapeHTML(phone.replace(/\s/g, ''))}">${escapeHTML(phone)}</a>`,
    email && `<a href="mailto:${escapeHTML(email)}">${escapeHTML(email)}</a>`,
  ].filter(Boolean)
  if (!lines.length) return ''
  return section('Une question ?', lines.join('<br>'))
}

function section(title: string, content: string): string {
  return `
    <div style="margin-top: 1.5em;">
      <h3 style="margin-bottom: 0.25em;">${title}</h3>
      <p style="margin-top: 0;">${content}</p>
    </div>
  `
}

/** Texte saisi dans l'admin → HTML (échappé, retours à la ligne conservés) */
function textToHTML(text?: string | null, prefix = ''): string {
  if (!text?.trim()) return ''
  return prefix + escapeHTML(text.trim()).replace(/\n/g, '<br>')
}

function escapeHTML(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

/**
 * Build à html for orderItems
 */
function getOrderItemsHTML(order: Order): string {
  const itemsDiv = order.items.map((orderItem) => {
    const { product } = orderItem
    if (typeof product === 'string') return

    const priceOptions = sumOf(orderItem.options.map(({ price }) => price))
    const price = priceOptions + (product.price || 0)

    const optionsLi: string[] = orderItem.options.map(
      (v) => `<li>${v.name} <b>${v.value}</b></li>`
    )

    return `
      <div style="padding-bottom: 10px;">
        <div style="display: flex; align-items: center;">
          <span style="font-size: 1rem">${product.name}</span>
          <span style="margin-left: auto;">
            <b style="margin-right: 20px;">${orderItem.quantity} x</b>
            ${price.toFixed(2)} CHF
          </span>
        </div>
        <ul style="font-size: .875rem;">
          ${optionsLi.join('')}
        </ul>
      </div>
    `
  })

  return itemsDiv.join('')
}

function sumOf(arr: number[]): number {
  return arr.reduce((acc, cur) => acc + cur, 0)
}
