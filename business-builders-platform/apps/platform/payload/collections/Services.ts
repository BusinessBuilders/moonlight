import type { CollectionConfig } from 'payload'

export const Services: CollectionConfig = {
  slug: 'services',
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
      admin: {
        description: 'Brief summary for cards (2-3 sentences)',
      },
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      options: [
        { label: 'Transport', value: 'transport' },
        { label: 'Education', value: 'education' },
        { label: 'Petting Zoo', value: 'petting-zoo' },
        { label: 'Livestock Services', value: 'livestock-services' },
        { label: 'Boarding', value: 'boarding' },
        { label: 'Animal Sales', value: 'animal-sales' },
        { label: 'Special Events', value: 'special-events' },
        { label: 'Other', value: 'other' },
      ],
    },
    {
      name: 'pricingText',
      type: 'text',
      label: 'Pricing Text',
      admin: {
        description: 'e.g., "Starting at $150" or "Contact for quote"',
      },
    },
    {
      name: 'inquiryType',
      type: 'text',
      label: 'Inquiry Branch',
      admin: {
        description: 'Links to inquiry wizard branch (e.g., "hauling", "events")',
      },
    },
    {
      name: 'icon',
      type: 'text',
      label: 'Icon Name',
      admin: {
        description: 'Icon identifier for the frontend',
      },
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
      admin: {
        description: 'Display order (lower = first)',
      },
    },
  ],
}
