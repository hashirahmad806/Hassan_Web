import type {
  DoctorProfile,
  FooterLinkGroup,
  JourneyStep,
  NavLink,
  Treatment,
  TrustBadge,
} from '@/types';

export const siteConfig = {
  name: 'Dr. Hassan',
  tagline: 'Excellence in Smile Design',
  phone: '+92 334 9295638',
  whatsapp: '+92 334 9295638',
  whatsappMessage:
    'Hello Dr. Hassan, I would like to inquire about booking a consultation at your clinic.',
  email: 'hello@drhassan.com',
  address: '123 Medical Plaza, Suite 400, New York, NY 10001',
  copyright: '© 2024 Dr. Hassan. Excellence in Aesthetic Care.',
  socials: {
    linkedin:
      'https://www.linkedin.com/in/muhammad-hassan-bds-13b85a1b7?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app',
    facebook: 'https://www.facebook.com/people/Dr-Hassan/100095052914472/',
    instagram: 'https://www.instagram.com/im.hassanbds/?hl=en',
  },
} as const;

export const navLinks: NavLink[] = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Contact', href: '/contact' },
];

export const heroContent = {
  label: '20 Years of Excellence in Smile Design',
  heading: '20 Years of Excellence',
  headingAccent: 'in Smile Design',
  description:
    'A fusion of luxury aesthetic and world-class dental care. Experience the pinnacle of personalized dentistry in an environment crafted for your absolute comfort.',
  primaryCta: 'Book Appointment',
  secondaryCta: 'Call Now',
} as const;

export const doctorProfile: DoctorProfile = {
  name: 'Dr. Hassan',
  title: 'Lead Dental Surgeon',
  rating: 5,
  ratingLabel: '5.0 PATIENT RATING',
  experienceLabel: '20+ YEARS EXPERIENCE',
  quote: '"A beautiful smile is the ultimate expression of health and confidence."',
  imageAlt: 'High-end editorial portrait of Dr. Hassan in a luxury clinical setting.',
};

export const trustBadges: TrustBadge[] = [
  { icon: 'verified', label: '20+ Years Expertise' },
  { icon: 'precision', label: '10k+ Smiles Created' },
  { icon: 'heart', label: 'Award Winning Aesthetic Excellence' },
];

export const auraStandard = [
  {
    icon: 'brush',
    title: 'Precision Artistry',
    description:
      'Meticulous attention to every micro-detail, ensuring a masterpiece of design.',
  },
  {
    icon: 'verified',
    title: 'Surgical Excellence',
    description:
      'Mastery in technique yielding seamless, minimally invasive procedures.',
  },
  {
    icon: 'spa',
    title: 'Patient Sanctuary',
    description:
      'An atmosphere of tranquility crafted to elevate your clinical experience.',
  },
  {
    icon: 'nature',
    title: 'Innate Naturalism',
    description:
      'Restorations that harmoniously blend with your inherent facial aesthetics.',
  },
];

export const accreditations = ['AACD', 'ADA Member', 'FAGD', 'ICOI Fellow'];

export const treatments: Treatment[] = [
  {
    id: 'cosmetic',
    title: 'Cosmetic Dentistry',
    priceLabel: 'FROM $500',
    priceSubtext: 'Varies by treatment',
    description:
      'Veneers, whitening, and complete smile makeovers tailored to your unique facial structure.',
  },
  {
    id: 'implants',
    title: 'Dental Implants',
    priceLabel: 'FROM $2,500',
    priceSubtext: 'Per implant',
    description:
      'Permanent, natural-looking tooth replacement utilizing the latest surgical advancements.',
  },
  {
    id: 'orthodontics',
    title: 'Orthodontics',
    priceLabel: '12-24 MONTHS',
    priceSubtext: 'Duration',
    description:
      'Discreet alignment solutions including Invisalign for a perfectly balanced smile.',
  },
  {
    id: 'general',
    title: 'General Care',
    priceLabel: 'COMPREHENSIVE',
    priceSubtext: 'Preventative & Restorative',
    description:
      'Comprehensive preventative and restorative treatments to maintain optimal oral health.',
  },
];

