import { defineField, defineType } from 'sanity'

export const scholarlyWork = defineType({
  name: 'scholarlyWork',
  title: 'Scholarly Publication',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Paper / Publication Title',
      type: 'string',
      description: 'e.g., Clinical Longevity of Ultra-Thin Ceramic Laminate Veneers in Anterior Aesthetic Rehabilitation',
      validation: (Rule) => Rule.required().error('Paper title is required.'),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'journal',
      title: 'Journal / Publisher / Conference',
      type: 'string',
      description: 'e.g., International Journal of Esthetic Dentistry (IJED)',
      validation: (Rule) => Rule.required().error('Journal or publishing body is required.'),
    }),
    defineField({
      name: 'publicationDate',
      title: 'Publication Date',
      type: 'date',
      options: {
        dateFormat: 'YYYY-MM-DD',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'year',
      title: 'Publication Year',
      type: 'string',
      description: 'e.g., 2025',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Research Category / Domain',
      type: 'string',
      options: {
        list: [
          { title: 'Pediatric & Preventive Dentistry', value: 'pediatric-preventive' },
          { title: 'Orthodontics & Malocclusion Diagnosis', value: 'orthodontics' },
          { title: 'Behavioral Dentistry & Patient Care', value: 'behavioral-dentistry' },
          { title: 'Aesthetic Dentistry & Smile Design', value: 'aesthetic' },
          { title: 'Biomimetic Restorative Dentistry', value: 'biomimetic' },
          { title: 'Oral & Maxillofacial Surgery', value: 'oral-surgery' },
          { title: 'Prosthodontics & Rehabilitation', value: 'prosthodontics' },
          { title: 'Implantology & Bone Regeneration', value: 'implantology' },
          { title: 'Clinical Case Series', value: 'clinical-case' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'authors',
      title: 'Authors & Contributors',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'List authors in order of contribution. e.g., Dr. Hassan Salman (Lead Author), Dr. Tariq Mahmood',
      validation: (Rule) => Rule.required().min(1).error('At least one author must be specified.'),
    }),
    defineField({
      name: 'abstract',
      title: 'Abstract',
      type: 'text',
      rows: 6,
      description: 'Summary of the clinical study, objectives, methodology, and conclusions.',
      validation: (Rule) => Rule.required().error('Abstract is required.'),
    }),
    defineField({
      name: 'doi',
      title: 'DOI / PubMed Link or Identifier',
      type: 'url',
      description: 'https://doi.org/... or PubMed URL',
    }),
    defineField({
      name: 'pdfFile',
      title: 'Research Paper PDF Document',
      type: 'file',
      options: {
        accept: '.pdf',
      },
      description: 'Upload the full peer-reviewed paper or clinical reprint (PDF).',
    }),
    defineField({
      name: 'citations',
      title: 'Pre-formatted Citation (APA / BibTeX)',
      type: 'object',
      fields: [
        {
          name: 'apa',
          title: 'APA Citation',
          type: 'text',
          rows: 2,
        },
        {
          name: 'bibtex',
          title: 'BibTeX Citation',
          type: 'text',
          rows: 4,
        },
        {
          name: 'harvard',
          title: 'Harvard Citation',
          type: 'text',
          rows: 2,
        },
      ],
    }),
    defineField({
      name: 'isFeatured',
      title: 'Feature as Spotlight Research',
      type: 'boolean',
      initialValue: false,
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
      subtitle: 'journal',
      year: 'year',
    },
    prepare({ title, subtitle, year }) {
      return {
        title,
        subtitle: `${year ? `[${year}] ` : ''}${subtitle ?? ''}`,
      }
    },
  },
})
