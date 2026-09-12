import { defineField, defineType } from 'sanity'

export const testimonial = defineType({
  name: 'testimonial',
  title: 'Patient Testimonials & Reviews',
  type: 'document',
  fields: [
    defineField({
      name: 'patientName',
      title: 'Patient Name or Reference',
      type: 'string',
      placeholder: 'e.g., Eleanor Vance or E.R.',
      validation: (Rule) => Rule.required().error('Patient name or identifier is required.'),
    }),
    defineField({
      name: 'quote',
      title: 'Review / Testimonial Text',
      type: 'text',
      rows: 4,
      placeholder: 'Describe the patient experience, precision care, and results...',
      validation: (Rule) =>
        Rule.required().min(20).error('Please provide a meaningful testimonial (min 20 characters).'),
    }),
    defineField({
      name: 'rating',
      title: 'Rating (1–5 Stars)',
      type: 'number',
      initialValue: 5,
      validation: (Rule) =>
        Rule.required()
          .min(1)
          .max(5)
          .integer()
          .error('Rating must be an integer between 1 and 5.'),
    }),
    defineField({
      name: 'procedure',
      title: 'Dental Treatment / Procedure Category',
      type: 'string',
      placeholder: 'e.g., Porcelain Veneers, Full Mouth Rehabilitation, Dental Implants',
    }),
    defineField({
      name: 'caseStudyRef',
      title: 'Case Study Reference Code',
      type: 'string',
      placeholder: 'e.g., Reference Case 042',
      description: 'Optional tag linking this review to a published clinical case study.',
    }),
    defineField({
      name: 'verifiedPatient',
      title: 'Verified Patient Badge',
      type: 'boolean',
      initialValue: true,
      description: 'Displays a "Verified Patient" clinical verification badge.',
    }),
    defineField({
      name: 'isFeatured',
      title: 'Featured on Homepage',
      type: 'boolean',
      initialValue: true,
      description: 'Highlight this review in homepage carousel or hero trust sections.',
    }),
    defineField({
      name: 'order',
      title: 'Display Priority Order',
      type: 'number',
      initialValue: 1,
      description: 'Lower numbers appear first.',
    }),
    defineField({
      name: 'avatar',
      title: 'Patient Avatar / Portrait (Optional)',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
          initialValue: 'Patient portrait',
        },
      ],
    }),
  ],
  orderings: [
    {
      title: 'Display Priority',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
    {
      title: 'Highest Rating',
      name: 'ratingDesc',
      by: [{ field: 'rating', direction: 'desc' }],
    },
  ],
  preview: {
    select: {
      title: 'patientName',
      rating: 'rating',
      procedure: 'procedure',
      caseStudyRef: 'caseStudyRef',
      media: 'avatar',
      isFeatured: 'isFeatured',
    },
    prepare({ title, rating = 5, procedure, caseStudyRef, media, isFeatured }) {
      const stars = '★'.repeat(Math.max(1, Math.min(5, rating)))
      const meta = [procedure, caseStudyRef].filter(Boolean).join(' • ')
      return {
        title: `${title || 'Anonymous'} ${isFeatured ? '⭐' : ''}`,
        subtitle: `${stars} ${meta ? `| ${meta}` : ''}`,
        media,
      }
    },
  },
})
