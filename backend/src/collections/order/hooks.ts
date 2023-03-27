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
  return data
}

const afterChange: CollectionAfterChangeHook<Order> = async ({ doc }) => {
  console.log('SMTP_PASS', process.env.SMTP_PASS)

  const emailConfig = (await payload.findGlobal({ slug: 'email' })) as Email

  const client = await ensureUser(doc.client)

  let notify = await Promise.all(
    (emailConfig.order?.notify || []).map(ensureUser)
  )
  let to = [client.email, ...notify.map((user) => user.email)].join(';')

  payload.sendEmail({
    from: 'Dubs-apiculture <info@dubs-apiculture.ch>',
    to,
    subject: 'Votre commande',
    html: getHTML(doc, emailConfig),
  })
}

export const hooks: CollectionConfig['hooks'] = {
  //beforeValidate: [beforeValidate],
  afterChange: [afterChange],
}

async function ensureUser(userOrId: string | User): Promise<User> {
  if (typeof userOrId === 'object') return userOrId
  return payload.findByID({ collection: 'user', id: userOrId }) as Promise<User>
}
