import type { CollectionConfig } from 'payload'

export const Tenants: CollectionConfig = {
  slug: 'tenants',
  admin: {
    useAsTitle: 'name',
    group: 'Platform',
    defaultColumns: ['name', 'slug', 'status', 'siteType', 'createdAt'],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Business Name',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      label: 'Tenant Slug',
      admin: {
        description: 'URL-friendly identifier (e.g., moonlight-farm)',
      },
    },
    {
      name: 'domain',
      type: 'text',
      label: 'Custom Domain',
      admin: {
        description: 'Client site domain (e.g., moonlightrunfarm.com)',
      },
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'active',
      options: [
        { label: 'Active', value: 'active' },
        { label: 'Suspended', value: 'suspended' },
        { label: 'Pending', value: 'pending' },
      ],
    },
    {
      name: 'siteType',
      type: 'select',
      required: true,
      label: 'Site Type',
      options: [
        { label: 'Farm / Agriculture', value: 'farm' },
        { label: 'Contractor / Trade', value: 'contractor' },
        { label: 'Restaurant / Food', value: 'restaurant' },
        { label: 'General Business', value: 'general' },
      ],
    },
    {
      name: 'ownerEmail',
      type: 'email',
      required: true,
      label: 'Owner Email',
    },
    {
      name: 'ownerName',
      type: 'text',
      label: 'Owner Name',
    },
    {
      name: 'address',
      type: 'group',
      fields: [
        { name: 'street', type: 'text' },
        { name: 'city', type: 'text' },
        { name: 'state', type: 'text' },
        { name: 'zip', type: 'text' },
      ],
    },
  ],
}
