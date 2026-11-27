import type { Order, Shop } from 'types'

type Item = Pick<Order['items'][number], 'price' | 'quantity'>

export function getSubtotal(items: Item[]): number {
  return items.reduce((acc, cur) => acc + cur.price * cur.quantity, 0)
}

/** Frais de livraison d'une commande, selon la config de la boutique */
export function getShippingFee(
  shop: Shop,
  delivery: Order['delivery'],
  subtotal: number
): number {
  if (delivery !== 'shipping') return 0
  const { fee, freeFrom } = shop.shipping || {}
  if (typeof freeFrom === 'number' && subtotal >= freeFrom) return 0
  return fee || 0
}
