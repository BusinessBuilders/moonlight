import type { CollectionConfig } from 'payload'

export const ApiKeys: CollectionConfig = {
  slug: 'api-keys',
  admin: {
    useAsTitle: 'keyPrefix',
    group: 'Platform',
    defaultColumns: ['keyPrefix', 'tenant', 'status', 'lastUsedAt'],
  },
  fields: [
    {
      name: 'keyHash',
      type: 'text',
      required: true,
      label: 'Key Hash',
      admin: {
        readOnly: true,
        description: 'SHA-256 hash of the API key',
      },
    },
    {
      name: 'keyPrefix',
      type: 'text',
      required: true,
      label: 'Key Prefix',
      admin: {
        readOnly: true,
        description: 'First 8 characters for identification (e.g., "client_ab")',
      },
    },
    {
      name: 'tenant',
      type: 'relationship',
      relationTo: 'tenants',
      required: true,
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'active',
      options: [
        { label: 'Active', value: 'active' },
        { label: 'Revoked', value: 'revoked' },
        { label: 'Expired', value: 'expired' },
      ],
    },
    {
      name: 'rateLimit',
      type: 'number',
      defaultValue: 500,
      label: 'Rate Limit (req/min)',
    },
    {
      name: 'lastUsedAt',
      type: 'date',
      label: 'Last Used',
      admin: { readOnly: true },
    },
    {
      name: 'expiresAt',
      type: 'date',
      label: 'Expires At',
    },
    {
      name: 'description',
      type: 'text',
      admin: {
        description: 'Optional note about this key',
      },
    },
  ],
  access: {
    read: ({ req }) => {
      const user = req.user as { roles?: string[] } | null
      return Boolean(user?.roles?.includes('super_admin'))
    },
    create: ({ req }) => {
      const user = req.user as { roles?: string[] } | null
      return Boolean(user?.roles?.includes('super_admin'))
    },
    update: ({ req }) => {
      const user = req.user as { roles?: string[] } | null
      return Boolean(user?.roles?.includes('super_admin'))
    },
    delete: ({ req }) => {
      const user = req.user as { roles?: string[] } | null
      return Boolean(user?.roles?.includes('super_admin'))
    },
  },
}
