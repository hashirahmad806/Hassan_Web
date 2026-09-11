import { defineArrayMember, defineField, defineType } from 'sanity'

export const post = defineType({
  name: 'post',
  title: 'Blog Article / Patient Education',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Article Title',
      type: 'string',
      description: 'e.g., 5 Signs You Need a Root Canal Before It Causes Severe Pain',
      validation: (Rule) => Rule.required().error('Article title is required.'),
    }),
    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required().error('Slug is required to generate the article URL.'),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Publication Date',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'author',
      title: 'Author / Medical Reviewer',
      type: 'reference',
      to: [{ type: 'author' }],
      description: 'Select the dental surgeon who authored or verified this article.',
      validation: (Rule) => Rule.required().error('Author reference is required.'),
    }),
    defineField({
      name: 'coverImage',
      title: 'Article Cover Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
          description: 'Required description for accessibility.',
          validation: (Rule) =>
            Rule.required().error('Article cover image requires an accessible alt text description.'),
        },
      ],
      validation: (Rule) => Rule.required().error('Cover image is required.'),
    }),
    defineField({
      name: 'category',
      title: 'Dental Category / Topic',
      type: 'string',
      options: {
        list: [
          { title: '🦷 Oral Hygiene & Daily Care', value: 'hygiene' },
          { title: '✨ Cosmetic Dentistry & Whitening', value: 'cosmetic' },
          { title: '🔩 Dental Implants & Surgery Tips', value: 'implants' },
          { title: '👶 Kids Dental Health (Pediatric)', value: 'pediatric' },
          { title: '⚠️ Emergency Dental Advice', value: 'emergency' },
          { title: '📐 Braces & Aligners Guide', value: 'orthodontics' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tags',
      title: 'Tags / Keywords',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      name: 'readTimeMinutes',
      title: 'Estimated Read Time (Minutes)',
      type: 'number',
      initialValue: 4,
      validation: (Rule) => Rule.min(1).max(60),
    }),
    defineField({
      name: 'excerpt',
      title: 'Article Excerpt / Teaser',
      type: 'text',
      rows: 3,
      description: 'Short introduction displayed on the blog archive and social shares (100-200 chars).',
      validation: (Rule) =>
        Rule.required()
          .max(220)
          .warning('Keep excerpts under 200 characters for optimal card layouts.')
          .error('Excerpt cannot exceed 220 characters.'),
    }),
    defineField({
      name: 'body',
      title: 'Article Body (Rich Text)',
      type: 'blockContent',
      description: 'Comprehensive dental education content with formatted headings, tips, and images.',
      validation: (Rule) => Rule.required().error('Article content is required.'),
    }),
  ],
  orderings: [
    {
      title: 'Publication Date, New',
      name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'coverImage',
      date: 'publishedAt',
    },
    prepare({ title, author, media, date }) {
      const formattedDate = date ? new Date(date).toLocaleDateString() : 'Draft'
      return {
        title: title || 'Untitled Article',
        subtitle: `${author ? `By ${author} • ` : ''}${formattedDate}`,
        media,
      }
    },
  },
})
