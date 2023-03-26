import type {
  CollectionConfig,
  CollectionBeforeValidateHook,
} from 'payload/types'
import payload from 'payload'
import type { Order, Product } from 'types'
import { getLabel, getOrderItemPrice } from 'common'

/**
 * TODO: Chuis bien emmerdé car les produit ne sont pas lookup
 * Calule le prix total de la commande
 * Détermine le label
 */
const beforeValidate: CollectionBeforeValidateHook<Order> = async ({
  data,
}) => {
  /*
  const products: Product[] = []
  const idsOrProducts = data.items.map((item) => item.product)
  for (const idOrProduct of idsOrProducts) {
    if (typeof idOrProduct === 'object') products.push(idOrProduct)
    else
      products.push(
        await payload.findByID({
          collection: 'product',
          id: idOrProduct,
        })
      )
  }

  data.label = getLabel({ ...data })
  data.amountDue = data.items.reduce(
    (acc, cur) => acc + getOrderItemPrice(cur.product, cur.options),
    0
  )
  */
  return data
}

export const hooks: CollectionConfig['hooks'] = {
  beforeValidate: [beforeValidate],
}
