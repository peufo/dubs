import type { Product, Order } from 'types'

type Variable = NonNullable<Product['variables']>[number]
type Option = Variable['options'][number]

/**
 * Option sélectionnée d'une variable : celle demandée si elle est disponible,
 * sinon l'option par défaut si elle est disponible, sinon la première disponible.
 */
export function getSelectedOption(
  variable: Variable,
  optionId?: string | null
): Option | undefined {
  const { options, defaultOption } = variable
  const isAvailable = (option?: Option) => !!option && option.available !== false
  const requested = optionId && options.find(({ id }) => id === optionId)
  if (requested && isAvailable(requested)) return requested
  if (isAvailable(options[defaultOption])) return options[defaultOption]
  return options.find(isAvailable)
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
    (variable, index) => {
      const blockName = variable.blockName || 'option'
      const option = getSelectedOption(variable, optionsId[index])
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
