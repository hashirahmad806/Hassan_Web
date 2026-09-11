import { defineField, defineType } from 'sanity'

export const author = defineType({
  name: 'author',
  title: 'Doctor / Author',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Full Name',
      type: 'string',
      description: 'e.g., Dr. Hassan Salman',
      validation: (Rule) => Rule.required().error('Author name is required.'),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'credentials',
      title: 'Medical Qualifications',
      type: 'string',
      description: 'e.g., BDS, RDS, Dental Surgeon, Implantologist',
      placeholder: 'BDS, RDS (Consultant Dental Surgeon)',
    }),
    defineField({
      name: 'image',
      title: 'Doctor Portrait Photo',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
          description: 'e.g., Dr. Hassan Salman BDS portrait',
          validation: (Rule) =>
            Rule.required().error('Doctor portrait requires an alt-text description.'),
        },
      ],
      validation: (Rule) => Rule.required().error('Doctor portrait is required.'),
    }),
    defineField({
      name: 'bio',
      title: 'Biography / Professional Summary',
      type: 'text',
      rows: 4,
      description: 'Brief overview of medical background and surgical expertise.',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'credentials',
      media: 'image',
    },
  },
})
