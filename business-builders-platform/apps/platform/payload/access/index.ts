import type { Access, FieldAccess } from 'payload'

type UserWithRoles = {
  id: string
  roles?: string[]
  tenants?: Array<{ tenant: { id: string; slug: string } | string }>
}

export const isSuperAdmin: Access = ({ req }) => {
  const user = req.user as UserWithRoles | null
  return Boolean(user?.roles?.includes('super_admin'))
}

export const isTenantAdmin: Access = ({ req }) => {
  const user = req.user as UserWithRoles | null
  if (!user) return false
  if (user.roles?.includes('super_admin')) return true
  return Boolean(user.roles?.includes('client_admin') || user.roles?.includes('client_editor'))
}

export const isSuperAdminField: FieldAccess = ({ req }) => {
  const user = req.user as UserWithRoles | null
  return Boolean(user?.roles?.includes('super_admin'))
}

export const isAuthenticated: Access = ({ req }) => {
  return Boolean(req.user)
}

export const isPublic: Access = () => true
