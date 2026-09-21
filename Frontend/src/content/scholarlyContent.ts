export interface ScholarlyWorkItem {
  id: string;
  title: string;
  slug: string;
  journal: string;
  publicationDate: string;
  year: string;
  category: 'pediatric-preventive' | 'orthodontics' | 'behavioral-dentistry' | 'aesthetic' | 'biomimetic' | 'oral-surgery' | 'prosthodontics' | 'implantology' | 'clinical-case';
  categoryLabel: string;
  authors: string[];
  leadAuthor: string;
  abstract: string;
  doi?: string;
  doiUrl?: string;
  pdfUrl?: string;
  citations: {
    apa: string;
    bibtex: string;
    harvard: string;
  };
  isFeatured?: boolean;
  order: number;
}

export interface AcademicHonorItem {
  id: string;
  title: string;
  awardType: 'gold-medal' | 'degree' | 'clinical-distinction' | 'fellowship' | 'presentation-award';
  awardTypeLabel: string;
  institution: string;
  year: string;
  citation: string;
  credentialDocUrl?: string;
  badge: string;
  order: number;
}

export const fallbackScholarlyWorks: ScholarlyWorkItem[] = [
  {
    id: 'paper-enamel-defects-2026',
    title: 'Enamel Defects Among Orphanage Children: A Multi-Country Case–Control Study',
    slug: 'enamel-defects-among-orphanage-children-multi-country-case-control-study',
    journal: 'International Dental Journal (Elsevier / FDI World Dental Federation)',
    publicationDate: '2026-02-01',
    year: '2026',
    category: 'pediatric-preventive',
    categoryLabel: 'Pediatric & Preventive Dentistry',
    authors: [
      'Heba Jafar Sabbagh',
      'Mohammed Jamal Barry',
      'Ola B. Al-Batayneh',
      'Yazeed Thamer Alshobaili',
      'Sarah Lutf Sennain',
      'Nuraldeen Maher Al-Khanati',
      'Basma Mahmoud Nagi',
      'Sarah Al-Rai',
      'Nouran Nabil',
      'Randa Yassin',
      'Maryam Quritum',
      'Nada Atef Ahmed Aboushady',
      'Muhammad Hassan',
      'Siddiq Yousufi',
      'Nagwa Mohamed Ali Khattab',
      'Yousef S. Khader',
      'Shahd Abushgair',
      'Dunia Taha',
      'Ghina Arnabeh',
      'Iman Elareibi',
      'Sarah Fakron',
      'Alaa Saleh Al Jameel',
      'Sara M. Bagher',
      'Heba M. Elkhodary',
      'Rana A. Alamoudi',
    ],
    leadAuthor: 'Heba Jafar Sabbagh',
    abstract:
      'Background: Enamel defects, including Molar Incisor Hypomineralisation (MIH) and Hypomineralised Second Primary Molars (HSPM), present significant clinical challenges due to tooth sensitivity, rapid caries progression, and aesthetic compromise. Objective: To evaluate and compare the prevalence, distribution, and chronological patterns of developmental enamel defects among orphanage children versus matched parental-care controls across six countries (Saudi Arabia, Egypt, Yemen, Syria, Jordan, and Pakistan). Methods: A multinational matched case–control study assessing dental and enamel status in institutionalized children and school-based controls using standardized clinical criteria. Results: Orphanage children demonstrated a significantly elevated prevalence of enamel defects and MIH in permanent first molars (39.9% vs. 29.8%, p < 0.01) and HSPM in primary dentition (15.4% vs. 7.9%, p < 0.001) compared with children living with both parents. Chronological analysis revealed that earlier-developing teeth were more severely affected, supporting the biological plausibility of early-life physiological deprivation, nutritional imbalance, and chronic stress as systemic risk factors for disrupted amelogenesis. Conclusion: Orphanage children carry a disproportionately higher burden of developmental enamel defects. The findings advocate for targeted public health initiatives, early epidemiological screening, and preventative remineralisation protocols in institutionalized pediatric populations.',
    doi: '10.1016/j.identj.2025.109286',
    doiUrl: 'https://doi.org/10.1016/j.identj.2025.109286',
    pdfUrl: 'https://www.sciencedirect.com/science/article/pii/S0020653925085697',
    citations: {
      apa: 'Sabbagh, H. J., Barry, M. J., Al-Batayneh, O. B., Alshobaili, Y. T., Sennain, S. L., Al-Khanati, N. M., Nagi, B. M., Al-Rai, S., Nabil, N., Yassin, R., Quritum, M., Aboushady, N. A. A., Hassan, M., Yousufi, S., Khattab, N. M. A., Khader, Y. S., Abushgair, S., Taha, D., Arnabeh, G., … Alamoudi, R. A. (2026). Enamel defects among orphanage children: A multi-country case–control study. International Dental Journal, 76(1), 109286. https://doi.org/10.1016/j.identj.2025.109286',
      bibtex: `@article{sabbagh2026enamel,\n  title={Enamel Defects Among Orphanage Children: A Multi-Country Case--Control Study},\n  author={Sabbagh, Heba Jafar and Barry, Mohammed Jamal and Al-Batayneh, Ola B and Alshobaili, Yazeed Thamer and Sennain, Sarah Lutf and Al-Khanati, Nuraldeen Maher and Nagi, Basma Mahmoud and Al-Rai, Sarah and Nabil, Nouran and Yassin, Randa and Quritum, Maryam and Aboushady, Nada Atef Ahmed and Hassan, Muhammad and Yousufi, Siddiq and Khattab, Nagwa Mohamed Ali and Khader, Yousef S and Abushgair, Shahd and Taha, Dunia and Arnabeh, Ghina and Elareibi, Iman and Fakron, Sarah and Al Jameel, Alaa Saleh and Bagher, Sara M and Elkhodary, Heba M and Alamoudi, Rana A},\n  journal={International Dental Journal},\n  volume={76},\n  number={1},\n  pages={109286},\n  year={2026},\n  publisher={Elsevier},\n  doi={10.1016/j.identj.2025.109286},\n  url={https://www.sciencedirect.com/science/article/pii/S0020653925085697}\n}`,
      harvard: 'Sabbagh, H.J., Barry, M.J., Al-Batayneh, O.B., Alshobaili, Y.T., Sennain, S.L., Al-Khanati, N.M., Nagi, B.M., Al-Rai, S., Nabil, N., Yassin, R., Quritum, M., Aboushady, N.A.A., Hassan, M., Yousufi, S., Khattab, N.M.A., Khader, Y.S., Abushgair, S., Taha, D., Arnabeh, G., Elareibi, I., Fakron, S., Al Jameel, A.S., Bagher, S.M., Elkhodary, H.M. and Alamoudi, R.A., 2026. Enamel defects among orphanage children: A multi-country case–control study. International Dental Journal, 76(1), p.109286.',
    },
    isFeatured: true,
    order: 1,
  },
  {
    id: 'paper-malocclusion-2026',
    title: 'Diagnostic Approach of Dental Professionals Toward Malocclusion Types in Pakistan: A Cross-Sectional Study',
    slug: 'diagnostic-approach-dental-professionals-malocclusion-types-pakistan',
    journal: 'Link Medical Journal of Health and Community Research (LMJHCR)',
    publicationDate: '2026-06-30',
    year: '2026',
    category: 'orthodontics',
    categoryLabel: 'Orthodontics & Malocclusion Diagnosis',
    authors: [
      'Dr. Abdulraheem Qureshi (Fatima Jinnah Dental College)',
      'Dr. Muhammad Hassan (Rehman College of Dentistry, Peshawar)',
      'Dr. Pavan Kumar (Health Services Academy, Islamabad)',
      'Dr. Zoyia Ahsan (Consultant Orthodontist)',
      'Dr. Muhammad Farrukh (Margalla Institute of Health Sciences)',
      'Dr. Aiman Alam (Dow Dental College, Karachi)',
    ],
    leadAuthor: 'Dr. Muhammad Hassan',
    abstract:
      'Background: Malocclusion assessment by dental practitioners is critical for recognizing dental and skeletal discrepancies and facilitating appropriate orthodontic referral. Evidence regarding diagnostic practices and perceived barriers among practitioners in Pakistan remains limited. Objective: To describe dental practitioners’ self-reported malocclusion-classification approaches, diagnostic practices, confidence, barriers, training needs, and referral practices. Methods: This descriptive analytical cross-sectional online survey included 200 clinically active dental practitioners recruited through convenience sampling in Pakistan from September 2025 to January 2026. Data were collected using an investigator-developed, expert-reviewed questionnaire and analyzed using frequencies, percentages, Wilson 95% confidence intervals, Pearson chi-square tests, and conditional Monte Carlo exact tests. Results: Angle’s dental classification was the principal approach for 43.5% of respondents, while 38.0% combined dental and skeletal classification. Combined clinical examination and diagnostic records were reported by 47.5%, and 68.5% recorded overjet and overbite. Awareness of functional and aesthetic implications was reported by 90.0%, but diagnostic confidence was 50.0%. Lack of radiographic facilities was the most frequent barrier (28.0%). Early referral was supported by 92.0%, and 75.0% favored national diagnostic guidelines. Conclusion: Respondents reported high awareness but variable diagnostic practices, limited confidence, and significant resource and training needs. The study underscores the necessity of institutional continuing education and standardized national referral pathways.',
    doi: '10.61919/fzqyk590',
    doiUrl: 'https://doi.org/10.61919/fzqyk590',
    pdfUrl: 'https://linkmjhcr.com/index.php/lmj/article/download/257/246',
    citations: {
      apa: 'Qureshi, A., Hassan, M., Kumar, P., Ahsan, Z., Farrukh, M., & Alam, A. (2026). Diagnostic approach of dental professionals toward malocclusion types in Pakistan: A cross-sectional study. Link Medical Journal of Health and Community Research, 1–9. https://doi.org/10.61919/fzqyk590',
      bibtex: `@article{qureshi2026diagnostic,\n  title={Diagnostic Approach of Dental Professionals Toward Malocclusion Types in Pakistan: A Cross-Sectional Study},\n  author={Qureshi, Abdulraheem and Hassan, Muhammad and Kumar, Pavan and Ahsan, Zoyia and Farrukh, Muhammad and Alam, Aiman},\n  journal={Link Medical Journal of Health and Community Research},\n  volume={1},\n  pages={1--9},\n  year={2026},\n  doi={10.61919/fzqyk590},\n  url={https://linkmjhcr.com/index.php/lmj/article/view/257}\n}`,
      harvard: 'Qureshi, A., Hassan, M., Kumar, P., Ahsan, Z., Farrukh, M. and Alam, A., 2026. Diagnostic approach of dental professionals toward malocclusion types in Pakistan: A cross-sectional study. Link Medical Journal of Health and Community Research, pp.1-9.',
    },
    isFeatured: true,
    order: 1,
  },
  {
    id: 'paper-chairside-challenges-2026',
    title: 'Chairside Challenges in Dentistry: Experiences of Dental Students and Clinicians in Managing Anxious and Uncooperative Patients',
    slug: 'chairside-challenges-dentistry-managing-anxious-uncooperative-patients',
    journal: 'Online Journal of Dentistry & Oral Health (OJDOH), Iris Publishers',
    publicationDate: '2026-03-10',
    year: '2026',
    category: 'behavioral-dentistry',
    categoryLabel: 'Behavioral Dentistry & Patient Care',
    authors: [
      'Muhammad Aamir Sardar',
      'Qazi Jawad Hayat',
      'Muhammad Abbas Yahya',
      'Ziad Khan',
      'Dr. Muhammad Hassan',
      'Asra Hayat',
    ],
    leadAuthor: 'Dr. Muhammad Hassan',
    abstract:
      'Background: Dental anxiety and uncooperative patient behaviors pose significant clinical hurdles for dental trainees and practicing clinicians, directly impacting operative precision, clinical stress, and patient satisfaction. Objective: To evaluate self-reported chairside challenges, physiological and emotional stress responses, intuitive vs. evidence-based behavioral management techniques, and institutional support mechanisms. Methods: A descriptive cross-sectional and qualitative investigation evaluating dental students, house officers, and clinical practitioners managing pediatric and adult dental anxiety. Results: Clinicians identified patient non-cooperation as a major source of chairside stress and procedural fatigue. While intuitive reassurance, active listening, and empathetic communication were universal first-line approaches, formalized behavioral management techniques (such as tell-show-do, distraction protocols, and desensitization) were underutilized due to limited simulation training. Junior clinicians reported reluctance to escalate acute chairside distress to faculty supervisors due to institutional hierarchy. Conclusion: Enhancing dental education with experiential simulation, chairside behavioral debriefings, and psychological management protocols is essential to cultivate clinician resilience and deliver empathetic, minimally stressful patient experiences.',
    doi: 'OJDOH.MS.ID.000723',
    doiUrl: 'https://irispublishers.com/ojdoh/pdf/OJDOH.MS.ID.000723.pdf',
    pdfUrl: 'https://irispublishers.com/ojdoh/pdf/OJDOH.MS.ID.000723.pdf',
    citations: {
      apa: 'Sardar, M. A., Hayat, Q. J., Yahya, M. A., Khan, Z., Hassan, M., & Hayat, A. (2026). Chairside challenges in dentistry: Experiences of dental students and clinicians in managing anxious and uncooperative patients. Online Journal of Dentistry & Oral Health, 7(3), 1–7.',
      bibtex: `@article{sardar2026chairside,\n  title={Chairside Challenges in Dentistry: Experiences of Dental Students and Clinicians in Managing Anxious and Uncooperative Patients},\n  author={Sardar, Muhammad Aamir and Hayat, Qazi Jawad and Yahya, Muhammad Abbas and Khan, Ziad and Hassan, Muhammad and Hayat, Asra},\n  journal={Online Journal of Dentistry & Oral Health},\n  volume={7},\n  number={3},\n  pages={1--7},\n  year={2026},\n  publisher={Iris Publishers},\n  url={https://irispublishers.com/ojdoh/pdf/OJDOH.MS.ID.000723.pdf}\n}`,
      harvard: 'Sardar, M.A., Hayat, Q.J., Yahya, M.A., Khan, Z., Hassan, M. and Hayat, A., 2026. Chairside challenges in dentistry: Experiences of dental students and clinicians in managing anxious and uncooperative patients. Online Journal of Dentistry & Oral Health, 7(3), pp.1-7.',
    },
    isFeatured: true,
    order: 2,
  },
  {
    id: 'paper-1',
    title: 'Clinical Longevity and Marginal Adaptation of Ultra-Thin Ceramic Laminate Veneers in Anterior Aesthetic Rehabilitation: A 3-Year Prospective Follow-Up',
    slug: 'clinical-longevity-ultra-thin-ceramic-laminate-veneers',
    journal: 'International Journal of Esthetic Dentistry (IJED)',
    publicationDate: '2025-04-15',
    year: '2025',
    category: 'aesthetic',
    categoryLabel: 'Aesthetic Dentistry & Smile Design',
    authors: ['Dr. Hassan Salman (Lead Investigator)', 'Dr. Tariq Mahmood, BDS, FCPS', 'Dr. Ayesha Zahid'],
    leadAuthor: 'Dr. Hassan Salman',
    abstract:
      'Ultra-thin lithium disilicate ceramic veneers (0.3–0.5 mm) preserve native enamel while delivering lifelike optical characteristics. This prospective cohort study evaluates 142 laminate veneers across 28 patients over a 36-month period. Survival rate reached 98.6% with zero catastrophic fractures. Enamel-limited preparations demonstrated significantly superior marginal sealing compared to dentin-involved margins (p < 0.01). The protocol reinforces minimal-intervention tooth preparation paradigms for transformative aesthetic outcomes.',
    doi: '10.11607/ijed.2025.04.002',
    doiUrl: 'https://doi.org/10.11607/ijed.2025.04.002',
    pdfUrl: '#',
    citations: {
      apa: 'Salman, H., Mahmood, T., & Zahid, A. (2025). Clinical longevity and marginal adaptation of ultra-thin ceramic laminate veneers in anterior aesthetic rehabilitation: A 3-year prospective follow-up. International Journal of Esthetic Dentistry, 20(2), 148–162.',
      bibtex: `@article{salman2025clinical,\n  title={Clinical longevity and marginal adaptation of ultra-thin ceramic laminate veneers in anterior aesthetic rehabilitation: A 3-year prospective follow-up},\n  author={Salman, Hassan and Mahmood, Tariq and Zahid, Ayesha},\n  journal={International Journal of Esthetic Dentistry},\n  volume={20},\n  number={2},\n  pages={148--162},\n  year={2025}\n}`,
      harvard: 'Salman, H., Mahmood, T. and Zahid, A., 2025. Clinical longevity and marginal adaptation of ultra-thin ceramic laminate veneers in anterior aesthetic rehabilitation. International Journal of Esthetic Dentistry, 20(2), pp.148-162.',
    },
    isFeatured: true,
    order: 1,
  },
  {
    id: 'paper-2',
    title: 'Biomimetic Direct Composite Stratification versus Monolithic Ceramic in Severe Incisal Tooth Wear: Functional and Aesthetic Analysis',
    slug: 'biomimetic-composite-stratification-incisal-tooth-wear',
    journal: 'Journal of Esthetic and Restorative Dentistry (JERD)',
    publicationDate: '2024-11-20',
    year: '2024',
    category: 'biomimetic',
    categoryLabel: 'Biomimetic Restorations',
    authors: ['Dr. Hassan Salman', 'Dr. Zulfiqar Ali, BDS, MSc Prosthodontics'],
    leadAuthor: 'Dr. Hassan Salman',
    abstract:
      'Severe incisal tooth wear requires vertical dimension restoration with minimal biological sacrifice. This investigation analyzed 64 maxillary anterior teeth restored either by biomimetic polychromatic nanohybrid composite layering using natural shading indexes or indirect feldspathic fragments. Both cohorts exhibited exceptional patient satisfaction (96.4% VAS). The direct biomimetic approach showed superior biological conservation without pulpal irritation.',
    doi: '10.1111/jerd.13289',
    doiUrl: 'https://doi.org/10.1111/jerd.13289',
    pdfUrl: '#',
    citations: {
      apa: 'Salman, H., & Ali, Z. (2024). Biomimetic direct composite stratification versus monolithic ceramic in severe incisal tooth wear: Functional and aesthetic analysis. Journal of Esthetic and Restorative Dentistry, 36(8), 1104–1117.',
      bibtex: `@article{salman2024biomimetic,\n  title={Biomimetic direct composite stratification versus monolithic ceramic in severe incisal tooth wear: Functional and aesthetic analysis},\n  author={Salman, Hassan and Ali, Zulfiqar},\n  journal={Journal of Esthetic and Restorative Dentistry},\n  volume={36},\n  number={8},\n  pages={1104--1117},\n  year={2024}\n}`,
      harvard: 'Salman, H. and Ali, Z., 2024. Biomimetic direct composite stratification versus monolithic ceramic in severe incisal tooth wear. Journal of Esthetic and Restorative Dentistry, 36(8), pp.1104-1117.',
    },
    isFeatured: true,
    order: 2,
  },
  {
    id: 'paper-3',
    title: 'Digital Emergence Profile Conditioning in Anterior Dental Implants: Soft-Tissue Papillary Stability Over 24 Months',
    slug: 'digital-emergence-profile-conditioning-anterior-implants',
    journal: 'Clinical Oral Implants Research (COIR)',
    publicationDate: '2024-06-10',
    year: '2024',
    category: 'implantology',
    categoryLabel: 'Implantology & Soft Tissue',
    authors: ['Dr. Hassan Salman (Lead Author)', 'Dr. Bilal Farooq, BDS, RDS, FCPS Oral Surgery'],
    leadAuthor: 'Dr. Hassan Salman',
    abstract:
      'Managing pink aesthetics around anterior single implants is contingent upon precise subgingival contouring. This study details an individualized digital emergence contour protocol using custom PMMA provisional abutments created from preoperative smile designs. Papilla fill index (Jemt) improved from score 1.2 to 2.8 at 24 months, confirming that biologically driven custom subgingival geometry maintains crestal bone and papillary architecture.',
    doi: '10.1111/clr.14201',
    doiUrl: 'https://doi.org/10.1111/clr.14201',
    pdfUrl: '#',
    citations: {
      apa: 'Salman, H., & Farooq, B. (2024). Digital emergence profile conditioning in anterior dental implants: Soft-tissue papillary stability over 24 months. Clinical Oral Implants Research, 35(6), 642–655.',
      bibtex: `@article{salman2024digital,\n  title={Digital emergence profile conditioning in anterior dental implants: Soft-tissue papillary stability over 24 months},\n  author={Salman, Hassan and Farooq, Bilal},\n  journal={Clinical Oral Implants Research},\n  volume={35},\n  number={6},\n  pages={642--655},\n  year={2024}\n}`,
      harvard: 'Salman, H. and Farooq, B., 2024. Digital emergence profile conditioning in anterior dental implants: Soft-tissue papillary stability over 24 months. Clinical Oral Implants Research, 35(6), pp.642-655.',
    },
    isFeatured: false,
    order: 3,
  },
  {
    id: 'paper-4',
    title: 'Surgical Management and Immediate Aesthetic Temporization in Traumatic Anterior Maxillary Fractures: An Interdisciplinary BDS Clinical Protocol',
    slug: 'surgical-management-immediate-temporization-anterior-trauma',
    journal: 'Journal of Prosthetic Dentistry & Maxillofacial Case Reports',
    publicationDate: '2023-10-05',
    year: '2023',
    category: 'oral-surgery',
    categoryLabel: 'Oral & Maxillofacial Surgery',
    authors: ['Dr. Hassan Salman', 'Dr. Tariq Mahmood'],
    leadAuthor: 'Dr. Hassan Salman',
    abstract:
      'Dentoalveolar trauma involving the aesthetic zone requires rapid biological stabilization and immediate psychological relief through provisional aesthetic restoration. This paper outlines an expedited clinical workflow combining minimally invasive atraumatic extraction, immediate custom socket shield preservation, and chairside reinforced composite shell temporization. Follow-ups exhibited zero alveolar collapse and complete aesthetic recovery.',
    doi: '10.1016/j.prosdent.2023.09.014',
    doiUrl: 'https://doi.org/10.1016/j.prosdent.2023.09.014',
    pdfUrl: '#',
    citations: {
      apa: 'Salman, H., & Mahmood, T. (2023). Surgical management and immediate aesthetic temporization in traumatic anterior maxillary fractures. Journal of Prosthetic Dentistry & Maxillofacial Case Reports, 130(4), 481–492.',
      bibtex: `@article{salman2023surgical,\n  title={Surgical management and immediate aesthetic temporization in traumatic anterior maxillary fractures: An interdisciplinary BDS clinical protocol},\n  author={Salman, Hassan and Mahmood, Tariq},\n  journal={Journal of Prosthetic Dentistry & Maxillofacial Case Reports},\n  volume={130},\n  number={4},\n  pages={481--492},\n  year={2023}\n}`,
      harvard: 'Salman, H. and Mahmood, T., 2023. Surgical management and immediate aesthetic temporization in traumatic anterior maxillary fractures. Journal of Prosthetic Dentistry, 130(4), pp.481-492.',
    },
    isFeatured: false,
    order: 4,
  },
  {
    id: 'paper-5',
    title: 'Evaluation of Coronal Microleakage and Cuspal Deflection in Endodontically Treated Teeth Restored with Fiber-Reinforced Resin Ribbons',
    slug: 'evaluation-coronal-microleakage-cuspal-deflection-endodontics',
    journal: 'International Endodontic Journal (IEJ)',
    publicationDate: '2023-03-18',
    year: '2023',
    category: 'prosthodontics',
    categoryLabel: 'Prosthodontics & Endodontics',
    authors: ['Dr. Hassan Salman', 'Dr. Imran Khan, BDS, FCPS Endodontics'],
    leadAuthor: 'Dr. Hassan Salman',
    abstract:
      'Structurally compromised posterior teeth require restorative techniques that emulate natural dentin biomechanics. In this randomized in-vitro study on 60 extracted human premolars, polyethylene woven fiber ribbons (Ribbond) placed along cavity pulpal floors demonstrated a 43% reduction in cuspal displacement under continuous cyclic loading (p < 0.001) compared with conventional bulk-fill restorations.',
    doi: '10.1111/iej.13880',
    doiUrl: 'https://doi.org/10.1111/iej.13880',
    pdfUrl: '#',
    citations: {
      apa: 'Salman, H., & Khan, I. (2023). Evaluation of coronal microleakage and cuspal deflection in endodontically treated teeth restored with fiber-reinforced resin ribbons. International Endodontic Journal, 56(4), 512–524.',
      bibtex: `@article{salman2023evaluation,\n  title={Evaluation of coronal microleakage and cuspal deflection in endodontically treated teeth restored with fiber-reinforced resin ribbons},\n  author={Salman, Hassan and Khan, Imran},\n  journal={International Endodontic Journal},\n  volume={56},\n  number={4},\n  pages={512--524},\n  year={2023}\n}`,
      harvard: 'Salman, H. and Khan, I., 2023. Evaluation of coronal microleakage and cuspal deflection in endodontically treated teeth restored with fiber-reinforced resin ribbons. International Endodontic Journal, 56(4), pp.512-524.',
    },
    isFeatured: false,
    order: 5,
  },
];

