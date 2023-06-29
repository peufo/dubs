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
    items.reduce((acc, cur) => acc + cur.price * cur.quantity, 0)

  function _update(updater: (_order: Partial<Order>) => Partial<Order>) {
    update((_order) => {
      if (!_order) {
        console.error('order store value is not defined')
        return null
      }
      const newOrder = updater(_order)
      newOrder.amountDue = getAmountDue(newOrder.items || [])
      return newOrder
    })
  }

  function refresh() {
    _update((_order) => _order)
  }

  function setQuantity(index: number, quantity: number) {
    _update((_order) => {
      let items = _order.items || []
      if (quantity === 0)
        items = [...items.slice(0, index), ...items.slice(index + 1)]
      else
        items = items.map((item, _index) => {
          if (_index !== index) return item
          return { ...item, quantity }
        })
      return { ..._order, items }
    })
  }

  function add(item: Item) {
    _update((_order) => {
      const toOptionsId = (_item: Item) =>
        JSON.stringify(_item.options.map((opt) => opt.id))

      const optionsId = toOptionsId(item)

      let items = _order.items || []
      const _itemIndex = items.findIndex(
        (_item) => _item.id === item.id && toOptionsId(_item) === optionsId
      )

      if (_itemIndex === -1) items = [item, ...items]
      else
        items = items.map((item, _index) => {
          if (_index !== _itemIndex) return item
          return { ...item, quantity: items[_itemIndex].quantity + 1 }
        })

      return { ..._order, items }
    })
  }

  function remove(index: number) {
    setQuantity(index, 0)
  }

  return {
    subscribe,
    set,
    update,
    setQuantity,
    add,
    remove,
    refresh,
  }
}
