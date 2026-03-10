import type { CollectionConfig } from 'payload'

export const InquirySubmissions: CollectionConfig = {
  slug: 'inquiry-submissions',
  admin: {
    useAsTitle: 'name',
    group: 'Content',
    defaultColumns: ['name', 'branchId', 'email', 'status', 'createdAt'],
  },
  defaultSort: '-createdAt',
  fields: [
    {
      name: 'branchId',
      type: 'text',
      required: true,
      label: 'Inquiry Branch',
    },
    {
      name: 'branchLabel',
      type: 'text',
      label: 'Branch Label',
    },
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'email',
      type: 'email',
      required: true,
    },
    {
      name: 'phone',
      type: 'text',
    },
    {
      name: 'answers',
      type: 'json',
      required: true,
      label: 'Form Answers',
      admin: {
        description: 'All question/answer pairs from the inquiry',
      },
    },
    {
      name: 'additionalMessage',
      type: 'textarea',
      label: 'Additional Message',
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'new',
      options: [
        { label: 'New', value: 'new' },
        { label: 'In Progress', value: 'in-progress' },
        { label: 'Responded', value: 'responded' },
        { label: 'Closed', value: 'closed' },
      ],
    },
    {
      name: 'notes',
      type: 'textarea',
      label: 'Internal Notes',
      admin: {
        description: 'Private notes about this inquiry (not visible to client)',
      },
    },
  ],
}
