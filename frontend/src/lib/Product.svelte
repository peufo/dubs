<script lang="ts">
  import logo from '$lib/assets/logo-borderless.png?w400&h=300&webp'
  import { formatAmount } from '$lib/utils/formatAmount'

  let price = 18
</script>

<a href="#" class="group max-w-md">
  <div
    class="
    shadow-md border rounded
    bg-white border-secondary-dark/20 shadow-secondary-dark/80
    hover:shadow-2xl hover:shadow-secondary-dark hover:scale-105
    transition-all
  "
  >
    <div>
      <img
        src={logo}
        alt="Produit sans illustration"
        class="object-center h-full"
      />
    </div>

    <div class="py-2 px-4 flex">
      <div>
        <h4 class="text-xl">Miel de fleur</h4>
        <h5 class="text-secondary-dark">Récolté le 15 Mars 2022</h5>
      </div>
      <div class="ml-auto  font-bold">
        {formatAmount(price)}
      </div>
    </div>
  </div>
</a>
