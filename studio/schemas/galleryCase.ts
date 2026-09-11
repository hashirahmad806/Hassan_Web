import { defineField, defineType } from 'sanity'

export const galleryCase = defineType({
  name: 'galleryCase',
  title: 'Smile Transformation (Case Study)',
  type: 'document',
  fields: [
    defineField({
      name: 'caseTitle',
      title: 'Transformation Title',
      type: 'string',
      description: 'e.g., Full Arch Porcelain Veneers Makeover, Invisalign Smile Alignment',
      placeholder: 'Porcelain Veneers - Upper Arch Smile Restoration',
      validation: (Rule) => Rule.required().error('Transformation title is required.'),
    }),
    defineField({
      name: 'procedureCategory',
      title: 'Procedure Category',
      type: 'string',
      options: {
        list: [
          { title: '✨ Porcelain Veneers & Lumineers', value: 'veneers' },
          { title: '💎 Professional Teeth Whitening', value: 'whitening' },
          { title: '📐 Clear Aligners & Orthodontics', value: 'aligners' },
          { title: '🔩 Dental Implants Restoration', value: 'implants' },
          { title: '🦷 Composite Edge Bonding', value: 'composite-bonding' },
          { title: '👑 Crown & Bridge Work', value: 'crowns' },
          { title: '🌟 Full Mouth Smile Makeover', value: 'full-mouth' },
        ],
      },
      validation: (Rule) => Rule.required().error('Procedure category is required.'),
    }),
    defineField({
      name: 'beforeImage',
      title: 'Before Photo (Pre-Treatment)',
      type: 'image',
      description: 'High-resolution pre-op intraoral or smile photograph.',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
          description: 'Required description: e.g., Pre-operative view of discolored incisors',
          validation: (Rule) =>
            Rule.required().error('Before photo requires an accessible alt text description.'),
        },
      ],
      validation: (Rule) => Rule.required().error('Before treatment image is required.'),
    }),
    defineField({
      name: 'afterImage',
      title: 'After Photo (Post-Treatment)',
      type: 'image',
      description: 'High-resolution final result photograph with matching angle and lighting.',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
          description: 'Required description: e.g., Final completed smile restoration with porcelain veneers',
          validation: (Rule) =>
            Rule.required().error('After photo requires an accessible alt text description.'),
        },
      ],
      validation: (Rule) => Rule.required().error('After treatment image is required.'),
    }),
    defineField({
      name: 'duration',
      title: 'Procedure Duration / Visits',
      type: 'string',
      description: 'e.g., "2 Visits (10 Days)", "4 Months Invisalign Treatment", "Single 90-min Session"',
      placeholder: '2 Visits over 10 Days',
    }),
    defineField({
      name: 'notes',
      title: 'Clinical Notes / Treatment Summary',
      type: 'text',
      rows: 3,
      description: 'Brief description of the patient’s initial concern and the surgical/aesthetic solution provided.',
      placeholder: 'Patient presented with severe enamel fluorosis and spacing. Treated with minimal-prep porcelain veneers.',
    }),
    defineField({
      name: 'relatedService',
      title: 'Related Service (Optional)',
      type: 'reference',
      to: [{ type: 'service' }],
      description: 'Connect this transformation to the corresponding service page.',
    }),
    defineField({
      name: 'isFeatured',
      title: 'Feature on Homepage Gallery',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'caseTitle',
      subtitle: 'procedureCategory',
      media: 'afterImage',
    },
    prepare({ title, subtitle, media }) {
      return {
        title: title || 'Untitled Transformation',
        subtitle: `✨ ${subtitle || 'General'}`,
        media,
      }
    },
  },
})
