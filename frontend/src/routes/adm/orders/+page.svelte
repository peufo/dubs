<div class="grid place-content-center p-10">
  <div class="flex flex-col gap-4 text-lg">
    <h3 class="text-xl">TODO: Gestion simple des commandes</h3>
    <h4 class="">En attendant :</h4>
    <a
      class="hover:underline"
      target="_blank"
      href="/admin/collections/order?limit=10&page=1&where%5Bor%5D%5B0%5D%5Band%5D%5B0%5D%5BstateOrder%5D%5Bequals%5D=open&where%5Bor%5D%5B1%5D%5Band%5D%5B0%5D%5BpaymentOk%5D%5Bnot_equals%5D=true"
    >
      👉 Commandes en cours ou avec paiement non validé
    </a>

    <a
      class="hover:underline"
      target="_blank"
      href="/admin/collections/order?limit=10&page=1&where%5Bor%5D%5B0%5D%5Band%5D%5B0%5D%5BstateOrder%5D%5Bequals%5D=close&where%5Bor%5D%5B0%5D%5Band%5D%5B1%5D%5BpaymentOk%5D%5Bequals%5D=true"
    >
      👉 Commandes terminées avec paiement validé
    </a>

    <a
      class="hover:underline"
      target="_blank"
      href="/admin/collections/order?limit=10&page=1&where%5Bor%5D%5B0%5D%5Band%5D%5B0%5D%5BstateOrder%5D%5Bequals%5D=canceled"
    >
      👉 Commandes annulées
    </a>
  </div>
</div>
