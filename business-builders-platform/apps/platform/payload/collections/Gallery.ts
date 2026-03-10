import type { CollectionConfig } from 'payload'

export const Gallery: CollectionConfig = {
  slug: 'gallery',
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'title',
    group: 'Content',
    defaultColumns: ['title', 'category', 'order'],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'altText',
      type: 'text',
      label: 'Alt Text',
      admin: {
        description: 'Overrides the media alt text for this gallery context',
      },
    },
    {
      name: 'category',
      type: 'select',
      hasMany: true,
      required: true,
      options: [
        { label: 'Highland Cattle', value: 'cattle' },
        { label: 'Goats', value: 'goats' },
        { label: 'Llamas & Alpaca', value: 'llamas-alpaca' },
        { label: 'Donkeys', value: 'donkeys' },
        { label: 'Poultry & Fowl', value: 'poultry' },
        { label: 'Dogs', value: 'dogs' },
        { label: 'Rabbits', value: 'rabbits' },
        { label: 'Farm Life', value: 'farm-life' },
        { label: 'Events', value: 'events' },
        { label: 'Products', value: 'products' },
      ],
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      label: 'Featured Image',
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
    },
  ],
}
