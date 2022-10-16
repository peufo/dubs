import { Access, FieldAccess } from 'payload/types'
import { User } from 'types'

export const isSelf: Access<any, User> = ({ req: { user } }) => ({
  id: { equals: user.id },
})

export const isRole: (
  role: User['role'],
  orIsSelf?: boolean
) => Access<any, User> =
  (role, orSelf = false) =>
  ({ req: { user } }) => {
    if (_isRole(role, user)) return true
    if (orSelf) return { id: { equals: user.id } }
    return false
  }

export const isRoleField: (role: User['role']) => FieldAccess<any, User> =
  (role) =>
  ({ req: { user } }) =>
    _isRole(role, user)

function _isRole(role: User['role'], user: User): boolean {
  if (!user) return false
  if (role === 'user') return true
  if (role === 'editor') return user.role === 'editor' || user.role === 'admin'
  return user.role === 'admin'
}
