import type { CollectionConfig } from 'payload'

export const Products: CollectionConfig = {
  slug: 'products',
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'name',
    group: 'Content',
    defaultColumns: ['name', 'category', 'availability', 'price'],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'richText',
    },
    {
      name: 'shortDescription',
      type: 'textarea',
      label: 'Short Description',
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      options: [
        { label: 'Beef', value: 'beef' },
        { label: 'Poultry', value: 'poultry' },
        { label: 'Eggs', value: 'eggs' },
        { label: 'Hay & Feed', value: 'hay' },
        { label: 'Fiber', value: 'fiber' },
        { label: 'Other', value: 'other' },
      ],
    },
    {
      name: 'price',
      type: 'text',
      label: 'Price',
      admin: {
        description: 'e.g., "$8.50/lb" or "Contact for pricing"',
      },
    },
    {
      name: 'priceUnit',
      type: 'text',
      label: 'Price Unit',
      admin: {
        description: 'e.g., "per lb", "per dozen", "per bale"',
      },
    },
    {
      name: 'availability',
      type: 'select',
      required: true,
      defaultValue: 'available',
      options: [
        { label: 'Available', value: 'available' },
        { label: 'Seasonal', value: 'seasonal' },
        { label: 'Sold Out', value: 'sold-out' },
        { label: 'Pre-Order', value: 'pre-order' },
      ],
    },
    {
      name: 'seasonalNote',
      type: 'text',
      label: 'Seasonal Note',
      admin: {
        description: 'e.g., "Available in November only"',
        condition: (_, siblingData) => siblingData?.availability === 'seasonal',
      },
    },
    {
      name: 'qualityBadges',
      type: 'select',
      hasMany: true,
      label: 'Quality Badges',
      options: [
        { label: 'Grass-Fed', value: 'grass-fed' },
        { label: 'Pasture Raised', value: 'pasture-raised' },
        { label: 'No Hormones', value: 'no-hormones' },
        { label: 'No Steroids', value: 'no-steroids' },
        { label: 'No Antibiotics', value: 'no-antibiotics' },
        { label: 'Federally Inspected', value: 'federally-inspected' },
        { label: 'Farm Fresh', value: 'farm-fresh' },
      ],
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
    },
  ],
}
