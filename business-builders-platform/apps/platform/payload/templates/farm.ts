export const farmTemplate = {
  siteType: 'farm' as const,
  label: 'Farm / Agriculture',
  collections: ['pages', 'services', 'gallery', 'events', 'products', 'testimonials', 'team', 'documents', 'inquiry-flow-config', 'inquiry-submissions', 'site-settings', 'media'],
  defaultServices: [
    { title: 'Livestock & Equine Transport', slug: 'transport', category: 'transport', order: 1 },
    { title: 'Educational Programs', slug: 'education', category: 'education', order: 2 },
    { title: 'Petting Zoos & Events', slug: 'petting-zoos', category: 'petting-zoo', order: 3 },
    { title: 'Livestock Services', slug: 'livestock-services', category: 'livestock-services', order: 4 },
    { title: 'Dog Boarding', slug: 'dog-boarding', category: 'boarding', order: 5 },
    { title: 'Animal Sales', slug: 'animal-sales', category: 'animal-sales', order: 6 },
  ],
  defaultInquiryBranches: [
    { branchId: 'animal-sales', label: 'Animal Sales', icon: 'cow' },
    { branchId: 'events', label: 'Events & Petting Zoos', icon: 'party' },
    { branchId: 'hauling', label: 'Livestock Transport', icon: 'truck' },
    { branchId: 'general', label: 'General Inquiry', icon: 'message' },
  ],
}
