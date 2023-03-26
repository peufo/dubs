<script lang="ts">
  import type { Order } from 'types'

  export let state: Order['stateOrder']
  let klass = ''
  export { klass as class }

  const stateLabel: Record<Order['stateOrder'], string> = {
    open: 'En cours',
    canceled: 'Anulée',
    close: 'Terminée',
  }
</script>

<div
  class="{klass} border rounded px-2 text-sm grid content-center h-7 whitespace-nowrap"
  class:border-blue-600={state === 'open'}
  class:text-blue-600={state === 'open'}
  class:bg-blue-50={state === 'open'}
  class:border-green-600={state === 'close'}
  class:text-green-600={state === 'close'}
  class:bg-green-50={state === 'close'}
  class:border-orange-600={state === 'canceled'}
  class:text-orange-600={state === 'canceled'}
  class:bg-orange-50={state === 'canceled'}
>
  {stateLabel[state]}
</div>
