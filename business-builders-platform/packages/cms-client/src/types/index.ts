export interface BBCMSConfig {
  apiUrl: string
  apiKey: string
  tenantId: string
}

export interface PaginatedResponse<T> {
  docs: T[]
  totalDocs: number
  limit: number
  totalPages: number
  page: number
  pagingCounter: number
  hasPrevPage: boolean
  hasNextPage: boolean
  prevPage: number | null
  nextPage: number | null
}

export interface HookResult<T> {
  data: T | null
  loading: boolean
  error: string | null
  refetch: () => Promise<void>
}

export interface HookListResult<T> {
  data: T[]
  loading: boolean
  error: string | null
  refetch: () => Promise<void>
  totalDocs: number
  hasNextPage: boolean
}

export interface MediaImage {
  id: string
  url: string
  alt: string
  filename: string
  mimeType: string
  width: number
  height: number
  sizes?: {
    thumbnail?: { url: string; width: number; height: number }
    card?: { url: string; width: number; height: number }
    hero?: { url: string; width: number; height: number }
  }
}

export interface SiteSettings {
  id: string
  farmName: string
  tagline?: string
  contactEmail: string
  contactPhone?: string
  showPhone: boolean
  address?: {
    street?: string
    city?: string
    state?: string
    zip?: string
  }
  appointmentOnly: boolean
  logo?: MediaImage
  socialLinks?: {
    facebook?: string
    instagram?: string
    tiktok?: string
    youtube?: string
  }
  brandColors?: {
    primary?: string
    secondary?: string
    accent?: string
  }
  facebookPixelId?: string
  googleAnalyticsId?: string
  aboutHeading?: string
  aboutText?: unknown
  footerText?: string
}

export interface Service {
  id: string
  title: string
  slug: string
  description?: unknown
  shortDescription?: string
  category: string
  pricingText?: string
  inquiryType?: string
  icon?: string
  image?: MediaImage
  order: number
}

export interface GalleryItem {
  id: string
  title: string
  image: MediaImage
  altText?: string
  category: string[]
  description?: string
  featured: boolean
  order: number
}

export interface Event {
  id: string
  title: string
  description?: unknown
  shortDescription?: string
  startTime: string
  endTime?: string
  location?: string
  image?: MediaImage
  facebookEventId?: string
  facebookEventUrl?: string
  registrationUrl?: string
  isFeatured: boolean
}

export interface Product {
  id: string
  name: string
  slug: string
  description?: unknown
  shortDescription?: string
  category: string
  price?: string
  priceUnit?: string
  availability: 'available' | 'seasonal' | 'sold-out' | 'pre-order'
  seasonalNote?: string
  qualityBadges: string[]
  image?: MediaImage
  order: number
}

export interface Testimonial {
  id: string
  author: string
  quote: string
  rating: number
  source?: string
  featured: boolean
}

export interface TeamMember {
  id: string
  name: string
  role: string
  bio?: unknown
  shortBio?: string
  photo?: MediaImage
  order: number
}

export interface DocumentItem {
  id: string
  title: string
  file: MediaImage
  category?: string
  requiresSignature: boolean
  description?: string
}

export interface PageItem {
  id: string
  title: string
  slug: string
  heroHeading?: string
  heroSubheading?: string
  content?: unknown
  seo?: {
    metaTitle?: string
    metaDescription?: string
    ogImage?: MediaImage
  }
}

export interface InquiryBranchQuestion {
  fieldName: string
  label: string
  inputType: 'text' | 'textarea' | 'email' | 'phone' | 'select' | 'multi-select' | 'date' | 'date-range' | 'number' | 'checkbox'
  placeholder?: string
  required: boolean
  options?: Array<{ label: string; value: string }>
}

export interface InquiryBranch {
  branchId: string
  label: string
  description?: string
  icon?: string
  questions: InquiryBranchQuestion[]
}

export interface InquiryFlowConfig {
  id: string
  introHeading: string
  introText: string
  branches: InquiryBranch[]
  contactFields: {
    showName: boolean
    showEmail: boolean
    showPhone: boolean
    showMessage: boolean
  }
  confirmationHeading: string
  confirmationText: string
  emailRouting: {
    defaultRecipient: string
    ccEmails?: string
    subjectPrefix?: string
  }
}

export interface InquirySubmission {
  branchId: string
  branchLabel: string
  name: string
  email: string
  phone?: string
  answers: Record<string, string>
  additionalMessage?: string
}

export interface FetchOptions {
  category?: string
  slug?: string
  limit?: number
  page?: number
  sort?: string
}
