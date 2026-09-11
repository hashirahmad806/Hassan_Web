import type { StructureResolver } from 'sanity/structure'

/**
 * Custom Desk Structure for Dr. Hassan BDS Clinic
 * - Implements strict Singleton for 'siteSettings' to prevent duplicate creation.
 * - Groups clinical workflows into intuitive sections for dental clinic staff.
 */
export const deskStructure: StructureResolver = (S) =>
  S.list()
    .title('Dr. Hassan BDS - Dental Studio')
    .items([
      // ─── Singleton: Site Settings ─────────────────────────────────
      S.listItem()
        .title('🏥 Site & Clinic Settings')
        .child(
          S.document()
            .schemaType('siteSettings')
            .documentId('siteSettings')
            .title('Site Settings & Clinic Profile')
        ),

      S.divider(),

      // ─── Clinical Services ─────────────────────────────────────────
      S.listItem()
        .title('🩺 Clinical Services')
        .child(
          S.documentTypeList('service')
            .title('Dental Procedures & Services')
            .defaultOrdering([{ field: 'order', direction: 'asc' }])
        ),

      // ─── Smile Transformations (Gallery) ───────────────────────────
      S.listItem()
        .title('✨ Smile Transformations')
        .child(
          S.documentTypeList('galleryCase')
            .title('Before & After Patient Cases')
        ),

      // ─── Patient Education & Blogs ─────────────────────────────────
      S.listItem()
        .title('📚 Patient Education (Blog)')
        .child(
          S.list()
            .title('Patient Education & Articles')
            .items([
              S.listItem()
                .title('📝 Dental Health Articles')
                .child(
                  S.documentTypeList('post')
                    .title('All Published Articles')
                    .defaultOrdering([{ field: 'publishedAt', direction: 'desc' }])
                ),
              S.listItem()
                .title('👨‍⚕️ Doctors & Medical Reviewers')
                .child(
                  S.documentTypeList('author')
                    .title('Doctor Profiles')
                ),
            ])
        ),

      // ─── Filter Out Managed Types from Default List ───────────────
      ...S.documentTypeListItems().filter(
        (listItem) =>
          !['siteSettings', 'service', 'galleryCase', 'post', 'author'].includes(
            listItem.getId() || ''
          )
      ),
    ])