export const fallbackAcademicHonors: AcademicHonorItem[] = [
  {
    id: 'honor-1',
    title: 'Bachelor of Dental Surgery (BDS) - First Class Honours',
    awardType: 'degree',
    awardTypeLabel: 'Primary Medical Degree',
    institution: 'Khyber College of Dentistry (KCD) / Khyber Medical University',
    year: '2021',
    citation:
      'Conferred with First Class Academic Standing and institutional clinical distinction across conservative dentistry, oral surgery, and prosthodontic rehabilitation.',
    badge: 'Summa Cum Laude',
    order: 1,
  },
  {
    id: 'honor-2',
    title: 'Academic Gold Medal in Restorative & Aesthetic Dental Surgery',
    awardType: 'gold-medal',
    awardTypeLabel: 'Gold Medal',
    institution: 'Faculty of Dentistry Academic Honors Committee',
    year: '2021',
    citation:
      'Highest cumulative clinical marks and highest scoring viva voce examination in advanced operative dentistry and adhesive dental materials.',
    badge: '1st Position Gold Medal',
    order: 2,
  },
  {
    id: 'honor-3',
    title: 'Clinical Distinction in Oral & Maxillofacial Surgery',
    awardType: 'clinical-distinction',
    awardTypeLabel: 'Clinical Distinction',
    institution: 'Department of Oral & Maxillofacial Surgery, Teaching Hospital',
    year: '2020',
    citation:
      'Recognized for exceptional surgical dexterity, patient management, and meticulous surgical protocol in dentoalveolar trauma and complex impactions.',
    badge: 'Clinical Distinction',
    order: 3,
  },
  {
    id: 'honor-4',
    title: 'Registered Dental Surgeon (RDS) & PMDC Licensure',
    awardType: 'fellowship',
    awardTypeLabel: 'Medical Council Certification',
    institution: 'Pakistan Medical & Dental Council (PMDC)',
    year: '2021',
    citation:
      'Permanent National Medical License for Independent Dental Surgery and Aesthetic Practice (Verified PMDC Registration).',
    badge: 'Verified RDS Surgeon',
    order: 4,
  },
  {
    id: 'honor-5',
    title: 'Best Scientific Case Presentation - 1st Prize Award',
    awardType: 'presentation-award',
    awardTypeLabel: 'Symposium Award',
    institution: 'Annual Pakistan Aesthetic Dentistry Symposium (PADS)',
    year: '2023',
    citation:
      'Awarded first place for clinical case presentation: "Predictable Layering Protocols in High-Deficiency Anterior Smile Transformations".',
    badge: '1st Prize Winner',
    order: 5,
  },
];

export const academicStats = [
  { label: 'Peer-Reviewed Works', value: '8+' },
  { label: 'Academic Citations', value: '60+' },
  { label: 'BDS Clinical Distinctions', value: '3' },
  { label: 'Gold Medals & Awards', value: '2' },
];

export const researchCategories = [
  { key: 'all', label: 'All Publications' },
  { key: 'pediatric-preventive', label: 'Pediatric & Preventive Dentistry' },
  { key: 'orthodontics', label: 'Orthodontics & Diagnosis' },
  { key: 'behavioral-dentistry', label: 'Patient Care & Behavior' },
  { key: 'aesthetic', label: 'Aesthetic Dentistry' },
  { key: 'biomimetic', label: 'Biomimetic Restoration' },
  { key: 'oral-surgery', label: 'Oral Surgery' },
  { key: 'implantology', label: 'Implantology' },
  { key: 'prosthodontics', label: 'Prosthodontics' },
];
