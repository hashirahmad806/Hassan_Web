import { defineField, defineType } from 'sanity'

export const academicHonor = defineType({
  name: 'academicHonor',
  title: 'BDS Honors & Academic Distinction',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Honor / Degree / Distinction Title',
      type: 'string',
      description: 'e.g., Bachelor of Dental Surgery (BDS) - Magna Cum Laude',
      validation: (Rule) => Rule.required().error('Title is required.'),
    }),
    defineField({
      name: 'awardType',
      title: 'Type of Distinction',
      type: 'string',
      options: {
        list: [
          { title: 'Gold Medal / First Position', value: 'gold-medal' },
          { title: 'BDS Degree & Academic Honors', value: 'degree' },
          { title: 'Clinical Distinction (Surgery / Prosthodontics)', value: 'clinical-distinction' },
          { title: 'Fellowship & Professional Membership', value: 'fellowship' },
          { title: 'Best Scientific Presentation Award', value: 'presentation-award' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'institution',
      title: 'Awarding University / Medical Institution / Board',
      type: 'string',
      description: 'e.g., Khyber College of Dentistry (KCD) / Khyber Medical University',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'year',
      title: 'Year Conferred',
      type: 'string',
      description: 'e.g., 2023',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'citation',
      title: 'Citation / Citation Summary',
      type: 'text',
      rows: 3,
      description: 'Details of the distinction, criteria, or notable milestone.',
    }),
    defineField({
      name: 'credentialDoc',
      title: 'Certificate or Seal Document / Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alt text',
        },
      ],
    }),
    defineField({
      name: 'order',
      title: 'Display Priority Order',
      type: 'number',
      initialValue: 0,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'institution',
      year: 'year',
    },
    prepare({ title, subtitle, year }) {
      return {
        title,
        subtitle: `${year ? `(${year}) ` : ''}${subtitle ?? ''}`,
      }
    },
  },
})
