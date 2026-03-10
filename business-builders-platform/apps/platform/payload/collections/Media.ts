import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
  },
  admin: {
    group: 'Content',
  },
  upload: {
    staticDir: 'media',
    mimeTypes: ['image/*', 'application/pdf'],
    imageSizes: [
      {
        name: 'thumbnail',
        width: 300,
        height: 300,
        position: 'centre',
      },
      {
        name: 'card',
        width: 768,
        height: 512,
        position: 'centre',
      },
      {
        name: 'hero',
        width: 1920,
        height: 1080,
        position: 'centre',
      },
    ],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
      label: 'Alt Text',
      admin: {
        description: 'Describe this image for accessibility',
      },
    },
    {
      name: 'category',
      type: 'select',
      hasMany: true,
      options: [
        { label: 'Cattle', value: 'cattle' },
        { label: 'Goats', value: 'goats' },
        { label: 'Llamas & Alpaca', value: 'llamas-alpaca' },
        { label: 'Poultry', value: 'poultry' },
        { label: 'Dogs', value: 'dogs' },
        { label: 'Other Animals', value: 'other-animals' },
        { label: 'Farm', value: 'farm' },
        { label: 'Events', value: 'events' },
        { label: 'Products', value: 'products' },
        { label: 'Team', value: 'team' },
      ],
    },
  ],
}
