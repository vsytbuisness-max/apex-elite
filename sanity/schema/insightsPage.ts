import { defineField, defineType } from 'sanity'

export const insightsPageType = defineType({
  name: 'insightsPage',
  title: 'Insights Page Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'pageTitle',
      title: 'Page Title',
      type: 'string',
    }),
    defineField({
      name: 'pageSubtitle',
      title: 'Page Subtitle',
      type: 'text',
    }),
    defineField({
      name: 'metaTitle',
      title: 'SEO Title',
      type: 'string',
    }),
    defineField({
      name: 'metaDescription',
      title: 'SEO Description',
      type: 'text',
    }),
  ],
})
