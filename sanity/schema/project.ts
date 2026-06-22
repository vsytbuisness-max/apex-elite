import { defineField, defineType } from 'sanity'

export const projectType = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Custom Home Build', value: 'Custom Home Build' },
          { title: 'Kitchen Remodel', value: 'Kitchen Remodel' },
          { title: 'Bathroom Design', value: 'Bathroom Design' },
          { title: 'Renovation', value: 'Renovation' },
          { title: 'Architectural Design', value: 'Architectural Design' },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'clientName',
      title: 'Client Name',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'span',
      title: 'Grid Span',
      type: 'string',
      description: 'Tailwind CSS classes for masonry grid spanning (e.g. col-span-1 row-span-1, col-span-1 md:col-span-2 row-span-2)',
      initialValue: 'col-span-1 row-span-1',
    }),
  ],
})
