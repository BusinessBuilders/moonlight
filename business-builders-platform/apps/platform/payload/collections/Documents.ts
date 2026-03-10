import type { CollectionConfig } from 'payload'

export const Documents: CollectionConfig = {
  slug: 'documents',
  admin: {
    useAsTitle: 'title',
    group: 'Content',
    defaultColumns: ['title', 'category', 'createdAt'],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'file',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'category',
      type: 'select',
      options: [
        { label: 'Waiver', value: 'waiver' },
        { label: 'Contract', value: 'contract' },
        { label: 'Menu', value: 'menu' },
        { label: 'Form', value: 'form' },
        { label: 'Other', value: 'other' },
      ],
    },
    {
      name: 'requiresSignature',
      type: 'checkbox',
      defaultValue: false,
      label: 'Requires E-Signature',
    },
    {
      name: 'description',
      type: 'textarea',
    },
  ],
}
