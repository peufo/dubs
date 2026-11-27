<script lang="ts">
  import type { PageData } from './$types'
  import Title from '$lib/Title.svelte'

  export let data: PageData

  // Coordonnées saisies dans l'admin (Boutique → Contact)
  $: contact = data.shop?.contact || {}
  $: addressLines = (contact.address || '')
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
</script>

<svelte:head>
  <meta
    name="description"
    content="Mentions légales et protection des données de Dubs Apiculture."
  />
</svelte:head>

<Title subtitle="Mentions légales" />

<article class="max-w-2xl mx-auto px-4 pb-10 flex flex-col gap-8 text-lg">
  <section>
    <h2>Éditeur du site</h2>
    <p>
      <b>Dubs Apiculture</b>
      {#if contact.name}<br />{contact.name}{/if}
      {#each addressLines as line}<br />{line}{/each}
    </p>
    {#if contact.phone || contact.email}
      <p>
        {#if contact.phone}
          Téléphone :
          <a href="tel:{contact.phone.replace(/\s/g, '')}">{contact.phone}</a>
          <br />
        {/if}
        {#if contact.email}
          Email : <a href="mailto:{contact.email}">{contact.email}</a>
        {/if}
      </p>
    {/if}
  </section>

  <section>
    <h2>Conception et développement</h2>
    <p>
      Site réalisé par
      <a href="https://github.com/peufo" data-sveltekit-reload>Jonas Voisard</a>.
    </p>
  </section>

  <section>
    <h2>Hébergement</h2>
    <p>
      Le site et l'envoi des emails sont hébergés par Hostinger International
      Ltd., sur des serveurs situés dans l'Union européenne.
    </p>
  </section>

  <section>
    <h2>Propriété intellectuelle</h2>
    <p>
      Les textes, photos, illustrations et le logo de ce site appartiennent à
      Dubs Apiculture. Toute reproduction, même partielle, nécessite une
      autorisation préalable.
    </p>
  </section>

  <section>
    <h2>Responsabilité</h2>
    <p>
      Les informations publiées sur ce site sont fournies avec soin, mais sans
      garantie d'exactitude ou d'exhaustivité. Les prix et disponibilités des
      produits peuvent changer à tout moment. Dubs Apiculture n'est pas
      responsable du contenu des sites externes vers lesquels pointent des
      liens.
    </p>
  </section>

  <section id="donnees">
    <h2>Protection des données</h2>
    <p>
      Dubs Apiculture traite vos données personnelles conformément à la loi
      fédérale sur la protection des données (LPD). Le responsable du
      traitement est l'éditeur du site mentionné ci-dessus.
    </p>

    <h3>Données collectées</h3>
    <p>
      Lorsque vous créez un compte ou passez commande, nous enregistrons votre
      nom, prénom, adresse email, numéro de téléphone, adresse postale et le
      détail de vos commandes.
    </p>

    <h3>Utilisation</h3>
    <p>
      Ces données servent uniquement à traiter vos commandes, à organiser le
      retrait ou la livraison et à vous contacter à leur sujet. Elles ne sont
      ni vendues ni utilisées à des fins publicitaires.
    </p>

    <h3>Destinataires</h3>
    <p>
      Vos données sont stockées chez notre hébergeur, Hostinger, dans l'Union
      européenne, dont le niveau de protection des données est reconnu comme
      adéquat par le Conseil fédéral. En cas de livraison, votre nom et votre
      adresse sont transmis au transporteur.
    </p>

    <h3>Durée de conservation</h3>
    <p>
      Les données de votre compte sont conservées tant que celui-ci existe. Les
      commandes sont conservées dix ans, durée imposée pour les pièces
      comptables.
    </p>

    <h3>Vos droits</h3>
    <p>
      Vous pouvez modifier vos coordonnées à tout moment depuis
      <a href="/profile?address">votre profil</a>. Pour obtenir une copie de vos
      données ou demander la suppression de votre compte, écrivez-nous{#if contact.email}
        à <a href="mailto:{contact.email}">{contact.email}</a>{/if}.
    </p>

    <h3>Cookies</h3>
    <p>
      Le site utilise uniquement un cookie de session, nécessaire pour rester
      connecté, et enregistre votre panier dans votre navigateur. Aucun cookie
      publicitaire ni outil de mesure d'audience n'est utilisé.
    </p>
  </section>

  <p class="text-base opacity-60">Dernière mise à jour : novembre 2026</p>
</article>

<style>
  h2 {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
  }
  h3 {
    font-size: 1.25rem;
    font-weight: 600;
    margin: 1rem 0 0.25rem;
  }
  p + p {
    margin-top: 0.5rem;
  }
  a {
    text-decoration: underline;
    color: #264f53; /* secondary-dark */
  }
</style>
