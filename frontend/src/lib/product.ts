import type { Product } from 'types'
/**
 * return product price with options selection
 */
export function getPrice(product: Product, optionsId: string[]): number {
  const basePrice = product.price || 0
  if (!product.variables) return basePrice

  const optionsPrice = product.variables.reduce((acc, { options }, i) => {
    const option = options.find(({ id }) => id === optionsId[i])
    return acc + (option?.price || 0)
  }, 0)
  return basePrice + optionsPrice
}

type Variable = Required<Product>['variables'][number]
type Option = Variable['options'][number]

export function getVariablesValues(
  variables: Variable[] | undefined,
  optionsId: unknown
): Map<string, Option> {
  if (!Array.isArray(optionsId)) throw Error('optionsId need to be an array')
  if (typeof optionsId[0] !== 'string')
    throw Error('optionsId need to be an array of string')
  optionsId as string[]

  const options = new Map<string, Option>()
  if (!variables) return options

  variables.forEach((variable, index) => {
    const key = variable.blockName || `Option ${index + 1}`
    const optionId = optionsId[index]
    const option = variable.options.find(({ id }) => id === optionId)
    if (option) options.set(key, option)
  })

  return options
}
