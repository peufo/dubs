import { Email, Order, Product } from 'types'

type OrderItem = Order['items'][number]
type Variable = Required<Product>['variables'][number]
type Option = Variable['options'][number]
type OptionWithName = Option & { name: string }

export function getHTML(order: Order): string {
  const html = `
    <div style="max-width: 500px; margin: auto;">
      <h2>__TITLE__</h2>
      <p>__MESSAGE__</p>
      <div style="padding: 0.5em 1em; border: solid lightgrey 1px; border-radius: 0.5em;">
        ${getOrderItemsHTML(order)}
        <div style="display: flex; border-top: solid grey 1px; padding-top: 8px;">
          <span>Total</span>
          <b style="margin-left: auto;">${order.amountDue.toFixed(2)} CHF</b>
        </div>
      </div>
    </div>
  `
  return html
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
