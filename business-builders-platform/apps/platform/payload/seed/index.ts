import { getPayload } from 'payload'
import config from '@payload-config'
import { generateApiKey, hashApiKey } from '../../lib/api-key'

async function seed() {
  console.log('🌱 Starting seed...')

  const payload = await getPayload({ config })

  // ──────────────────────────────────────────────
  // 1. Super Admin User
  // ──────────────────────────────────────────────
  console.log('Creating super admin user...')
  let superAdmin
  try {
    superAdmin = await payload.create({
      collection: 'users',
      data: {
        email: 'admin@business-builder.online',
        password: 'admin123!',
        firstName: 'Business',
        lastName: 'Builders',
        roles: ['super_admin'],
      },
    })
    console.log(`  ✓ Super admin: ${superAdmin.email}`)
  } catch (err: unknown) {
    const e = err as { message?: string }
    console.log(`  ⚠ Super admin may already exist: ${e.message}`)
    const existing = await payload.find({
      collection: 'users',
      where: { email: { equals: 'admin@business-builder.online' } },
      limit: 1,
    })
    superAdmin = existing.docs[0]
  }

  // ──────────────────────────────────────────────
  // 2. Moonlight Farm Tenant
  // ──────────────────────────────────────────────
  console.log('Creating Moonlight Farm tenant...')
  let tenant
  try {
    tenant = await payload.create({
      collection: 'tenants',
      data: {
        name: 'Moonlight Run Farm LLC',
        slug: 'moonlight-farm',
        domain: 'moonlightrunfarm.com',
        status: 'active',
        siteType: 'farm',
        ownerEmail: 'moonlightrunfarmllc@gmail.com',
        address: {
          street: '1140 South Street',
          city: 'Barre',
          state: 'MA',
          zip: '01005',
        },
      },
    })
    console.log(`  ✓ Tenant: ${tenant.name} (${tenant.slug})`)
  } catch (err: unknown) {
    const e = err as { message?: string }
    console.log(`  ⚠ Tenant may already exist: ${e.message}`)
    const existing = await payload.find({
      collection: 'tenants',
      where: { slug: { equals: 'moonlight-farm' } },
      limit: 1,
    })
    tenant = existing.docs[0]
  }

  const tenantId = tenant.id

  // ──────────────────────────────────────────────
  // 3. Client Admin User (Jesse)
  // ──────────────────────────────────────────────
  console.log('Creating client admin user...')
  try {
    const clientAdmin = await payload.create({
      collection: 'users',
      data: {
        email: 'moonlightrunfarmllc@gmail.com',
        password: 'moonlight2024!',
        firstName: 'Jesse',
        lastName: 'Klayman',
        roles: ['client_admin'],
        tenant: tenantId,
      },
    })
    console.log(`  ✓ Client admin: ${clientAdmin.email}`)
  } catch (err: unknown) {
    const e = err as { message?: string }
    console.log(`  ⚠ Client admin may already exist: ${e.message}`)
  }

  // ──────────────────────────────────────────────
  // 4. API Key for Moonlight Farm
  // ──────────────────────────────────────────────
  console.log('Creating API key...')
  try {
    const { key, hash, prefix } = generateApiKey()
    await payload.create({
      collection: 'api-keys',
      data: {
        name: 'Moonlight Farm Production Key',
        keyHash: hash,
        keyPrefix: prefix,
        tenant: tenantId,
        status: 'active',
        rateLimit: 500,
      },
    })
    console.log(`  ✓ API Key created: ${prefix}...`)
    console.log(`  📋 Full key (save this!): ${key}`)
  } catch (err: unknown) {
    const e = err as { message?: string }
    console.log(`  ⚠ API key creation failed: ${e.message}`)
  }

  // ──────────────────────────────────────────────
  // 5. Site Settings
  // ──────────────────────────────────────────────
  console.log('Creating site settings...')
  try {
    await payload.create({
      collection: 'site-settings',
      data: {
        farmName: 'Moonlight Run Farm LLC',
        tagline: 'Highland Cattle & Specialty Animal Farm',
        contactEmail: 'moonlightrunfarmllc@gmail.com',
        contactPhone: '(508) 713-2650',
        showPhone: false,
        address: '1140 South Street, Barre, MA 01005',
        socialLinks: {
          facebook: 'https://www.facebook.com/moonlightrunfarm',
          instagram: 'https://www.instagram.com/moonlightrunfarm',
        },
        aboutHeading: 'Our Story',
        aboutText: 'Angela and Jesse Klayman met in 2018 and quickly bonded over their shared passion for animals and agriculture. Both nurses by profession, they bring the same dedication and care from their healthcare careers to their farming practices. At Moonlight Run Farm, full transparency is their policy — they believe in "Know your farmer, know your food!" Their commitment to regenerative agriculture and ethical animal husbandry sets them apart.',
        footerText: '© Moonlight Run Farm LLC. All rights reserved.',
        tenant: tenantId,
      },
    })
    console.log('  ✓ Site settings created')
  } catch (err: unknown) {
    const e = err as { message?: string }
    console.log(`  ⚠ Site settings may already exist: ${e.message}`)
  }

  // ──────────────────────────────────────────────
  // 6. Services (7 categories from trifold)
  // ──────────────────────────────────────────────
  console.log('Creating services...')
  const services = [
    {
      title: 'Livestock & Equine Transport',
      slug: 'livestock-transport',
      description: 'Professional livestock and equine hauling services. Safe, reliable transportation for cattle, horses, llamas, alpacas, and other animals. Fully insured with experienced handlers. Local and regional transport available.',
      category: 'transport',
      pricingText: 'Contact for quote — varies by distance and animals',
      inquiryType: 'hauling',
      order: 1,
      tenant: tenantId,
    },
    {
      title: 'Educational Programs',
      slug: 'educational-programs',
      description: 'Learn about Highland Cattle, llamas, alpacas, and other specialty animals. Farm tours and educational visits for schools, homeschool groups, and community organizations. Hands-on experiences with animal care and farm life.',
      category: 'education',
      pricingText: 'Contact for group pricing',
      inquiryType: 'events',
      order: 2,
      tenant: tenantId,
    },
    {
      title: 'Petting Zoos & Events',
      slug: 'petting-zoos',
      description: 'Bring the farm to your event! Our mobile petting zoo features friendly, well-socialized animals perfect for corporate events, birthday parties, weddings, Bar/Bat Mitzvahs, and Sweet 16 celebrations. Full setup and supervision included.',
      category: 'petting-zoo',
      pricingText: 'Starting at $500 — varies by event size and duration',
      inquiryType: 'events',
      order: 3,
      tenant: tenantId,
    },
    {
      title: 'Livestock Services',
      slug: 'livestock-services',
      description: 'Complete livestock management services including hoof trimming, catching, sorting, ear tagging, castration, worming, and vaccination. Professional, experienced handlers for cattle, goats, llamas, and more.',
      category: 'livestock-services',
      pricingText: 'Contact for service pricing',
      inquiryType: 'general',
      order: 4,
      tenant: tenantId,
    },
    {
      title: 'Dog Boarding',
      slug: 'dog-boarding',
      description: 'Farm-style dog boarding in a safe, spacious environment. Your dog will enjoy acres of supervised outdoor time alongside our Great Pyrenees livestock guardian dogs. Personalized care and attention.',
      category: 'boarding',
      pricingText: 'Contact for daily/weekly rates',
      inquiryType: 'general',
      order: 5,
      tenant: tenantId,
    },
    {
      title: 'Animal Sales',
      slug: 'animal-sales',
      description: 'Quality Highland Cattle, llamas, Nigerian Dwarf Goats, and other specialty livestock for sale. All animals are raised with care on our farm. We can also help connect buyers and sellers.',
      category: 'animal-sales',
      pricingText: 'Contact for availability and pricing',
      inquiryType: 'animal-sales',
      order: 6,
      tenant: tenantId,
    },
    {
      title: 'Special Events',
      slug: 'special-events',
      description: 'Host your special occasion at Moonlight Run Farm or let us bring the experience to you. From intimate gatherings to large celebrations, we create memorable farm experiences for all ages.',
      category: 'events',
      pricingText: 'Custom pricing based on event needs',
      inquiryType: 'events',
      order: 7,
      tenant: tenantId,
    },
  ]

  for (const service of services) {
    try {
      await payload.create({ collection: 'services', data: service })
      console.log(`  ✓ Service: ${service.title}`)
    } catch (err: unknown) {
      const e = err as { message?: string }
      console.log(`  ⚠ Service "${service.title}": ${e.message}`)
    }
  }

  // ──────────────────────────────────────────────
  // 7. Products (from trifold)
  // ──────────────────────────────────────────────
  console.log('Creating products...')
  const products = [
    {
      name: '100% Grass-Fed Highland Beef',
      slug: 'highland-beef',
      description: 'Premium 100% grass-fed Highland beef from our own herd. Rich flavor, leaner than conventional beef, and raised without hormones or antibiotics. Available in custom cuts, quarter, half, or whole.',
      category: 'meat',
      price: 0,
      priceUnit: 'per lb',
      availability: 'available' as const,
      qualityBadges: ['grass-fed', 'no-antibiotics', 'pasture-raised'],
      tenant: tenantId,
    },
    {
      name: 'Pasture Raised Turkey',
      slug: 'pasture-turkey',
      description: 'Heritage breed turkeys raised on pasture with supplemental organic feed. Available fresh for Thanksgiving — reserve early as they sell out quickly!',
      category: 'meat',
      price: 0,
      priceUnit: 'per lb',
      availability: 'seasonal' as const,
      seasonalNote: 'November only — reserve early!',
      qualityBadges: ['pasture-raised', 'heritage-breed'],
      tenant: tenantId,
    },
    {
      name: 'Pasture Raised Chicken',
      slug: 'pasture-chicken',
      description: 'Pasture-raised chickens moved to fresh grass regularly. Supplemented with non-GMO feed. Processed fresh on-farm for maximum quality and flavor.',
      category: 'meat',
      price: 0,
      priceUnit: 'per lb',
      availability: 'seasonal' as const,
      seasonalNote: 'Available spring through fall',
      qualityBadges: ['pasture-raised'],
      tenant: tenantId,
    },
    {
      name: 'Farm Fresh Eggs',
      slug: 'farm-eggs',
      description: 'Farm fresh eggs from our free-range chickens and geese. Rich, golden yolks from hens that forage on pasture daily. Chicken and goose eggs available.',
      category: 'eggs',
      price: 0,
      priceUnit: 'per dozen',
      availability: 'available' as const,
      qualityBadges: ['free-range', 'pasture-raised'],
      tenant: tenantId,
    },
    {
      name: 'Hay (Small Square & Round Bales)',
      slug: 'hay',
      description: 'Quality hay available in small square bales and round bales. First and second cutting available. Great for livestock feed, bedding, and landscaping.',
      category: 'feed',
      price: 0,
      priceUnit: 'per bale',
      availability: 'seasonal' as const,
      seasonalNote: 'Available after cutting season',
      qualityBadges: [],
      tenant: tenantId,
    },
    {
      name: 'Raw Fiber',
      slug: 'raw-fiber',
      description: 'Raw fiber from our llamas, alpacas, and sheep. Perfect for hand-spinners, felters, and fiber artists. Unwashed and unprocessed — premium quality fleece.',
      category: 'fiber',
      price: 0,
      priceUnit: 'per lb',
      availability: 'seasonal' as const,
      seasonalNote: 'Available after spring shearing',
      qualityBadges: [],
      tenant: tenantId,
    },
  ]

  for (const product of products) {
    try {
      await payload.create({ collection: 'products', data: product })
      console.log(`  ✓ Product: ${product.name}`)
    } catch (err: unknown) {
      const e = err as { message?: string }
      console.log(`  ⚠ Product "${product.name}": ${e.message}`)
    }
  }

  // ──────────────────────────────────────────────
  // 8. Team Members
  // ──────────────────────────────────────────────
  console.log('Creating team members...')
  const teamMembers = [
    {
      name: 'Angela Klayman',
      role: 'Co-Owner',
      bio: 'Angela is a registered nurse who brings her passion for care and attention to detail to every aspect of farm life. She and Jesse met in 2018 and quickly bonded over their love of animals and agriculture. Angela oversees animal health and wellness at the farm.',
      shortBio: 'Co-owner, RN, animal care specialist',
      order: 1,
      tenant: tenantId,
    },
    {
      name: 'Jesse Klayman',
      role: 'Co-Owner',
      bio: 'Jesse is a nurse and experienced farmer who manages the day-to-day operations at Moonlight Run Farm. With deep knowledge of livestock handling, transport, and breeding, Jesse ensures every animal receives top-quality care. He believes in full transparency and regenerative agriculture practices.',
      shortBio: 'Co-owner, RN, livestock & operations manager',
      order: 2,
      tenant: tenantId,
    },
  ]

  for (const member of teamMembers) {
    try {
      await payload.create({ collection: 'team', data: member })
      console.log(`  ✓ Team: ${member.name}`)
    } catch (err: unknown) {
      const e = err as { message?: string }
      console.log(`  ⚠ Team "${member.name}": ${e.message}`)
    }
  }

  // ──────────────────────────────────────────────
  // 9. Inquiry Flow Config (4 branches)
  // ──────────────────────────────────────────────
  console.log('Creating inquiry flow config...')
  try {
    await payload.create({
      collection: 'inquiry-flow-config',
      data: {
        branches: [
          {
            branchId: 'animal-sales',
            label: 'Animal Sales',
            description: 'Highland Cattle, Llamas, Goats & more',
            icon: 'cow',
            questions: [
              { fieldName: 'animalType', label: 'What type of animal are you interested in?', inputType: 'select', options: [{ label: 'Highland Cattle', value: 'highland-cattle' }, { label: 'Llama', value: 'llama' }, { label: 'Nigerian Dwarf Goat', value: 'goat' }, { label: 'Alpaca', value: 'alpaca' }, { label: 'Other', value: 'other' }] },
              { fieldName: 'buyOrSell', label: 'Are you looking to buy or sell?', inputType: 'select', options: [{ label: 'Buy', value: 'buy' }, { label: 'Sell', value: 'sell' }, { label: 'Both', value: 'both' }] },
              { fieldName: 'quantity', label: 'Approximate quantity', inputType: 'number' },
              { fieldName: 'timeline', label: 'When are you looking to buy/sell?', inputType: 'text' },
            ],
          },
          {
            branchId: 'events',
            label: 'Events & Petting Zoos',
            description: 'Birthdays, Corporate Events, Weddings & more',
            icon: 'party',
            questions: [
              { fieldName: 'eventType', label: 'What type of event?', inputType: 'select', options: [{ label: 'Birthday Party', value: 'birthday' }, { label: 'Corporate Event', value: 'corporate' }, { label: 'Wedding', value: 'wedding' }, { label: 'Bar/Bat Mitzvah', value: 'mitzvah' }, { label: 'Sweet 16', value: 'sweet-16' }, { label: 'Other', value: 'other' }] },
              { fieldName: 'guestCount', label: 'Estimated number of guests', inputType: 'number' },
              { fieldName: 'dateRange', label: 'Preferred date', inputType: 'date' },
              { fieldName: 'cateringNeeded', label: 'Do you need catering/food service?', inputType: 'select', options: [{ label: 'Yes', value: 'yes' }, { label: 'No', value: 'no' }, { label: 'Not sure yet', value: 'undecided' }] },
            ],
          },
          {
            branchId: 'hauling',
            label: 'Livestock Transport',
            description: 'Professional livestock & equine hauling',
            icon: 'truck',
            questions: [
              { fieldName: 'pickup', label: 'Pickup location (city, state)', inputType: 'text' },
              { fieldName: 'destination', label: 'Destination (city, state)', inputType: 'text' },
              { fieldName: 'animalTypeAndCount', label: 'Type and number of animals', inputType: 'text' },
              { fieldName: 'preferredDate', label: 'Preferred date', inputType: 'date' },
            ],
          },
          {
            branchId: 'general',
            label: 'General Inquiry',
            description: 'Questions, farm visits, or anything else',
            icon: 'message',
            questions: [
              { fieldName: 'topic', label: 'What is your inquiry about?', inputType: 'text' },
              { fieldName: 'message', label: 'Tell us more', inputType: 'textarea' },
            ],
          },
        ],
        contactFields: {
          nameRequired: true,
          emailRequired: true,
          phoneOptional: true,
          phoneLabel: 'Phone (optional)',
        },
        confirmationMessage: 'Thank you for your inquiry! Jesse will get back to you within 24–48 hours.',
        emailRouting: {
          defaultRecipient: 'moonlightrunfarmllc@gmail.com',
          subjectPrefix: '[Moonlight Run Farm]',
        },
        tenant: tenantId,
      },
    })
    console.log('  ✓ Inquiry flow config created with 4 branches')
  } catch (err: unknown) {
    const e = err as { message?: string }
    console.log(`  ⚠ Inquiry flow config: ${e.message}`)
  }

  // ──────────────────────────────────────────────
  // 10. Sample Testimonials
  // ──────────────────────────────────────────────
  console.log('Creating sample testimonials...')
  const testimonials = [
    {
      author: 'Sarah M.',
      quote: 'Moonlight Run Farm provided the most wonderful petting zoo for my daughter\'s birthday party. The kids were thrilled and the handlers were so patient and knowledgeable!',
      rating: 5,
      source: 'Facebook',
      featured: true,
      tenant: tenantId,
    },
    {
      author: 'Mike T.',
      quote: 'Jesse transported our two horses safely and on time. Professional service from start to finish. Would highly recommend for any livestock hauling needs.',
      rating: 5,
      source: 'Google',
      featured: true,
      tenant: tenantId,
    },
    {
      author: 'Lisa R.',
      quote: 'The Highland beef from Moonlight Run Farm is absolutely incredible. You can taste the difference when it\'s 100% grass-fed. Our whole family loves it!',
      rating: 5,
      source: 'Word of mouth',
      featured: true,
      tenant: tenantId,
    },
  ]

  for (const testimonial of testimonials) {
    try {
      await payload.create({ collection: 'testimonials', data: testimonial })
      console.log(`  ✓ Testimonial from: ${testimonial.author}`)
    } catch (err: unknown) {
      const e = err as { message?: string }
      console.log(`  ⚠ Testimonial: ${e.message}`)
    }
  }

  console.log('\n✅ Seed complete!')
  console.log('\n📋 Login credentials:')
  console.log('  Super Admin: admin@business-builder.online / admin123!')
  console.log('  Client Admin (Jesse): moonlightrunfarmllc@gmail.com / moonlight2024!')
  console.log('\n⚠️  Change these passwords immediately in production!')

  process.exit(0)
}

seed().catch((err) => {
  console.error('❌ Seed failed:', err)
  process.exit(1)
})