export const aboutContent = {
  label: 'Our Philosophy',
  heading: 'The Aura Standard',
  headingAccent: 'Where Artistry Meets Precision',
  paragraph1:
    'With over two decades of dedicated practice, Dr. Hassan has redefined aesthetic dentistry. His approach blends meticulous surgical precision with an artist’s eye for proportion and balance.',
  paragraph2:
    'Our sanctuary-like clinic is designed to provide an atmosphere of complete tranquility while delivering world-class dental solutions.',
  ctaLabel: 'Discover His Journey',
  stats: [
    { value: '20+', label: 'Years Expertise' },
    { value: '10k+', label: 'Smiles Created' },
    { value: '99%', label: 'Patient Satisfaction' },
  ],
  imageAlt:
    'Photograph of Dr. Hassan in clinical attire in his modern operatory suite.',
} as const;

export const journeyContent = {
  label: 'Patient Experience',
  heading: 'The Patient Journey',
  subheading:
    'A seamless progression from vision to reality, curated for your absolute peace of mind.',
  steps: [
    {
      step: 1,
      title: 'Consultation',
      description:
        'In-depth analysis and understanding of your aesthetic aspirations.',
    },
    {
      step: 2,
      title: 'Design',
      description:
        'Digital smile mapping and bespoke treatment plan formulation.',
    },
    {
      step: 3,
      title: 'Transformation',
      description:
        'Precision execution of your personalized aesthetic protocol.',
    },
    {
      step: 4,
      title: 'Aftercare',
      description:
        'Dedicated follow-up to ensure lasting brilliance and health.',
    },
  ] satisfies JourneyStep[],
} as const;

export const ctaContent = {
  heading: 'Ready to Experience Excellence in Dentistry?',
  description:
    'Schedule your comprehensive consultation today and take the first step towards your ideal smile in a serene, luxury environment.',
  buttonLabel: 'Book Appointment Now',
} as const;

export const footerContent = {
  description:
    'Excellence in Aesthetic Care. Redefining modern dentistry with precision and luxury.',
  linkGroups: [
    {
      title: 'Navigation',
      links: [
        { label: 'Home', href: '/' },
        { label: 'About', href: '/about' },
        { label: 'Services', href: '/services' },
        { label: 'Gallery', href: '/gallery' },
      ],
    },
    {
      title: 'Services',
      links: [
        { label: 'Restorative Dentistry', href: '/services#restorative' },
        { label: 'Cosmetic Enhancement', href: '/services#cosmetic' },
        { label: 'Preventative Care', href: '/services#preventative' },
        { label: 'Dental Implants', href: '/services#implants' },
      ],
    },
    {
      title: 'Connect',
      links: [
        { label: 'Book Appointment', href: '/contact' },
        { label: 'Office Hours', href: '/contact#hours' },
        { label: 'Location Map', href: '/contact#location' },
      ],
    },
  ] satisfies FooterLinkGroup[],
} as const;

export const galleryCategories = [
  'All Cases',
  'Full Mouth Rehabilitation',
  'Biomimetic Restorations',
  'Anterior Aesthetics',
  'Implantology',
];

export interface CaseStudy {
  id: string;
  caseNumber: string;
  title: string;
  category: string;
  challenge: string;
  solution: string;
  result: string;
  beforeAlt: string;
  afterAlt: string;
}

