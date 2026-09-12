import { defineField, defineType } from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site & Clinic Settings',
  type: 'document',
  fieldsets: [
    {
      name: 'clinicInfo',
      title: '🏥 Clinic Contact & Address',
      options: { collapsible: true, collapsed: false },
    },
    {
      name: 'heroSection',
      title: '🌟 Hero Banner & Landing',
      options: { collapsible: true, collapsed: false },
    },
    {
      name: 'doctorProfile',
      title: '👨‍⚕️ Head Surgeon / Doctor Bio',
      options: { collapsible: true, collapsed: false },
    },
    {
      name: 'socialChannels',
      title: '🌐 Social Media & Digital Channels',
      options: { collapsible: true, collapsed: false },
    },
  ],
  fields: [
    // ─── Clinic Contact & Info ──────────────────────────────────────
    defineField({
      name: 'clinicName',
      title: 'Clinic Name',
      type: 'string',
      fieldset: 'clinicInfo',
      initialValue: 'Dr. Hassan Dental Clinic & Surgery',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'emergencyPhone',
      title: 'Emergency Phone Hotline',
      type: 'string',
      fieldset: 'clinicInfo',
      description: 'Primary emergency dental contact number with country code.',
      placeholder: '+92 300 1234567',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'whatsappNumber',
      title: 'WhatsApp Booking Number',
      type: 'string',
      fieldset: 'clinicInfo',
      description: 'Digits only with country code (e.g., 923001234567) for direct WhatsApp appointment links.',
      placeholder: '923001234567',
      validation: (Rule) =>
        Rule.required()
          .regex(/^[0-9+ ]+$/, { name: 'phone' })
          .error('Please enter a valid phone number with country code.'),
    }),
    defineField({
      name: 'email',
      title: 'Clinic Inquiries Email (Public)',
      type: 'string',
      fieldset: 'clinicInfo',
      description: 'Public patient inquiries email displayed on the contact page and footer.',
      validation: (Rule) => Rule.email(),
    }),
    defineField({
      name: 'notificationEmail',
      title: 'Booking & Alerts Notification Email (Sender Target)',
      type: 'string',
      fieldset: 'clinicInfo',
      description: 'Internal clinic email destination that receives appointment booking submissions.',
      placeholder: 'hassandent18@gmail.com',
      validation: (Rule) => Rule.email(),
    }),
    // ─── Social Media & Channels ────────────────────────────────────
    defineField({
      name: 'instagramUrl',
      title: 'Instagram Profile URL',
      type: 'url',
      fieldset: 'socialChannels',
      placeholder: 'https://www.instagram.com/im.hassanbds/',
    }),
    defineField({
      name: 'facebookUrl',
      title: 'Facebook Page URL',
      type: 'url',
      fieldset: 'socialChannels',
      placeholder: 'https://www.facebook.com/people/Dr-Hassan/100095052914472/',
    }),
    defineField({
      name: 'linkedinUrl',
      title: 'LinkedIn Profile URL',
      type: 'url',
      fieldset: 'socialChannels',
      placeholder: 'https://www.linkedin.com/in/muhammad-hassan-bds-13b85a1b7',
    }),
    defineField({
      name: 'youtubeUrl',
      title: 'YouTube Channel URL',
      type: 'url',
      fieldset: 'socialChannels',
      placeholder: 'https://www.youtube.com/@drhassansalman',
    }),
    defineField({
      name: 'address',
      title: 'Clinic Physical Address',
      type: 'text',
      fieldset: 'clinicInfo',
      rows: 3,
      description: 'Complete clinic location for patient directions.',
      placeholder: 'Suite #, Dental Plaza, Main Boulevard...',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'googleMapsUrl',
      title: 'Google Maps Location Link',
      type: 'url',
      fieldset: 'clinicInfo',
      description: 'Direct Google Maps direction URL for patients.',
    }),
    defineField({
      name: 'workingHours',
      title: 'Clinic Operating Hours',
      type: 'array',
      fieldset: 'clinicInfo',
      description: 'Weekly schedule displayed in the header, footer, and contact section.',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'days',
              title: 'Days Range',
              type: 'string',
              placeholder: 'e.g., Mon - Fri or Saturday',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'hours',
              title: 'Timings',
              type: 'string',
              placeholder: 'e.g., 10:00 AM - 09:00 PM',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'isClosed',
              title: 'Closed Today',
              type: 'boolean',
              initialValue: false,
            },
          ],
          preview: {
            select: {
              title: 'days',
              hours: 'hours',
              isClosed: 'isClosed',
            },
            prepare({ title, hours, isClosed }) {
              return {
                title,
                subtitle: isClosed ? '🔴 Closed' : `🟢 ${hours || 'Open'}`,
              }
            },
          },
        },
      ],
    }),

    // ─── Hero Section ──────────────────────────────────────────────
    defineField({
      name: 'heroHeadline',
      title: 'Hero Main Headline',
      type: 'string',
      fieldset: 'heroSection',
      description: 'Main impact statement visible on the homepage.',
      placeholder: 'Precision Dental Surgery & Smile Aesthetics',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heroSubheadline',
      title: 'Hero Subheadline / Tagline',
      type: 'text',
      fieldset: 'heroSection',
      rows: 2,
      placeholder: 'Experience pain-free dental care backed by advanced diagnostic 3D imaging and specialized surgical expertise.',
    }),
    defineField({
      name: 'heroBannerImage',
      title: 'Hero Banner Image',
      type: 'image',
      fieldset: 'heroSection',
      description: 'High-res dental clinic or procedural photograph with focal hotspot cropping.',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
          description: 'Required description for screen readers and SEO.',
          validation: (Rule) =>
            Rule.required().error('Hero banner requires an accessible alt text description.'),
        },
      ],
      validation: (Rule) => Rule.required().error('Hero banner image is required.'),
    }),

    // ─── Doctor Bio & Portrait ─────────────────────────────────────
    defineField({
      name: 'doctorName',
      title: 'Doctor Full Name & Title',
      type: 'string',
      fieldset: 'doctorProfile',
      initialValue: 'Dr. Hassan Salman',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'doctorQualifications',
      title: 'Doctor Qualifications / Accreditations',
      type: 'string',
      fieldset: 'doctorProfile',
      initialValue: 'B.D.S., R.D.S. (Consultant Dental Surgeon)',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'doctorBio',
      title: 'Doctor Biography / Introduction',
      type: 'text',
      fieldset: 'doctorProfile',
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'doctorPortrait',
      title: 'Doctor Portrait Photograph',
      type: 'image',
      fieldset: 'doctorProfile',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
          description: 'Describe the doctor photo for accessibility.',
          validation: (Rule) =>
            Rule.required().error('Doctor portrait requires an accessible alt text description.'),
        },
      ],
      validation: (Rule) => Rule.required().error('Doctor portrait photograph is required.'),
    }),
  ],
  preview: {
    select: {
      title: 'clinicName',
      subtitle: 'emergencyPhone',
      media: 'heroBannerImage',
    },
  },
})
