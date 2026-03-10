export const generalTemplate = {
  siteType: 'general' as const,
  label: 'General Business',
  collections: ['pages', 'services', 'gallery', 'testimonials', 'team', 'documents', 'inquiry-flow-config', 'inquiry-submissions', 'site-settings', 'media'],
  defaultServices: [
    { title: 'Our Services', slug: 'services', category: 'other', order: 1 },
  ],
  defaultInquiryBranches: [
    { branchId: 'services', label: 'Service Inquiry', icon: 'briefcase' },
    { branchId: 'general', label: 'General Inquiry', icon: 'message' },
  ],
}
