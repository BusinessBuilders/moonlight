import { farmTemplate } from './farm'
import { contractorTemplate } from './contractor'
import { restaurantTemplate } from './restaurant'
import { generalTemplate } from './general'

export const siteTemplates = {
  farm: farmTemplate,
  contractor: contractorTemplate,
  restaurant: restaurantTemplate,
  general: generalTemplate,
} as const

export type SiteType = keyof typeof siteTemplates

export function getTemplate(siteType: string) {
  return siteTemplates[siteType as SiteType] || siteTemplates.general
}
