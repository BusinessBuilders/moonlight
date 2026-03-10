import type { CollectionConfig } from 'payload'

export const SiteSettings: CollectionConfig = {
  slug: 'site-settings',
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'farmName',
    group: 'Configuration',
    description: 'Global site settings (one per tenant)',
  },
  fields: [
    {
      name: 'farmName',
      type: 'text',
      required: true,
      label: 'Business Name',
    },
    {
      name: 'tagline',
      type: 'text',
      label: 'Tagline',
    },
    {
      name: 'contactEmail',
      type: 'email',
      required: true,
      label: 'Contact Email',
    },
    {
      name: 'contactPhone',
      type: 'text',
      label: 'Contact Phone',
      admin: {
        description: 'Phone number (may be hidden on site per client preference)',
      },
    },
    {
      name: 'showPhone',
      type: 'checkbox',
      defaultValue: false,
      label: 'Display Phone on Website',
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
    {
      name: 'appointmentOnly',
      type: 'checkbox',
      defaultValue: false,
      label: 'Open by Appointment Only',
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'socialLinks',
      type: 'group',
      label: 'Social Media Links',
      fields: [
        { name: 'facebook', type: 'text', label: 'Facebook URL' },
        { name: 'instagram', type: 'text', label: 'Instagram URL' },
        { name: 'tiktok', type: 'text', label: 'TikTok URL' },
        { name: 'youtube', type: 'text', label: 'YouTube URL' },
      ],
    },
    {
      name: 'brandColors',
      type: 'group',
      label: 'Brand Colors',
      admin: {
        description: 'Override default theme colors',
      },
      fields: [
        { name: 'primary', type: 'text', label: 'Primary Color (hex)' },
        { name: 'secondary', type: 'text', label: 'Secondary Color (hex)' },
        { name: 'accent', type: 'text', label: 'Accent Color (hex)' },
      ],
    },
    {
      name: 'facebookPixelId',
      type: 'text',
      label: 'Facebook Pixel ID',
    },
    {
      name: 'googleAnalyticsId',
      type: 'text',
      label: 'Google Analytics ID',
    },
    {
      name: 'aboutHeading',
      type: 'text',
      label: 'About Section Heading',
    },
    {
      name: 'aboutText',
      type: 'richText',
      label: 'About Section Content',
    },
    {
      name: 'footerText',
      type: 'textarea',
      label: 'Footer Text',
    },
  ],
}
