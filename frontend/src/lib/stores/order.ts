import { writable } from 'svelte/store'
import { browser } from '$app/environment'

import type { Order } from 'types'

export const order = createOrder()

export type Item = Order['items'][number]

function createOrder() {
  const key = 'order'
  const storedValue = browser && localStorage.getItem(key)
  const { subscribe, set, update } = writable<Partial<Order> | null>(
    storedValue ? JSON.parse(storedValue) : null
  )
  subscribe(
    (value) => browser && localStorage.setItem(key, JSON.stringify(value))
  )

  const getAmountDue = (items: Order['items']) =>
    items.reduce((acc, cur) => acc + cur.price, 0)

  return {
    subscribe,
    set,
    update,
    add(item: Item) {
      update((_order) => {
        if (!_order) {
          console.error('order store value is not defined')
          return null
        }
        const items = [item, ...(_order.items || [])]
        const amountDue = getAmountDue(items)
        return { ..._order, amountDue, items }
      })
    },
    delete(index: number) {
      update((_order) => {
        if (!_order) {
          console.error('order store value is not defined')
          return null
        }
        const currentItems = _order.items || []
        const items = [
          ...currentItems.slice(0, index),
          ...currentItems.slice(index + 1),
        ]
        const amountDue = getAmountDue(items)
        return { ..._order, amountDue, items }
      })
    },
  }
}
