import type { CollectionConfig } from 'payload'

export const Events: CollectionConfig = {
  slug: 'events',
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'title',
    group: 'Content',
    defaultColumns: ['title', 'startTime', 'endTime'],
  },
  defaultSort: '-startTime',
  fields: [
    {
      name: 'title',
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
      name: 'startTime',
      type: 'date',
      required: true,
      label: 'Start Date/Time',
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
    {
      name: 'endTime',
      type: 'date',
      label: 'End Date/Time',
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
    {
      name: 'location',
      type: 'text',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'facebookEventId',
      type: 'text',
      label: 'Facebook Event ID',
      admin: {
        description: 'Auto-synced from Facebook if available',
      },
    },
    {
      name: 'facebookEventUrl',
      type: 'text',
      label: 'Facebook Event URL',
    },
    {
      name: 'registrationUrl',
      type: 'text',
      label: 'Registration URL',
    },
    {
      name: 'isFeatured',
      type: 'checkbox',
      defaultValue: false,
      label: 'Featured Event',
    },
  ],
}
