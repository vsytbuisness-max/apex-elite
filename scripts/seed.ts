import { createClient } from '@sanity/client';

// NOTE: You must provide a valid SANITY_API_TOKEN with 'Editor' permissions
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '9lvkqifv',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
});

async function seedData() {
  console.log('Starting data migration to Sanity...');
  if (!process.env.SANITY_API_TOKEN) {
    console.error('ERROR: Missing SANITY_API_TOKEN environment variable.');
    process.exit(1);
  }

  try {
    // 1. Seed Site Settings (Home Page)
    console.log('Seeding siteSettings...');
    await client.createOrReplace({
      _id: 'siteSettings',
      _type: 'siteSettings',
      heroHeadline: 'Architectural Perfection Engineered For You.',
      heroSubtext: 'Award-winning luxury remodeling and custom home builds. We transform visionary concepts into structural masterpieces.',
      contactPhone: '1-800-LUX-BUILD',
      metaTitle: 'Apex Elite Remodeling | Luxury Construction',
      metaDescription: 'Award-winning luxury remodeling and custom home builds.',
    });

    // 2. Seed Portfolio Page
    console.log('Seeding portfolioPage...');
    await client.createOrReplace({
      _id: 'portfolioPage',
      _type: 'portfolioPage',
      pageTitle: 'Our Masterpieces.',
      pageSubtitle: 'Explore our curated gallery of custom home builds, luxury kitchen renovations, and architectural bathroom designs.',
      metaTitle: 'Portfolio | Apex Elite',
      metaDescription: 'Explore our luxury remodeling projects.',
    });

    // 3. Seed Insights Page
    console.log('Seeding insightsPage...');
    await client.createOrReplace({
      _id: 'insightsPage',
      _type: 'insightsPage',
      pageTitle: 'Industry Insights.',
      pageSubtitle: 'Expert perspectives on modern architecture, luxury home trends, and the future of residential construction.',
      metaTitle: 'Insights | Apex Elite',
      metaDescription: 'Read the latest trends in luxury home building.',
    });

    // 4. Seed Projects
    console.log('Seeding projects...');
    const projects = [
      {
        _type: 'project',
        title: 'The Horizon Estate',
        slug: { current: 'the-horizon-estate' },
        category: 'Custom Home Build',
        description: 'The Horizon Estate - $2.5M Build - 14 Months. A cantilevered modern masterpiece featuring floor-to-ceiling glass and smart-home integration.',
        span: 'col-span-1 md:col-span-2 row-span-2',
      },
      {
        _type: 'project',
        title: 'Oak Creek Villa',
        slug: { current: 'oak-creek-villa' },
        category: 'Renovation',
        description: 'Oak Creek Villa - $850K Renovation - 6 Months. Complete interior gut and remodel focusing on organic textures and warm lighting.',
        span: 'col-span-1 row-span-1',
      },
      {
        _type: 'project',
        title: 'Summit Modern',
        slug: { current: 'summit-modern' },
        category: 'Architectural Design',
        description: 'Summit Modern - $4.2M Build - 18 Months. Geometric precision set against a mountainous backdrop with infinity pool.',
        span: 'col-span-1 row-span-1',
      },
      {
        _type: 'project',
        title: 'Culinary Haven',
        slug: { current: 'culinary-haven' },
        category: 'Kitchen Remodel',
        description: 'Culinary Haven - $150K Remodel - 8 Weeks. A chef\'s dream with double islands and custom Italian cabinetry.',
        span: 'col-span-1 md:col-span-2 row-span-1',
      },
      {
        _type: 'project',
        title: 'Urban Glasshouse',
        slug: { current: 'urban-glasshouse' },
        category: 'Custom Home Build',
        description: 'Urban Glasshouse - $1.8M Build - 11 Months. Industrial chic meets luxury in the heart of the city.',
        span: 'col-span-1 row-span-1',
      },
    ];

    for (const project of projects) {
      await client.create(project);
    }

    // 5. Seed Blog Posts
    console.log('Seeding posts...');
    const posts = [
      {
        _type: 'post',
        title: 'The 2025 Guide to Open-Concept Luxury Kitchens',
        slug: { current: '2025-guide-open-concept-kitchens' },
        category: 'Design Trends',
        excerpt: 'Discover the latest in high-end culinary spaces, from hidden pantries to dramatic marble waterfall islands.',
        publishedAt: '2025-10-12T00:00:00Z',
      },
      {
        _type: 'post',
        title: 'Integrating Smart Tech into Historic Home Renovations',
        slug: { current: 'smart-tech-historic-renovations' },
        category: 'Architecture',
        excerpt: 'How to preserve architectural integrity while weaving in state-of-the-art automation and climate control.',
        publishedAt: '2025-09-28T00:00:00Z',
      },
      {
        _type: 'post',
        title: 'The Rise of the Spa-Inspired Master En-Suite',
        slug: { current: 'spa-inspired-master-ensuite' },
        category: 'Bathroom Design',
        excerpt: 'Transforming standard bathrooms into personal wellness retreats using organic textures and European fixtures.',
        publishedAt: '2025-09-15T00:00:00Z',
      },
    ];

    for (const post of posts) {
      await client.create(post);
    }

    console.log('Migration complete! Check your Sanity Studio.');
  } catch (err) {
    console.error('Migration failed:', err);
  }
}

seedData();
