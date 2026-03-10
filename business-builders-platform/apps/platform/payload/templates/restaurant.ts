export const restaurantTemplate = {
  siteType: 'restaurant' as const,
  label: 'Restaurant / Food',
  collections: ['pages', 'gallery', 'events', 'testimonials', 'team', 'documents', 'inquiry-flow-config', 'inquiry-submissions', 'site-settings', 'media'],
  defaultServices: [],
  defaultInquiryBranches: [
    { branchId: 'reservation', label: 'Make a Reservation', icon: 'calendar' },
    { branchId: 'catering', label: 'Catering Inquiry', icon: 'utensils' },
    { branchId: 'general', label: 'General Inquiry', icon: 'message' },
  ],
}
