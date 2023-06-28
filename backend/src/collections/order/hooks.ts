import type {
  CollectionConfig,
  CollectionAfterChangeHook,
  CollectionBeforeValidateHook,
} from 'payload/types'
import payload from 'payload'
import type { Order, Email, User } from 'types'
import { getHTML } from './html'

/**
 * TODO: Chuis bien emmerdé car les produit ne sont pas lookup
 * Calule le prix total de la commande
 * Détermine le label
 */
const beforeValidate: CollectionBeforeValidateHook<Order> = async ({
  data,
}) => {
  console.log(data)
  return data
}

const afterChange: CollectionAfterChangeHook<Order> = async ({ doc }) => {
  const emailConfig = (await payload.findGlobal({ slug: 'email' })) as Email

  const html = getHTML(doc)

  // Mail du client
  const client = await ensureUser(doc.client)
  payload.sendEmail({
    from: 'Dubs-apiculture <info@dubs-apiculture.ch>',
    to: client.email,
    subject: 'Votre commande',
    html: html
      .replace('__TITLE__', emailConfig.order?.title || 'Votre commande')
      .replace('__MESSAGE__', emailConfig.order.message || ''),
  })

  // Notification des admins
  let notify = await Promise.all(
    (emailConfig.order?.notify || []).map(ensureUser)
  )

  // TODO: place domain in env var
  const domain = 'https://dubs-apiculture.ch'
  const orderUrl = `${domain}/admin/collections/order/${doc.id}`

  payload.sendEmail({
    from: 'Dubs-apiculture <info@dubs-apiculture.ch>',
    to: notify.map((user) => user.email).join(';'),
    subject: 'Nouvelle commande',
    html: html
      .replace(
        '__TITLE__',
        `Nouvelle commande de ${client.name} ${client.surname || ''}`
      )
      .replace(
        '__MESSAGE__',
        `👉 <a href="${orderUrl}">Voir la commande</a>
        Telephone: <b>${client.phone || ''}</b><br>
        Adresse: ${client.street || ''},
        ${client.zipCode || ''}
        ${client.city || ''}`
      ),
  })
}

export const hooks: CollectionConfig['hooks'] = {
  beforeValidate: [beforeValidate],
  afterChange: [afterChange],
}

async function ensureUser(userOrId: string | User): Promise<User> {
  if (typeof userOrId === 'object') return userOrId
  return payload.findByID({ collection: 'user', id: userOrId }) as Promise<User>
}