export const caseStudies: CaseStudy[] = [
  {
    id: 'case-021',
    caseNumber: 'Case 021',
    title: 'Full Arch Functional & Aesthetic Rehabilitation',
    category: 'Full Mouth Rehabilitation',
    challenge:
      'Severe generalized attrition, reduced vertical dimension of occlusion, and chronic masticatory strain affecting overall facial proportions.',
    solution:
      'Complete digital mock-up, neuromuscular bite deprogramming, and full-arch layered ceramic restorations to restore natural biological contours.',
    result:
      'Harmonious facial aesthetics, restored vertical height, and a natural, radiantly confident smile with optimal biomechanics.',
    beforeAlt:
      'Clinical photography showing severe tooth wear and collapsed bite',
    afterAlt:
      'Clinical photography showing completed full mouth aesthetic and functional reconstruction',
  },
  {
    id: 'case-042',
    caseNumber: 'Case 042',
    title: 'Complete Smile Design',
    category: 'Anterior Aesthetics',
    challenge:
      'Patient presented with noticeable asymmetry, uneven incisal edges, and discoloration that compromised their confidence in professional settings.',
    solution:
      'A conservative approach utilizing minimal-prep, ultra-thin porcelain veneers across the maxillary anterior segment to establish ideal proportions and shade harmony.',
    result:
      'A luminous, structurally sound restoration that perfectly balances with the patient’s facial architecture, delivering a natural and vibrant aesthetic.',
    beforeAlt:
      'Close-up photography of patient smile before anterior aesthetic restoration',
    afterAlt:
      'Close-up photography of patient smile after porcelain veneer restoration',
  },
  {
    id: 'case-089',
    caseNumber: 'Case 089',
    title: 'Conservative Rejuvenation',
    category: 'Biomimetic Restorations',
    challenge:
      'Deep intrinsic staining and micro-fractures in the enamel layer, resulting in a prematurely aged appearance of the dentition.',
    solution:
      'Targeted in-office laser whitening protocols followed by non-invasive resin infiltration to seal micro-defects without removing healthy tooth structure.',
    result:
      'Significant shade elevation and surface smoothing, restoring the youthful translucency and vibrance of the natural smile.',
    beforeAlt: 'Photography showing discolored and micro-fractured enamel',
    afterAlt:
      'Photography showing whitened and rejuvenated smooth tooth surface',
  },
  {
    id: 'case-112',
    caseNumber: 'Case 112',
    title: 'Single Anterior Implant',
    category: 'Implantology',
    challenge:
      'Loss of a central incisor with accompanying soft tissue defects, requiring highly demanding aesthetic integration in the visible smile zone.',
    solution:
      'Precision placement of a titanium implant paired with meticulous soft tissue grafting, crowned with a custom-layered ceramic restoration to mimic natural optics.',
    result:
      'Flawless integration with adjacent dentition, restoring full function and achieving an undetectable margin at the gingival level.',
    beforeAlt: 'Dental photo showing missing central incisor',
    afterAlt:
      'Dental photo showing completed implant restoration with natural gingival contour',
  },
  {
    id: 'case-135',
    caseNumber: 'Case 135',
    title: 'Biomimetic Ceramic Onlay & Structural Restoration',
    category: 'Biomimetic Restorations',
    challenge:
      'Extensive structural breakdown of posterior molar dentition from aged restorations, threatening tooth vitality and masticatory strength.',
    solution:
      'Biomimetic stress-reduced foundation combined with a custom-milled ceramic onlay meticulously replicating natural cuspal anatomy.',
    result:
      'Total anatomical preservation, reinforcement of natural tooth biomechanics, and invisible margin integration.',
    beforeAlt:
      'Dental macro photograph of compromised molar with recurrent decay',
    afterAlt:
      'Dental macro photograph of completed biomimetic ceramic onlay restoration',
  },
];

export const testimonials = [
  {
    quote:
      '"The attention to detail is unparalleled. Dr. Hassan didn\'t just fix my teeth; he designed a smile that looks entirely natural and suits my face perfectly. The process was thorough and deeply professional."',
    author: '— E.R. (Reference Case 042)',
    rating: 5,
  },
  {
    quote:
      '"Losing a front tooth was devastating, but the implant result is so flawless I forget it\'s not my original tooth. The clinic\'s aesthetic standards are truly exceptional."',
    author: '— M.T. (Reference Case 112)',
    rating: 5,
  },
];

