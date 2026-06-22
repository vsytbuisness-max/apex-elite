import { defineField, defineType } from 'sanity'

export const siteSettingsType = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'heroHeadline',
      title: 'Hero Headline',
      type: 'string',
    }),
    defineField({
      name: 'heroSubtext',
      title: 'Hero Subtext',
      type: 'string',
    }),
    defineField({
      name: 'contactPhone',
      title: 'Contact Phone Number',
      type: 'string',
    }),
    defineField({
      name: 'metaTitle',
      title: 'Global SEO Title',
      type: 'string',
      description: 'Default title for the whole site if a page does not have one.',
    }),
    defineField({
      name: 'metaDescription',
      title: 'Global SEO Description',
      type: 'text',
      description: 'Default description for the whole site.',
    }),
  ],
})
