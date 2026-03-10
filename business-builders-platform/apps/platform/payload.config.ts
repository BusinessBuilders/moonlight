import sharp from 'sharp'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { buildConfig } from 'payload'
import { multiTenantPlugin } from '@payloadcms/plugin-multi-tenant'

import { Tenants } from './payload/collections/Tenants'
import { Users } from './payload/collections/Users'
import { Media } from './payload/collections/Media'
import { Pages } from './payload/collections/Pages'
import { Services } from './payload/collections/Services'
import { Gallery } from './payload/collections/Gallery'
import { Events } from './payload/collections/Events'
import { Products } from './payload/collections/Products'
import { Testimonials } from './payload/collections/Testimonials'
import { Team } from './payload/collections/Team'
import { Documents } from './payload/collections/Documents'
import { InquiryFlowConfig } from './payload/collections/InquiryFlowConfig'
import { InquirySubmissions } from './payload/collections/InquirySubmissions'
import { ApiKeys } from './payload/collections/ApiKeys'
import { SiteSettings } from './payload/collections/SiteSettings'

export default buildConfig({
  secret: process.env.PAYLOAD_SECRET || 'CHANGE-ME-IN-PRODUCTION',

  cors: [
    'http://localhost:3002',
    'http://localhost:3000',
    process.env.NEXT_PUBLIC_CLIENT_URL || '',
  ].filter(Boolean),

  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
    push: process.env.NODE_ENV !== 'production',
    migrationDir: './migrations',
  }),

  editor: lexicalEditor(),
  sharp,

  collections: [
    Tenants,
    Users,
    ApiKeys,
    Media,
    Pages,
    Services,
    Gallery,
    Events,
    Products,
    Testimonials,
    Team,
    Documents,
    InquiryFlowConfig,
    InquirySubmissions,
    SiteSettings,
  ],

  globals: [],

  plugins: [
    multiTenantPlugin({
      tenantsSlug: 'tenants',
      cleanupAfterTenantDelete: true,
      collections: {
        pages: {},
        services: {},
        gallery: {},
        events: {},
        products: {},
        testimonials: {},
        team: {},
        documents: {},
        media: {},
        'inquiry-flow-config': { isGlobal: true },
        'inquiry-submissions': {},
        'site-settings': { isGlobal: true },
      },
      userHasAccessToAllTenants: (user) =>
        Boolean(
          user?.roles && Array.isArray(user.roles) && user.roles.includes('super_admin'),
        ),
    }),
  ],

  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: ' | Business Builders',
    },
  },

  typescript: {
    outputFile: './payload-types.ts',
  },
})