export const servicesDetailedDirectory = {
  hero: {
    label: 'Treatment Portfolio',
    heading: 'The Art & Science of Dentistry',
    description:
      'Curated specialized dental and aesthetic treatments designed to elevate your health and confidence in a serene, luxurious environment.',
  },
  clinicalExcellence: {
    title: 'Clinical Excellence',
    subtitle:
      'Setting the standard in modern dental care through uncompromising precision and technology.',
    items: [
      {
        icon: 'center_focus_strong',
        title: 'Digital Smile Design',
        description:
          'Advanced 3D imaging and facial analysis to predictably design and simulate your optimal smile before any treatment begins.',
      },
      {
        icon: 'biotech',
        title: 'Micro-Dentistry',
        description:
          'Utilizing high-powered surgical microscopes for ultra-conservative treatments, preserving more of your natural tooth structure.',
      },
    ],
  },
  metrics: [
    { value: '99%', label: 'Patient Satisfaction' },
    { value: '15+', label: 'Years Expertise' },
    { value: '5k+', label: 'Successful Procedures' },
  ],
  categories: [
    {
      number: '01',
      id: 'restorative',
      title: 'Restorative Dentistry',
      subtitle: 'Rebuilding strength, function, and aesthetics.',
      indications: [
        'Severe tooth decay',
        'Missing teeth',
        'Structural damage or wear',
      ],
      cards: [
        {
          title: 'Dental Implants',
          description:
            'The gold standard for tooth replacement. Biocompatible titanium fixtures that mimic natural tooth roots, providing a permanent foundation for custom restorations.',
          benefit:
            'Prevents bone loss and restores full masticatory function.',
          icon: 'trip_origin',
        },
        {
          title: 'Porcelain Crowns',
          description:
            'Custom-milled ceramic caps that encase severely damaged teeth. Designed to perfectly match the translucency and shade of your natural dentition.',
          benefit: 'Long-lasting structural reinforcement with elite aesthetics.',
          icon: 'join_inner',
        },
      ],
    },
    {
      number: '02',
      id: 'cosmetic',
      title: 'Cosmetic Enhancement',
      subtitle: 'Refining symmetry, shade, and proportion.',
      indications: [
        'Discoloration or staining',
        'Minor misalignments',
        'Gaps or irregular shapes',
      ],
      cards: [
        {
          title: 'Porcelain Veneers',
          description:
            'Ultra-thin, custom-made ceramic shells bonded to the front surface of teeth to comprehensively transform your smile’s appearance.',
          benefit: 'Dramatic, stain-resistant smile transformation.',
          icon: 'auto_awesome',
        },
        {
          title: 'Professional Whitening',
          description:
            'Clinical-grade bleaching treatments that safely and effectively lift deep stains, offering results far superior to over-the-counter options.',
          benefit: 'Immediate, predictable brightening of your natural teeth.',
          icon: 'wb_sunny',
        },
      ],
    },
    {
      number: '03',
      id: 'preventative',
      title: 'Preventative Care',
      subtitle: 'The foundation of long-term oral health.',
      indications: [
        'Routine maintenance',
        'Early detection of pathology',
        'Periodontal management',
      ],
      cards: [
        {
          title: 'Comprehensive Exams',
          description:
            'Detailed assessments utilizing advanced imaging, oral cancer screening, and periodontal probing to monitor your oral health baseline.',
          benefit:
            'Early intervention minimizes need for invasive treatments.',
          icon: 'health_and_safety',
        },
        {
          title: 'Periodontal Therapy',
          description:
            'Advanced cleaning protocols (scaling and root planing) to manage gum disease, remove subgingival calculus, and promote tissue reattachment.',
          benefit: 'Preserves the supporting structures of your teeth.',
          icon: 'clean_hands',
        },
      ],
    },
  ],
};

