import type { CollectionConfig } from 'payload'

export const InquiryFlowConfig: CollectionConfig = {
  slug: 'inquiry-flow-config',
  admin: {
    useAsTitle: 'title',
    group: 'Configuration',
    description: 'Configure the smart inquiry wizard branches and questions',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      defaultValue: 'Inquiry Flow Configuration',
      admin: { readOnly: true },
    },
    {
      name: 'introHeading',
      type: 'text',
      label: 'Intro Heading',
      defaultValue: 'How Can We Help You?',
    },
    {
      name: 'introText',
      type: 'textarea',
      label: 'Intro Text',
      defaultValue: 'Select the option that best describes your inquiry and we\'ll guide you through the process.',
    },
    {
      name: 'branches',
      type: 'array',
      label: 'Inquiry Branches',
      minRows: 1,
      fields: [
        {
          name: 'branchId',
          type: 'text',
          required: true,
          label: 'Branch ID',
          admin: { description: 'Unique identifier (e.g., "animal-sales", "events")' },
        },
        {
          name: 'label',
          type: 'text',
          required: true,
          label: 'Display Label',
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Card Description',
        },
        {
          name: 'icon',
          type: 'text',
          label: 'Icon Name',
          admin: { description: 'Icon identifier for the frontend' },
        },
        {
          name: 'questions',
          type: 'array',
          label: 'Questions',
          minRows: 1,
          fields: [
            {
              name: 'fieldName',
              type: 'text',
              required: true,
              label: 'Field Name',
              admin: { description: 'Unique field key (e.g., "animalType")' },
            },
            {
              name: 'label',
              type: 'text',
              required: true,
              label: 'Question Label',
            },
            {
              name: 'inputType',
              type: 'select',
              required: true,
              label: 'Input Type',
              options: [
                { label: 'Text', value: 'text' },
                { label: 'Textarea', value: 'textarea' },
                { label: 'Email', value: 'email' },
                { label: 'Phone', value: 'phone' },
                { label: 'Select', value: 'select' },
                { label: 'Multi-Select', value: 'multi-select' },
                { label: 'Date', value: 'date' },
                { label: 'Date Range', value: 'date-range' },
                { label: 'Number', value: 'number' },
                { label: 'Checkbox', value: 'checkbox' },
              ],
            },
            {
              name: 'placeholder',
              type: 'text',
            },
            {
              name: 'required',
              type: 'checkbox',
              defaultValue: true,
            },
            {
              name: 'options',
              type: 'array',
              label: 'Select Options',
              admin: {
                condition: (_, siblingData) =>
                  siblingData?.inputType === 'select' || siblingData?.inputType === 'multi-select',
              },
              fields: [
                { name: 'label', type: 'text', required: true },
                { name: 'value', type: 'text', required: true },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'contactFields',
      type: 'group',
      label: 'Contact Fields',
      fields: [
        {
          name: 'showName',
          type: 'checkbox',
          defaultValue: true,
          label: 'Show Name Field',
        },
        {
          name: 'showEmail',
          type: 'checkbox',
          defaultValue: true,
          label: 'Show Email Field',
        },
        {
          name: 'showPhone',
          type: 'checkbox',
          defaultValue: true,
          label: 'Show Phone Field',
        },
        {
          name: 'showMessage',
          type: 'checkbox',
          defaultValue: true,
          label: 'Show Additional Message Field',
        },
      ],
    },
    {
      name: 'confirmationHeading',
      type: 'text',
      label: 'Confirmation Heading',
      defaultValue: 'Thank You!',
    },
    {
      name: 'confirmationText',
      type: 'textarea',
      label: 'Confirmation Message',
      defaultValue: 'We\'ve received your inquiry and will get back to you within 24-48 hours.',
    },
    {
      name: 'emailRouting',
      type: 'group',
      label: 'Email Routing',
      fields: [
        {
          name: 'defaultRecipient',
          type: 'email',
          required: true,
          label: 'Default Recipient Email',
        },
        {
          name: 'ccEmails',
          type: 'text',
          label: 'CC Emails',
          admin: { description: 'Comma-separated list of CC emails' },
        },
        {
          name: 'subjectPrefix',
          type: 'text',
          label: 'Email Subject Prefix',
          defaultValue: '[Moonlight Run Farm]',
        },
      ],
    },
  ],
}
