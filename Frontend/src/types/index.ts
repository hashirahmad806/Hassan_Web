export interface NavLink {
  label: string;
  href: string;
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
