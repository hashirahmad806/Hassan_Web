import { defineArrayMember, defineField, defineType } from 'sanity'

export const service = defineType({
  name: 'service',
  title: 'Clinical Service',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Service Title',
      type: 'string',
      description: 'e.g., Dental Implants, Porcelain Veneers, Root Canal Therapy',
      validation: (Rule) => Rule.required().error('Service title is required.'),
    }),
    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      description: 'The unique URL segment for this clinical service page.',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required().error('Slug is required to generate the service URL.'),
    }),
    defineField({
      name: 'category',
      title: 'Dental Category',
      type: 'string',
      options: {
        list: [
          { title: '🦷 General & Preventive Dentistry', value: 'general' },
          { title: '✨ Cosmetic Dentistry & Smile Makeovers', value: 'cosmetic' },
          { title: '🔩 Dental Implants & Oral Surgery', value: 'implants' },
          { title: '📐 Orthodontics & Clear Aligners', value: 'orthodontics' },
          { title: '🩺 Endodontics (Root Canal Therapy)', value: 'root-canal' },
          { title: '👶 Pediatric Dentistry (Kids Care)', value: 'pediatric' },
          { title: '💎 Teeth Whitening & Polishing', value: 'whitening' },
        ],
      },
      validation: (Rule) => Rule.required().error('Procedure category is required.'),
    }),
    defineField({
      name: 'shortSummary',
      title: 'Short Summary (SEO & Card Excerpt)',
      type: 'text',
      rows: 2,
      description: 'Brief, patient-friendly summary for cards and search results (Strictly maximum 160 characters).',
      validation: (Rule) =>
        Rule.required()
          .max(160)
          .warning('Keep summary under 160 characters for optimal mobile cards and SEO meta snippets.')
          .error('Summary cannot exceed 160 characters.'),
    }),
    defineField({
      name: 'coverImage',
      title: 'Service Cover Image',
      type: 'image',
      description: 'Clinical or illustrative photo representing this procedure with focal crop.',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
          description: 'Required description for clinical context and web accessibility.',
          validation: (Rule) =>
            Rule.required().error('Cover image requires an accessible alt text description.'),
        },
      ],
      validation: (Rule) => Rule.required().error('Cover image is required.'),
    }),
    defineField({
      name: 'pricingNote',
      title: 'Pricing / Fee Note',
      type: 'string',
      description: 'e.g., "Starting from PKR 15,000" or "Complimentary Assessment"',
      placeholder: 'Transparent pricing guidance for patients',
    }),
    defineField({
      name: 'keyHighlights',
      title: 'Key Procedure Highlights / Features',
      type: 'array',
      description: 'Quick bullet points shown on cards and service overview.',
      of: [defineArrayMember({ type: 'string' })],
    }),
    defineField({
      name: 'body',
      title: 'Detailed Clinical Description',
      type: 'blockContent',
      description: 'Comprehensive guide covering the treatment process, recovery, benefits, and FAQ.',
    }),
    defineField({
      name: 'order',
      title: 'Display Priority / Order',
      type: 'number',
      description: 'Lower numbers appear first on the services grid (e.g. 1, 2, 3).',
      initialValue: 10,
    }),
  ],
  orderings: [
    {
      title: 'Display Order (Ascending)',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
    {
      title: 'Title (A-Z)',
      name: 'titleAsc',
      by: [{ field: 'title', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'category',
      media: 'coverImage',
    },
  },
})