export const contactContent = {
  label: 'Get In Touch',
  heading: 'Book Your Appointment',
  description:
    'Take the first step toward your ideal smile. Our team will respond within 24 hours to confirm your consultation.',
  hours: [
    { day: 'Monday – Friday', time: '9:00 AM – 6:00 PM' },
    { day: 'Saturday', time: '10:00 AM – 2:00 PM' },
    { day: 'Sunday', time: 'Closed' },
  ],
} as const;

export const serviceOptions = [
  'General Consultation',
  'Cosmetic Dentistry',
  'Orthodontics',
  'Dental Implants',
  'Professional Whitening',
  'Oral Surgery',
];

export const aboutDetailed = {
  hero: {
    heading: 'A Legacy of Clinical Excellence.',
    paragraph1:
      'For over two decades, Dr. Hassan has redefined aesthetic care, merging surgical precision with an artist’s touch to create transformative, natural results in a sanctuary of calm.',
    paragraph2:
      'His unwavering commitment to continuous education keeps him at the forefront of medical advancements, while his passion for mentoring junior surgeons ensures a legacy of excellence for generations to come.',
  },
  distinctions: [
    {
      title: 'Board Certified Dental Surgeon',
      description:
        'Recognized excellence in advanced dental and aesthetic surgical procedures.',
      icon: 'verified',
    },
    {
      title: 'Fellow of ICOI',
      description:
        'International Congress of Oral Implantologists fellow, demonstrating mastery.',
      icon: 'workspace_premium',
    },
    {
      title: 'Pioneer in Laser Dentistry',
      description:
        'Early adopter and innovator in minimally invasive aesthetic treatments.',
      icon: 'psychiatry',
    },
    {
      title: 'Global Speaker',
      description:
        'International lecturer on Smile Design and facial aesthetics harmony.',
      icon: 'public',
    },
  ],
  timeline: [
    {
      year: '2003',
      title: 'Doctorate of Dental Surgery',
      description:
        'Graduated with top honors, establishing the foundation for a career in surgical excellence.',
    },
    {
      year: '2008',
      title: 'NYU Specialized Training',
      description:
        'Completed advanced specialization in Veneers and Cosmetic Dentistry at New York University.',
    },
    {
      year: '2012',
      title: 'Aura Clinic Established',
      description:
        'Opened the flagship aesthetic clinic, creating a restorative sanctuary for patients.',
    },
    {
      year: '2023',
      title: 'Lifetime Achievement Award',
      description:
        'Recognized globally for contributions to laser aesthetic dentistry and mentorship.',
    },
  ],
  education: [
    {
      title: 'Doctorate of Dental Surgery (DDS)',
      institution: 'University of Medical Sciences',
    },
    {
      title: 'Specialized Training in Veneers',
      institution: 'New York University (NYU)',
    },
    {
      title: 'Advanced Facial Aesthetics Certification',
      institution: 'London Institute of Aesthetics',
    },
  ],
  memberships: [
    {
      title: 'American Dental Association (ADA)',
      role: 'Active Member',
    },
    {
      title: 'American Academy of Cosmetic Dentistry (AACD)',
      role: 'Accredited Member',
    },
    {
      title: 'International Congress of Oral Implantologists',
      role: 'Fellow',
    },
  ],
  philosophy: {
    heading: 'Artistry Meets Medicine.',
    paragraph1:
      "True aesthetic excellence is not found in dramatic alteration, but in the subtle refinement of one's natural architecture. Our philosophy is rooted in the belief that every treatment must be approached with the precision of a surgeon and the vision of an artist.",
    paragraph2:
      'We eschew the sterile, clinical environments of the past, offering instead a restorative sanctuary. Here, advanced medical protocols are delivered within a space designed to calm the mind and elevate the spirit, ensuring that your journey is as refined as your results.',
  },
};

