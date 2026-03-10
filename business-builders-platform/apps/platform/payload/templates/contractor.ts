export const contractorTemplate = {
  siteType: 'contractor' as const,
  label: 'Contractor / Trade',
  collections: ['pages', 'services', 'gallery', 'testimonials', 'team', 'documents', 'inquiry-flow-config', 'inquiry-submissions', 'site-settings', 'media'],
  defaultServices: [
    { title: 'Residential Services', slug: 'residential', category: 'other', order: 1 },
    { title: 'Commercial Services', slug: 'commercial', category: 'other', order: 2 },
    { title: 'Emergency Repairs', slug: 'emergency', category: 'other', order: 3 },
    { title: 'Free Estimates', slug: 'estimates', category: 'other', order: 4 },
  ],
  defaultInquiryBranches: [
    { branchId: 'quote', label: 'Request a Quote', icon: 'clipboard' },
    { branchId: 'emergency', label: 'Emergency Service', icon: 'alert' },
    { branchId: 'general', label: 'General Inquiry', icon: 'message' },
  ],
}
