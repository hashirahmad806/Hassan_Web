import type { StructureResolver } from 'sanity/structure'

/**
 * Custom Desk Structure for Dr. Hassan Dental Surgeon - Clinic Studio
 *
 * Clinical Architecture:
 * - Strict Singleton for 'siteSettings' (prevents accidental duplicate settings).
 * - Smile Transformations organized by Featured and Treatment Categories.
 * - Clinical Services organized with Quick Filter Lists (Cosmetic, Implants, Orthodontics, General).
 * - Patient Social Proof organized by Featured, All Reviews, 5-Star Reviews, and Verified Status.
 * - Patient Education & Doctor Bios.
 */
export const deskStructure: StructureResolver = (S) =>
  S.list()
    .title('Clinical Studio')
    .items([
      // ─── 1. Clinic Settings & Profile (Singleton) ─────────────────
      S.listItem()
        .title('🏥 Clinic Profile & Settings')
        .child(
          S.document()
            .schemaType('siteSettings')
            .documentId('siteSettings')
            .title('Master Clinic Profile & Contact Details')
        ),

      S.divider(),

      // ─── 2. Smile Transformations (Gallery) ───────────────────────
      S.listItem()
        .title('✨ Smile Transformations')
        .child(
          S.list()
            .title('Smile Transformations Portfolio')
            .items([
              S.listItem()
                .title('🌟 Featured on Homepage')
                .child(
                  S.documentList()
                    .title('Homepage Featured Cases')
                    .filter('_type == "galleryCase" && isFeatured == true')
                ),
              S.listItem()
                .title('📁 All Patient Cases')
                .child(
                  S.documentTypeList('galleryCase')
                    .title('All Transformations')
                ),
              S.divider(),
              S.listItem()
                .title('✨ Porcelain Veneers & Lumineers')
                .child(
                  S.documentList()
                    .title('Veneers Cases')
                    .filter('_type == "galleryCase" && procedureCategory == "veneers"')
                ),
              S.listItem()
                .title('📐 Clear Aligners & Orthodontics')
                .child(
                  S.documentList()
                    .title('Aligner Cases')
                    .filter('_type == "galleryCase" && procedureCategory == "aligners"')
                ),
              S.listItem()
                .title('🔩 Dental Implants')
                .child(
                  S.documentList()
                    .title('Dental Implant Restorations')
                    .filter('_type == "galleryCase" && procedureCategory == "implants"')
                ),
              S.listItem()
                .title('🌟 Full Mouth Smile Makeovers')
                .child(
                  S.documentList()
                    .title('Full Mouth Makeovers')
                    .filter('_type == "galleryCase" && procedureCategory == "full-mouth"')
                ),
              S.listItem()
                .title('🦷 Composite Bonding')
                .child(
                  S.documentList()
                    .title('Composite Bonding Cases')
                    .filter('_type == "galleryCase" && procedureCategory == "composite-bonding"')
                ),
              S.listItem()
                .title('💎 Teeth Whitening')
                .child(
                  S.documentList()
                    .title('Teeth Whitening Transformations')
                    .filter('_type == "galleryCase" && procedureCategory == "whitening"')
                ),
            ])
        ),

      // ─── 3. Clinical Services & Procedures ─────────────────────────
      S.listItem()
        .title('🩺 Clinical Services & Treatments')
        .child(
          S.list()
            .title('Clinical Procedures & Specialties')
            .items([
              S.listItem()
                .title('📋 All Dental Services')
                .child(
                  S.documentTypeList('service')
                    .title('All Clinical Services')
                    .defaultOrdering([{ field: 'order', direction: 'asc' }])
                ),
              S.divider(),
              S.listItem()
                .title('✨ Cosmetic & Smile Design')
                .child(
                  S.documentList()
                    .title('Cosmetic Procedures')
                    .filter('_type == "service" && category == "cosmetic"')
                    .defaultOrdering([{ field: 'order', direction: 'asc' }])
                ),
              S.listItem()
                .title('🔩 Implants & Oral Surgery')
                .child(
                  S.documentList()
                    .title('Implants & Oral Surgery')
                    .filter('_type == "service" && category == "implants"')
                    .defaultOrdering([{ field: 'order', direction: 'asc' }])
                ),
              S.listItem()
                .title('📐 Orthodontics & Clear Aligners')
                .child(
                  S.documentList()
                    .title('Orthodontics & Aligners')
                    .filter('_type == "service" && category == "orthodontics"')
                    .defaultOrdering([{ field: 'order', direction: 'asc' }])
                ),
              S.listItem()
                .title('🦷 General & Preventive Dentistry')
                .child(
                  S.documentList()
                    .title('General & Preventive Care')
                    .filter('_type == "service" && category == "general"')
                    .defaultOrdering([{ field: 'order', direction: 'asc' }])
                ),
              S.listItem()
                .title('🩺 Root Canal & Endodontics')
                .child(
                  S.documentList()
                    .title('Root Canal Therapy')
                    .filter('_type == "service" && category == "root-canal"')
                    .defaultOrdering([{ field: 'order', direction: 'asc' }])
                ),
              S.listItem()
                .title('👶 Pediatric Dentistry')
                .child(
                  S.documentList()
                    .title('Kids & Pediatric Care')
                    .filter('_type == "service" && category == "pediatric"')
                    .defaultOrdering([{ field: 'order', direction: 'asc' }])
                ),
            ])
        ),

      // ─── 4. Patient Reviews & Social Proof ─────────────────────────
      S.listItem()
        .title('⭐ Patient Reviews & Testimonials')
        .child(
          S.list()
            .title('Patient Feedback & Ratings')
            .items([
              S.listItem()
                .title('🌟 Featured on Homepage')
                .child(
                  S.documentList()
                    .title('Homepage Featured Reviews')
                    .filter('_type == "testimonial" && isFeatured == true')
                    .defaultOrdering([{ field: 'order', direction: 'asc' }])
                ),
              S.listItem()
                .title('💬 All Patient Reviews')
                .child(
                  S.documentTypeList('testimonial')
                    .title('All Reviews')
                    .defaultOrdering([{ field: 'order', direction: 'asc' }])
                ),
              S.divider(),
              S.listItem()
                .title('⭐ 5-Star Rated Testimonials')
                .child(
                  S.documentList()
                    .title('5-Star Reviews')
                    .filter('_type == "testimonial" && rating == 5')
                    .defaultOrdering([{ field: 'order', direction: 'asc' }])
                ),
              S.listItem()
                .title('🛡️ Verified Patient Reviews')
                .child(
                  S.documentList()
                    .title('Verified Patient Reviews')
                    .filter('_type == "testimonial" && verifiedPatient == true')
                    .defaultOrdering([{ field: 'order', direction: 'asc' }])
                ),
            ])
        ),

      // ─── 5. Patient Education & Journal ───────────────────────────
      S.listItem()
        .title('📚 Clinical Journal & Patient Education')
        .child(
          S.list()
            .title('Patient Education & Articles')
            .items([
              S.listItem()
                .title('📝 All Published Articles')
                .child(
                  S.documentTypeList('post')
                    .title('Published Articles')
                    .defaultOrdering([{ field: 'publishedAt', direction: 'desc' }])
                ),
              S.listItem()
                .title('👨‍⚕️ Medical Specialists & Authors')
                .child(
                  S.documentTypeList('author')
                    .title('Doctor & Author Profiles')
                ),
            ])
        ),

      S.divider(),

      // ─── Filter Out Managed Types from Default List ───────────────
      ...S.documentTypeListItems().filter(
        (listItem) =>
          !['siteSettings', 'service', 'galleryCase', 'testimonial', 'post', 'author'].includes(
            listItem.getId() || ''
          )
      ),
    ])
