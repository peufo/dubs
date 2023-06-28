import type { Product, Order } from 'types'

/**
 * return order item price with options selection
 */
export function getOrderItemPrice(
  product: Product,
  optionsId: string[]
): number {
  const basePrice = product.price || 0
  if (!product.variables) return basePrice

  const optionsPrice = product.variables.reduce((acc, { options }, index) => {
    const option = options.find(({ id }) => id === optionsId[index])
    return acc + (option?.price || 0)
  }, 0)
  return basePrice + optionsPrice
}

/**
 * return order item option value from optionId
 */
export function getOrderItemOptions(
  product: Product,
  optionsId: string[]
): Order['items'][number]['options'] {
  if (!product.variables) return []

  const optionsValue = product.variables.map(
    ({ blockName = 'option', defaultOption, options }, index) => {
      const optionId = optionsId[index]
      const option = optionId
        ? options.find(({ id }) => id === optionsId[index])
        : options[defaultOption]
      return {
        name: blockName,
        value: option?.value || '-',
        price: option?.price || 0,
      }
    },
    0
  )

  return optionsValue
}
