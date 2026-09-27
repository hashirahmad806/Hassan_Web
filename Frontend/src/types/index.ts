export interface NavLink {
  label: string;
  href: string;
}

export interface SubMenuItem {
  label: string;
  href: string;
  description?: string;
  tag?: string;
}

export interface MegaMenuColumn {
  category: string;
  categoryHref?: string;
  items: SubMenuItem[];
}

export interface MegaFeaturedPanel {
  title: string;
  subtitle: string;
  tag: string;
  image: string;
  href: string;
  ctaLabel: string;
}

export interface NavigationItem {
  id: string;
  label: string;
  href: string;
  type: 'link' | 'dropdown' | 'mega';
  dropdownItems?: SubMenuItem[];
  megaColumns?: MegaMenuColumn[];
  featuredPanel?: MegaFeaturedPanel;
}

export interface Treatment {
  id: string;
  title: string;
  priceLabel: string;
  priceSubtext: string;
  description: string;
}

export interface JourneyStep {
  step: number;
  title: string;
  description: string;
}

export interface TrustBadge {
  icon: string;
  label: string;
}

export interface FooterLinkGroup {
  title: string;
  links: { label: string; href: string }[];
}

export interface DoctorProfile {
  name: string;
  title: string;
  rating: number;
  ratingLabel: string;
  experienceLabel: string;
  quote: string;
  imageAlt: string;
}

export interface AppointmentFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  service: string;
  preferredDate: string;
  message?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  beforeAlt: string;
  afterAlt: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  duration: string;
  priceFrom: string;
  icon: string;
}

export interface LocationSpecItem {
  icon: 'apartment' | 'elevator' | 'parking' | string;
  label: string;
}

export interface LocationAmenityItem {
  id: string;
  title: string;
  description: string;
  icon: 'car' | 'coffee' | 'shield' | string;
}

export interface LocationHoursItem {
  day: string;
  time: string;
  note?: string;
}

export interface LocationTransitItem {
  id: string;
  icon: 'plane' | 'navigation' | 'building' | string;
  title: string;
  duration: string;
  description: string;
}

export interface LocationSectionData {
  eyebrow: string;
  heading: string;
  subheading: string;
  residence: {
    badge: string;
    wing: string;
    name: string;
    address: string;
    coordinates: string;
    specs: LocationSpecItem[];
  };
  amenitiesHeading: string;
  amenities: LocationAmenityItem[];
  hoursTitle: string;
  hoursBadge: string;
  hours: LocationHoursItem[];
  actions: {
    googleMapsUrl: string;
    googleMapsLabel: string;
    whatsappLabel: string;
    phoneLabel: string;
    phone: string;
  };
  operatoryShowcase: {
    badge: string;
    vista: string;
    caption: string;
  };
  map: {
    region: string;
    coordinates: string;
    markerTitle: string;
    landmarks: Array<{ name: string; note: string }>;
  };
  transitsHeading: string;
  transits: LocationTransitItem[];
}
