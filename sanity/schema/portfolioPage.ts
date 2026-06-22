import { defineField, defineType } from 'sanity'

export const portfolioPageType = defineType({
  name: 'portfolioPage',
  title: 'Portfolio Page Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'pageTitle',
      title: 'Page Title',
      type: 'string',
      description: 'The main heading on the portfolio page.',
    }),
    defineField({
      name: 'pageSubtitle',
      title: 'Page Subtitle',
      type: 'text',
      description: 'The subtext under the main heading.',
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
