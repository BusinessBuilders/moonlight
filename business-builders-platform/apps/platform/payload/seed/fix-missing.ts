import { getPayload } from 'payload'
import config from '@payload-config'

async function fixMissingSeedData() {
  console.log('🔧 Fixing missing seed data...\n')

  const payload = await getPayload({ config })

  // Find the tenant
  const tenants = await payload.find({
    collection: 'tenants',
    where: { slug: { equals: 'moonlight-farm' } },
    limit: 1,
  })
  if (!tenants.docs[0]) {
    console.error('❌ Moonlight Farm tenant not found. Run the main seed first.')
    process.exit(1)
  }
  const tenantId = tenants.docs[0].id

  // ──────────────────────────────────────────────
  // Fix: Special Events service (category was 'events', should be 'special-events')
  // ──────────────────────────────────────────────
  console.log('Fixing Special Events service...')
  try {
    await payload.create({
      collection: 'services',
      data: {
        title: 'Special Events',
        slug: 'special-events',
        shortDescription:
          'Host your special occasion at Moonlight Run Farm or let us bring the experience to you. From intimate gatherings to large celebrations, we create memorable farm experiences for all ages.',
        category: 'special-events',
        pricingText: 'Custom pricing based on event needs',
        inquiryType: 'events',
        order: 7,
        tenant: tenantId,
      },
    })
    console.log('  ✓ Service: Special Events')
  } catch (err: unknown) {
    const e = err as { message?: string }
    console.log(`  ⚠ Special Events: ${e.message}`)
  }

  // ──────────────────────────────────────────────
  // Fix: Products (category values and price type were wrong)
  // Note: description is richText (Lexical), so we use shortDescription instead
  // ──────────────────────────────────────────────
  console.log('\nCreating fixed products...')
  const products = [
    {
      name: '100% Grass-Fed Highland Beef',
      slug: 'highland-beef',
      shortDescription:
        'Premium 100% grass-fed Highland beef from our own herd. Rich flavor, leaner than conventional beef, and raised without hormones or antibiotics. Available in custom cuts, quarter, half, or whole.',
      category: 'beef' as const,
      price: 'Contact for pricing',
      priceUnit: 'per lb',
      availability: 'available' as const,
      qualityBadges: ['grass-fed', 'no-antibiotics', 'no-hormones', 'no-steroids', 'pasture-raised', 'federally-inspected'],
      tenant: tenantId,
      order: 1,
    },
    {
      name: 'Pasture Raised Turkey',
      slug: 'pasture-turkey',
      shortDescription:
        'Heritage breed turkeys raised on pasture with supplemental organic feed. Available fresh for Thanksgiving — reserve early as they sell out quickly!',
      category: 'poultry' as const,
      price: 'Pre-order required',
      priceUnit: 'per lb',
      availability: 'seasonal' as const,
      seasonalNote: 'November only — reserve early!',
      qualityBadges: ['pasture-raised', 'no-hormones', 'no-antibiotics'],
      tenant: tenantId,
      order: 2,
    },
    {
      name: 'Pasture Raised Chicken',
      slug: 'pasture-chicken',
      shortDescription:
        'Pasture-raised chickens moved to fresh grass regularly. Supplemented with non-GMO feed. Processed fresh for maximum quality and flavor.',
      category: 'poultry' as const,
      price: 'Contact for pricing',
      priceUnit: 'per lb',
      availability: 'available' as const,
      qualityBadges: ['pasture-raised', 'no-hormones', 'no-antibiotics'],
      tenant: tenantId,
      order: 3,
    },
    {
      name: 'Farm Fresh Eggs',
      slug: 'farm-eggs',
      shortDescription:
        'Farm fresh eggs from our free-range chickens and geese. Rich, golden yolks from hens that forage on pasture daily. Chicken and goose eggs available.',
      category: 'eggs' as const,
      price: 'Contact for pricing',
      priceUnit: 'per dozen',
      availability: 'available' as const,
      qualityBadges: ['farm-fresh', 'pasture-raised'],
      tenant: tenantId,
      order: 4,
    },
    {
      name: 'Hay (Small Square & Round Bales)',
      slug: 'hay',
      shortDescription:
        'Quality hay available in small square bales and round bales. First and second cutting available. Great for livestock feed, bedding, and landscaping.',
      category: 'hay' as const,
      price: 'Contact for pricing',
      priceUnit: 'per bale',
      availability: 'seasonal' as const,
      seasonalNote: 'Available after cutting season',
      qualityBadges: [],
      tenant: tenantId,
      order: 5,
    },
    {
      name: 'Raw Fiber',
      slug: 'raw-fiber',
      shortDescription:
        'Raw fiber from our llamas, alpacas, and sheep. Perfect for hand-spinners, felters, and fiber artists. Unwashed and unprocessed — premium quality fleece.',
      category: 'fiber' as const,
      price: 'Contact for pricing',
      priceUnit: 'per lb',
      availability: 'seasonal' as const,
      seasonalNote: 'Available after spring shearing',
      qualityBadges: [],
      tenant: tenantId,
      order: 6,
    },
  ]

  for (const product of products) {
    try {
      // Check if it already exists (from the one that succeeded)
      const existing = await payload.find({
        collection: 'products',
        where: { slug: { equals: product.slug } },
        limit: 1,
      })
      if (existing.docs.length > 0) {
        console.log(`  ⏭ Product "${product.name}" already exists, skipping`)
        continue
      }
      await payload.create({ collection: 'products', data: product })
      console.log(`  ✓ Product: ${product.name}`)
    } catch (err: unknown) {
      const e = err as { message?: string }
      console.log(`  ⚠ Product "${product.name}": ${e.message}`)
    }
  }

  // ──────────────────────────────────────────────
  // Fix: Testimonials (source values were wrong case / invalid)
  // ──────────────────────────────────────────────
  console.log('\nCreating fixed testimonials...')
  const testimonials = [
    {
      author: 'Sarah M.',
      quote:
        "Moonlight Run Farm provided the most wonderful petting zoo for my daughter's birthday party. The kids were thrilled and the handlers were so patient and knowledgeable!",
      rating: 5,
      source: 'facebook' as const,
      featured: true,
      tenant: tenantId,
    },
    {
      author: 'Mike T.',
      quote:
        'Jesse transported our two horses safely and on time. Professional service from start to finish. Would highly recommend for any livestock hauling needs.',
      rating: 5,
      source: 'google' as const,
      featured: true,
      tenant: tenantId,
    },
    {
      author: 'Lisa R.',
      quote:
        "The Highland beef from Moonlight Run Farm is absolutely incredible. You can taste the difference when it's 100% grass-fed. Our whole family loves it!",
      rating: 5,
      source: 'direct' as const,
      featured: true,
      tenant: tenantId,
    },
  ]

  for (const testimonial of testimonials) {
    try {
      const existing = await payload.find({
        collection: 'testimonials',
        where: { author: { equals: testimonial.author } },
        limit: 1,
      })
      if (existing.docs.length > 0) {
        console.log(`  ⏭ Testimonial from "${testimonial.author}" already exists, skipping`)
        continue
      }
      await payload.create({ collection: 'testimonials', data: testimonial })
      console.log(`  ✓ Testimonial from: ${testimonial.author}`)
    } catch (err: unknown) {
      const e = err as { message?: string }
      console.log(`  ⚠ Testimonial "${testimonial.author}": ${e.message}`)
    }
  }

  console.log('\n✅ Fix complete!')
  process.exit(0)
}

fixMissingSeedData().catch((err) => {
  console.error('❌ Fix seed failed:', err)
  process.exit(1)
})
