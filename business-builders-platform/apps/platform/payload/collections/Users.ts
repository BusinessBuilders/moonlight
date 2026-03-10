import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  auth: {
    tokenExpiration: 28800, // 8 hours
    maxLoginAttempts: 5,
    lockTime: 600000, // 10 minutes
  },
  admin: {
    useAsTitle: 'email',
    group: 'Platform',
    defaultColumns: ['email', 'roles', 'createdAt'],
  },
  fields: [
    {
      name: 'firstName',
      type: 'text',
    },
    {
      name: 'lastName',
      type: 'text',
    },
    {
      name: 'roles',
      type: 'select',
      hasMany: true,
      required: true,
      defaultValue: ['client_admin'],
      options: [
        { label: 'Super Admin', value: 'super_admin' },
        { label: 'Client Admin', value: 'client_admin' },
        { label: 'Client Editor', value: 'client_editor' },
      ],
      access: {
        update: ({ req }) => {
          const user = req.user as { roles?: string[] } | null
          return Boolean(user?.roles?.includes('super_admin'))
        },
      },
    },
  ],
}
