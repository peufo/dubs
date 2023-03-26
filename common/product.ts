import type { Product } from '../types'

type Variable = Required<Product>['variables'][number]
type Option = Variable['options'][number]

export function getVariablesValues(
  variables: Variable[] | undefined,
  optionsId: unknown
): Map<string, Option> {
  const options = new Map<string, Option>()

  if (!Array.isArray(optionsId)) return options
  if (typeof optionsId[0] !== 'string') return options
  optionsId as string[]

  if (!variables) return options

  variables.forEach((variable, index) => {
    const key = variable.blockName || `Option ${index + 1}`
    const optionId = optionsId[index]
    const option = variable.options.find(({ id }) => id === optionId)
    if (option) options.set(key, option)
  })

  return options
}
