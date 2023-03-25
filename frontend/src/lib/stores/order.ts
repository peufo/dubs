import { writable } from 'svelte/store'
import { browser } from '$app/environment'

import type { Order } from 'types'

export const order = createOrder()

export type Row = Order['cart'][number]

function createOrder() {
  const key = 'order'
  const storedValue = browser && localStorage.getItem(key)
  const { subscribe, set, update } = writable<Partial<Order> | null>(
    storedValue ? JSON.parse(storedValue) : null
  )
  subscribe(
    (value) => browser && localStorage.setItem(key, JSON.stringify(value))
  )

  const getAmountDue = (cart: Order['cart']) =>
    cart.reduce((acc, cur) => acc + cur.price, 0)

  return {
    subscribe,
    set,
    update,
    add(row: Row) {
      update((_order) => {
        if (!_order) {
          console.error('order store value is not defined')
          return null
        }
        const cart = [row, ...(_order.cart || [])]
        const amountDue = getAmountDue(cart)
        return { ..._order, amountDue, cart }
      })
    },
    delete(index: number) {
      update((_order) => {
        if (!_order) {
          console.error('order store value is not defined')
          return null
        }
        const currentCart = _order.cart || []
        const cart = [
          ...currentCart.slice(0, index),
          ...currentCart.slice(index + 1),
        ]
        const amountDue = getAmountDue(cart)
        return { ..._order, amountDue, cart }
      })
    },
  }
}
