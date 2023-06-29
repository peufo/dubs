import type { Product, Order } from 'types'

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
        id: option?.id || '',
        name: blockName,
        value: option?.value || '-',
        price: option?.price || 0,
      }
    },
    0
  )

  return optionsValue
}
