import { defineArrayMember, defineType } from 'sanity'

export const blockContent = defineType({
  title: 'Block Content',
  name: 'blockContent',
  type: 'array',
  of: [
    defineArrayMember({
      title: 'Block',
      type: 'block',
      styles: [
        { title: 'Normal', value: 'normal' },
        { title: 'Heading 2', value: 'h2' },
        { title: 'Heading 3', value: 'h3' },
        { title: 'Heading 4', value: 'h4' },
        { title: 'Quote', value: 'blockquote' },
      ],
      lists: [
        { title: 'Bullet', value: 'bullet' },
        { title: 'Numbered', value: 'number' },
      ],
      marks: {
        decorators: [
          { title: 'Strong', value: 'strong' },
          { title: 'Emphasis', value: 'em' },
          { title: 'Underline', value: 'underline' },
        ],
        annotations: [
          {
            title: 'URL',
            name: 'link',
            type: 'object',
            fields: [
              {
                title: 'URL',
                name: 'href',
                type: 'url',
                validation: (Rule) =>
                  Rule.uri({
                    scheme: ['http', 'https', 'mailto', 'tel'],
                  }),
              },
              {
                title: 'Open in new tab',
                name: 'blank',
                type: 'boolean',
                initialValue: true,
              },
            ],
          },
        ],
      },
    }),
    defineArrayMember({
      type: 'image',
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
          description: 'Crucial for accessibility and SEO. Describe what is visible in the dental photo.',
          validation: (Rule) =>
            Rule.required().error('Alt text is required for clinical and educational images.'),
        },
        {
          name: 'caption',
          type: 'string',
          title: 'Caption / Figure Note',
        },
      ],
    }),
    defineArrayMember({
      name: 'dentalCallout',
      title: 'Clinical Callout / Tip Box',
      type: 'object',
      fields: [
        {
          name: 'type',
          title: 'Callout Type',
          type: 'string',
          options: {
            list: [
              { title: '💡 Surgeon Tip', value: 'tip' },
              { title: '⚠️ Important Pre/Post-Op Precaution', value: 'warning' },
              { title: '🩺 Clinical Note', value: 'info' },
              { title: '🦷 Hygiene Reminder', value: 'hygiene' },
            ],
            layout: 'radio',
          },
          initialValue: 'tip',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'title',
          title: 'Callout Title',
          type: 'string',
          placeholder: 'e.g., Post-Extraction Care Instructions',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'message',
          title: 'Message',
          type: 'text',
          rows: 3,
          validation: (Rule) => Rule.required(),
        },
      ],
      preview: {
        select: {
          title: 'title',
          subtitle: 'type',
          content: 'message',
        },
        prepare({ title, subtitle, content }) {
          const typeIcons: Record<string, string> = {
            tip: '💡',
            warning: '⚠️',
            info: '🩺',
            hygiene: '🦷',
          }
          const icon = subtitle ? typeIcons[subtitle] || '📝' : '📝'
          return {
            title: `${icon} ${title || 'Callout'}`,
            subtitle: content,
          }
        },
      },
    }),
  ],
})
