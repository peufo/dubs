import type { Product, Order } from '../types'
import { getVariablesValues } from './product'

/**
 * return order item price with options selection
 */
export function getOrderItemPrice(
  product: Product,
  optionsId: string[]
): number {
  const basePrice = product.price || 0
  if (!product.variables) return basePrice

  const optionsPrice = product.variables.reduce((acc, { options }, i) => {
    const option = options.find(({ id }) => id === optionsId[i])
    return acc + (option?.price || 0)
  }, 0)
  return basePrice + optionsPrice
}

/**
 * Build à label for order
 */
export function getLabel(order: Order): string {
  const rows = []

  order.items.forEach(({ product, options }) => {
    if (typeof product === 'string') return
    const optionsLabel: string[] = []
    getVariablesValues(product.variables, options).forEach((value, key) => {
      optionsLabel.push(`\t${key} --> ${value.value}`)
    })
    const price = getOrderItemPrice(product, options as string[])
    const orderItemTitle = `${product.name}\t${price.toFixed(2)} CHF`
    rows.push([orderItemTitle, optionsLabel.join('\n')].join('\n'))
  })

  return rows.join('\n')
}
