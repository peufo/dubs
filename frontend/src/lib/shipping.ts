import type { Order, Shop } from 'types'

/**
 * Frais de livraison, pour l'affichage dans le panier.
 * Le backend refait le calcul à la commande (backend/src/collections/order/shipping.ts).
 */
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

/** Modes de remise proposés par la boutique */
export function getDeliveryModes(shop: Shop): Order['delivery'][] {
  const modes: Order['delivery'][] = []
  if (shop.pickup?.enabled !== false) modes.push('pickup')
  if (shop.shipping?.enabled) modes.push('shipping')
  return modes
}
