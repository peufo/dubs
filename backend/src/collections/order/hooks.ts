import type {
  CollectionConfig,
  CollectionAfterChangeHook,
  CollectionBeforeValidateHook,
} from 'payload/types'
import payload from 'payload'
import { APIError } from 'payload/errors'
import type { Order, Email, Shop, User } from 'types'
import { getHTML, getContactHTML, getDeliveryHTML } from './html'
import { getShippingFee, getSubtotal } from './shipping'

/**
 * À la création, calcule les frais de livraison et la somme due
 * à partir de la config de la boutique.
 */
const beforeValidate: CollectionBeforeValidateHook<Order> = async ({
  data,
  operation,
}) => {
  if (operation !== 'create' || !data) return data

  const shop = (await payload.findGlobal({ slug: 'shop' })) as Shop
  const delivery = data.delivery || 'pickup'

  if (delivery === 'pickup' && shop.pickup?.enabled === false)
    throw new APIError(`Le retrait sur place n'est pas disponible`, 400)
  if (delivery === 'shipping') {
    if (!shop.shipping?.enabled)
      throw new APIError(`La livraison n'est pas disponible`, 400)
    const client = data.client && (await ensureUser(data.client))
    if (!client || !client.street || !client.zipCode || !client.city)
      throw new APIError(
        'Complétez votre adresse dans votre profil pour être livré',
        400
      )
  }

  const subtotal = getSubtotal(data.items || [])
  const shippingFee = getShippingFee(shop, delivery, subtotal)
  return { ...data, delivery, shippingFee, amountDue: subtotal + shippingFee }
}

const afterChange: CollectionAfterChangeHook<Order> = async ({
  doc,
  operation,
}) => {
  // Les mails ne partent qu'à la commande, pas à chaque modification dans l'admin
  if (operation !== 'create') return

  const emailConfig = (await payload.findGlobal({ slug: 'email' })) as Email
  const shop = (await payload.findGlobal({ slug: 'shop' })) as Shop

  const html = getHTML(doc)
  const client = await ensureUser(doc.client)
  const delivery = getDeliveryHTML(doc, shop, client)

  // Mail du client
  payload.sendEmail({
    from: 'Dubs-apiculture <info@dubs-apiculture.ch>',
    to: client.email,
    subject: 'Votre commande',
    html: html
      .replace('__TITLE__', emailConfig.order?.title || 'Votre commande')
      .replace('__MESSAGE__', emailConfig.order?.message || '')
      .replace('__DELIVERY__', delivery)
      .replace('__CONTACT__', getContactHTML(shop)),
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
        `👉 <a href="${orderUrl}">Voir la commande</a><br>
        Telephone: <b>${client.phone || ''}</b><br>
        Adresse: <b>${client.street || ''},
        ${client.zipCode || ''}
        ${client.city || ''}</b>`
      )
      .replace('__DELIVERY__', delivery)
      .replace('__CONTACT__', ''),
  })
}

export const hooks: CollectionConfig['hooks'] = {
  beforeValidate: [beforeValidate],
  afterChange: [afterChange],
}

async function ensureUser(userOrId: string | User): Promise<User> {
  if (typeof userOrId === 'object') return userOrId
  //@ts-ignore
  return payload.findByID({ collection: 'user', id: userOrId }) as Promise<User>
}
