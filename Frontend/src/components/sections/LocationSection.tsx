import { useState } from 'react';
import {
  MapPin,
  Clock,
  Phone,
  MessageCircle,
  Copy,
  Check,
  Building,
  Car,
  Coffee,
  ShieldCheck,
  Plane,
  Navigation,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Sparkles,
  ArrowUpRight,
} from 'lucide-react';
import { locationSectionContent } from '@/content';
import { formatPhoneLink, formatWhatsAppLink } from '@/utils';
import clinicOperatoryImg from '@/assets/images/real/dr_hassan_clinic_portrait.jpg';
import styles from './LocationSection.module.css';

interface LocationSectionProps {
  id?: string;
  className?: string;
}

export function LocationSection({
  id = 'location',
  className = '',
}: LocationSectionProps) {
  const content = locationSectionContent;
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [copied, setCopied] = useState<boolean>(false);
  const [activeTransit, setActiveTransit] = useState<string>(content.transits[0]?.id ?? '');

  // Copy coordinates to clipboard with feedback state
  const handleCopyCoordinates = () => {
    navigator.clipboard.writeText(content.residence.coordinates);
    setCopied(true);
    setTimeout(() => setCopied(false), 2400);
  };

  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 0.25, 2));
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 0.25, 0.75));
  };

  const handleResetZoom = () => {
    setZoomLevel(1);
  };

  // Icon mapping helper for amenities
  const renderAmenityIcon = (iconName: string) => {
    switch (iconName) {
      case 'car':
        return <Car size={20} />;
      case 'coffee':
        return <Coffee size={20} />;
      case 'shield':
        return <ShieldCheck size={20} />;
      default:
        return <Sparkles size={20} />;
    }
  };

  // Icon mapping helper for transit
  const renderTransitIcon = (iconName: string) => {
    switch (iconName) {
      case 'plane':
        return <Plane size={18} />;
      case 'navigation':
        return <Navigation size={18} />;
      case 'building':
        return <Building size={18} />;
      default:
        return <MapPin size={18} />;
    }
  };

  return (
    <section
      id={id}
      aria-label="Clinic Sanctuary and Location"
      className={`${styles.sanctuarySection} ${className}`}
    >
      {/* Ambient Lighting Orbs */}
      <div className={styles.ambientOrb1} aria-hidden="true" />
      <div className={styles.ambientOrb2} aria-hidden="true" />
      <div className={styles.topGoldRule} aria-hidden="true" />
      <div className={styles.bottomGoldRule} aria-hidden="true" />

      <div className="container-main relative z-10">
        {/* ── SECTION HEADER ──────────────────────────────────────────────── */}
        <header className="mb-14 max-w-3xl">
          {/* Pulsing Live Eyebrow Badge */}
          <div className="mb-5 inline-flex items-center gap-2.5 rounded-full border border-gold-accent/30 bg-[#1A1410]/80 px-4 py-1.5 backdrop-blur-md">
            <span className="relative flex h-2 w-2" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            <span className="font-label-caps text-[11px] uppercase tracking-[0.2em] text-gold-accent">
              {content.eyebrow}
            </span>
          </div>

          {/* Editorial Display Heading */}
          <h2 className="font-display-lg text-headline-lg-mobile text-inverse-on-surface md:text-headline-lg">
            {content.heading.split('Precision')[0]}
            <span className="italic text-gold-accent">Precision</span>
            {content.heading.split('Precision')[1] || ' Meets Discretion'}
          </h2>

          <p className="mt-4 font-body-lg text-base leading-relaxed text-inverse-on-surface/75 md:text-lg">
            {content.subheading}
          </p>
        </header>

        {/* ── MAIN DUAL-COLUMN GRID ───────────────────────────────────────── */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* ================= LEFT COLUMN: CLINICAL SANCTUARY DOSSIER (7 Cols) ================= */}
          <div className="flex flex-col gap-8 lg:col-span-7">
            {/* 1. Primary Physical Address & Residence Card */}
            <div
              className={`relative rounded-2xl border border-gold-accent/25 bg-[#14110E]/90 p-7 md:p-8 backdrop-blur-xl ${styles.glowCard}`}
            >
              {/* Corner Brackets */}
              <div className={styles.cornerTL} aria-hidden="true" />
              <div className={styles.cornerTR} aria-hidden="true" />
              <div className={styles.cornerBL} aria-hidden="true" />
              <div className={styles.cornerBR} aria-hidden="true" />

              <div className="flex items-start gap-4 md:gap-5">
                <div className="mt-1 flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-gold-accent/40 bg-gold-accent/10 text-gold-accent">
                  <MapPin size={24} aria-hidden="true" />
                </div>

                <div className="flex-1">
                  <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                    <span className="font-label-caps text-[11px] uppercase tracking-widest text-gold-accent">
                      {content.residence.badge}
                    </span>
                    <span className="font-mono text-xs text-muted-silver">
                      {content.residence.wing}
                    </span>
                  </div>

                  <h3 className="font-headline-md text-xl font-medium text-inverse-on-surface md:text-2xl">
                    {content.residence.name}
                  </h3>

                  <p className="mt-1 font-body-md text-sm text-inverse-on-surface/80 md:text-base">
                    {content.residence.address}
                  </p>

                  {/* Building Specs Bar */}
                  <div className="mt-6 grid grid-cols-1 gap-3 border-t border-gold-accent/20 pt-5 sm:grid-cols-3">
                    {content.residence.specs.map((spec) => (
                      <div
                        key={spec.label}
                        className="flex items-center gap-2 text-xs text-inverse-on-surface/90"
                      >
                        <Building size={14} className="shrink-0 text-gold-accent" />
                        <span>{spec.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* 2. Exclusive Sanctuary Amenities */}
            <div>
              <div className="mb-4 flex items-center justify-between">
                <h4 className="font-label-caps text-xs uppercase tracking-widest text-gold-accent">
                  {content.amenitiesHeading}
                </h4>
                <span className="text-[11px] text-muted-silver">Private Patient Protocol</span>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                {content.amenities.map((amenity) => (
                  <div
                    key={amenity.id}
                    className={`rounded-xl border border-gold-accent/20 bg-[#14110E]/80 p-5 ${styles.amenityCard}`}
                  >
                    <div
                      className={`mb-4 flex h-10 w-10 items-center justify-center rounded-xl border border-gold-accent/30 bg-gold-accent/10 text-gold-accent ${styles.amenityIconBox}`}
                    >
                      {renderAmenityIcon(amenity.icon)}
                    </div>
                    <h5 className="font-headline-md text-sm font-semibold text-inverse-on-surface">
                      {amenity.title}
                    </h5>
                    <p className="mt-1.5 font-body-sm text-xs leading-relaxed text-inverse-on-surface/70">
                      {amenity.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* 3. Clinical Consultation Ledger (Hours) */}
            <div className="relative rounded-2xl border border-gold-accent/20 bg-[#16120E]/85 p-6 backdrop-blur-md">
              <div className="mb-4 flex items-center justify-between border-b border-gold-accent/15 pb-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gold-accent/10 text-gold-accent">
                    <Clock size={18} aria-hidden="true" />
                  </div>
                  <h4 className="font-headline-md text-lg text-inverse-on-surface">
                    {content.hoursTitle}
                  </h4>
                </div>
                <span className="rounded-full border border-gold-accent/30 bg-gold-accent/5 px-3 py-1 font-label-caps text-[10px] uppercase tracking-wider text-gold-accent">
                  {content.hoursBadge}
                </span>
              </div>

              <div className="divide-y divide-gold-accent/10">
                {content.hours.map((slot) => (
                  <div
                    key={slot.day}
                    className="flex flex-col justify-between py-3 sm:flex-row sm:items-center"
                  >
                    <span className="font-body-md text-sm font-medium text-inverse-on-surface">
                      {slot.day}
                    </span>
                    <div className="mt-1 text-left sm:mt-0 sm:text-right">
                      <span className="font-body-md text-sm font-semibold text-gold-accent">
                        {slot.time}
                      </span>
                      {slot.note && (
                        <span className="block text-xs text-muted-silver">{slot.note}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 4. Concierge Action Dock */}
            <div className="flex flex-col gap-3.5 sm:flex-row">
              {/* Primary Google Maps CTA */}
              <a
                href={content.actions.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex-1 inline-flex items-center justify-center gap-2.5 rounded-full px-6 py-3.5 font-button text-xs uppercase tracking-widest ${styles.primaryGoldButton}`}
              >
                <ArrowUpRight size={17} />
                <span>{content.actions.googleMapsLabel}</span>
              </a>

              {/* WhatsApp Concierge */}
              <a
                href={formatWhatsAppLink(content.actions.phone)}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center justify-center gap-2 rounded-full px-5 py-3.5 font-label-button text-xs uppercase tracking-wider ${styles.secondaryOutlineButton}`}
              >
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                <MessageCircle size={16} className="text-emerald-400" />
                <span>{content.actions.whatsappLabel}</span>
              </a>

              {/* Direct Phone Dial */}
              <a
                href={formatPhoneLink(content.actions.phone)}
                className={`inline-flex items-center justify-center gap-2 rounded-full px-5 py-3.5 font-label-button text-xs uppercase tracking-wider ${styles.secondaryOutlineButton}`}
              >
                <Phone size={15} className="text-gold-accent" />
                <span>{content.actions.phoneLabel}</span>
              </a>
            </div>
          </div>

          {/* ================= RIGHT COLUMN: MAP & OPERATORY SHOWCASE (5 Cols) ================= */}
          <div className="flex flex-col gap-8 lg:col-span-5">
            {/* 1. Clinic Sanctuary Photography Display */}
            <div className="group relative overflow-hidden rounded-2xl border border-gold-accent/30 shadow-2xl">
              {/* Corner Brackets */}
              <div className={styles.cornerTL} aria-hidden="true" />
              <div className={styles.cornerTR} aria-hidden="true" />
              <div className={styles.cornerBL} aria-hidden="true" />
              <div className={styles.cornerBR} aria-hidden="true" />

              {/* Floating Operatory Badge */}
              <div className="absolute left-4 top-4 z-20 flex items-center gap-2 rounded-full border border-gold-accent/30 bg-[#0F0D0B]/85 px-3.5 py-1.5 shadow-lg backdrop-blur-md">
                <span className="h-2 w-2 rounded-full bg-gold-accent" />
                <span className="font-label-caps text-[10px] uppercase tracking-wider text-surface-bright">
                  {content.operatoryShowcase.badge}
                </span>
              </div>

              {/* Panoramic Specs Pill */}
              <div className="absolute bottom-4 right-4 z-20 rounded border border-gold-accent/20 bg-[#0F0D0B]/80 px-2.5 py-1 font-mono text-[11px] text-gold-accent backdrop-blur-sm">
                {content.operatoryShowcase.vista}
              </div>

              {/* Operatory Image Container */}
              <div className="relative aspect-[16/11] w-full overflow-hidden bg-[#14110E]">
                <img
                  src={clinicOperatoryImg}
                  alt={content.operatoryShowcase.caption}
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0F0D0B]/80 via-transparent to-black/30" />
              </div>
            </div>

            {/* 2. Stylized Luxury Interactive Map Visual */}
            <div className="relative overflow-hidden rounded-2xl border border-gold-accent/25 bg-[#14110E]/90 p-5 backdrop-blur-xl">
              {/* Header with Coordinates and Copy Action */}
              <div className="mb-3 flex items-center justify-between">
                <span className="font-label-caps text-[11px] uppercase tracking-wider text-gold-accent">
                  {content.map.region}
                </span>

                <button
                  type="button"
                  onClick={handleCopyCoordinates}
                  className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] transition-colors ${styles.coordBadge} hover:border-gold-accent`}
                  title="Click to copy exact GPS coordinates"
                  aria-label="Copy GPS coordinates"
                >
                  {copied ? (
                    <>
                      <Check size={12} className="text-emerald-400" />
                      <span className="text-emerald-400">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy size={12} className="text-gold-accent" />
                      <span>{content.map.coordinates}</span>
                    </>
                  )}
                </button>
              </div>

              {/* Cartography Simulation Viewport */}
              <div
                className={`relative flex h-64 w-full items-center justify-center rounded-xl border border-gold-accent/20 ${styles.cartographyCanvas}`}
              >
                {/* Scalable Map Graphic Layer */}
                <div
                  className="absolute inset-0 transition-transform duration-300"
                  style={{ transform: `scale(${zoomLevel})` }}
                >
                  {/* Subtle Geographic Arteries */}
                  <div
                    className="absolute inset-0 opacity-40"
                    aria-hidden="true"
                  >
                    {/* Grand Trunk Expressway line */}
                    <div className="absolute left-0 top-1/2 h-0.5 w-full -rotate-6 bg-gradient-to-r from-gold-accent/10 via-gold-accent/50 to-gold-accent/10" />
                    {/* University road arterial */}
                    <div className="absolute left-1/3 top-0 h-full w-0.5 rotate-12 bg-gold-accent/30" />
                    <div className="absolute right-1/4 top-1/4 h-32 w-32 rounded-full border border-gold-accent/15" />
                  </div>

                  {/* Landmark Tags */}
                  {content.map.landmarks.map((lm, idx) => (
                    <div
                      key={lm.name}
                      className={`absolute font-mono text-[10px] text-muted-silver/80 ${
                        idx === 0
                          ? 'left-6 top-5 text-left'
                          : idx === 1
                          ? 'bottom-6 right-6 text-right'
                          : 'bottom-4 left-6 text-left'
                      }`}
                    >
                      <span className="block font-sans font-semibold text-surface-bright/90">
                        {lm.name}
                      </span>
                      <span>{lm.note}</span>
                    </div>
                  ))}

                  {/* GS Tower Pulsing Beacon Marker (Center) */}
                  <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center">
                    <div className="relative flex items-center justify-center">
                      <div
                        className={`absolute h-16 w-16 rounded-full bg-gold-accent/20 ${styles.radarRing1}`}
                        aria-hidden="true"
                      />
                      <div
                        className={`absolute h-10 w-10 rounded-full bg-gold-accent/35 ${styles.radarRing2}`}
                        aria-hidden="true"
                      />
                      <div className="h-4 w-4 rounded-full border-2 border-[#0F0D0B] bg-gold-accent shadow-[0_0_16px_#D0B892]" />
                    </div>

                    {/* Marker Label */}
                    <div className="mt-2.5 flex items-center gap-1.5 rounded-full border border-gold-accent/60 bg-[#0F0D0B]/95 px-3 py-1 shadow-2xl backdrop-blur-md">
                      <Building size={12} className="text-gold-accent" />
                      <span className="font-button text-[11px] font-semibold tracking-wider text-surface-bright">
                        {content.map.markerTitle}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Map Control Toolbar */}
                <div className="absolute bottom-3 right-3 z-20 flex items-center gap-1.5 rounded-full border border-gold-accent/30 bg-[#0F0D0B]/85 p-1 backdrop-blur-md">
                  <button
                    type="button"
                    onClick={handleZoomIn}
                    disabled={zoomLevel >= 2}
                    className="flex h-7 w-7 items-center justify-center rounded-full text-surface-bright/90 transition-colors hover:bg-gold-accent/20 hover:text-gold-accent disabled:opacity-40"
                    aria-label="Zoom in map"
                  >
                    <ZoomIn size={14} />
                  </button>
                  <button
                    type="button"
                    onClick={handleZoomOut}
                    disabled={zoomLevel <= 0.75}
                    className="flex h-7 w-7 items-center justify-center rounded-full text-surface-bright/90 transition-colors hover:bg-gold-accent/20 hover:text-gold-accent disabled:opacity-40"
                    aria-label="Zoom out map"
                  >
                    <ZoomOut size={14} />
                  </button>
                  <button
                    type="button"
                    onClick={handleResetZoom}
                    className="flex h-7 w-7 items-center justify-center rounded-full text-surface-bright/90 transition-colors hover:bg-gold-accent/20 hover:text-gold-accent"
                    aria-label="Reset map zoom"
                  >
                    <RotateCcw size={13} />
                  </button>
                </div>

                {/* Compass Marker */}
                <div className="absolute left-3 top-3 z-20 flex items-center gap-1 rounded bg-[#0F0D0B]/70 px-2 py-0.5 font-mono text-[10px] text-gold-accent/80 backdrop-blur-sm">
                  <Navigation size={10} className="rotate-45" />
                  <span>N 12° E</span>
                </div>
              </div>
            </div>

            {/* 3. Transit & Arrival Guidance */}
            <div className="flex flex-col gap-3">
              <h5 className="font-label-caps text-xs uppercase tracking-wider text-gold-accent">
                {content.transitsHeading}
              </h5>

              <div className="space-y-2.5">
                {content.transits.map((transit) => {
                  const isSelected = activeTransit === transit.id;
                  return (
                    <div
                      key={transit.id}
                      onClick={() => setActiveTransit(transit.id)}
                      className={`cursor-pointer rounded-xl border p-4 ${
                        isSelected
                          ? 'border-gold-accent/50 bg-[#1c1612]'
                          : 'border-gold-accent/15 bg-[#14110E]/70'
                      } ${styles.transitCard}`}
                    >
                      <div className="flex items-start gap-3.5">
                        <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gold-accent/30 bg-gold-accent/10 text-gold-accent">
                          {renderTransitIcon(transit.icon)}
                        </div>

                        <div className="flex-1">
                          <div className="flex items-baseline justify-between">
                            <h6 className="font-headline-md text-sm font-semibold text-inverse-on-surface">
                              {transit.title}
                            </h6>
                            <span className="font-mono text-xs font-medium text-gold-accent">
                              {transit.duration}
                            </span>
                          </div>
                          <p className="mt-1 font-body-sm text-xs leading-relaxed text-inverse-on-surface/70">
                            {transit.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LocationSection;
