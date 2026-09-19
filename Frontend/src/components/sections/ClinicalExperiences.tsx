import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  Sparkles,
  MapPin,
  MessageCircle,
  Calendar,
  Instagram,
  ExternalLink,
  X,
  Radio,
} from 'lucide-react';
import { clinicalExperiencesContent, type ClinicalExperienceItem } from '@/content';
import styles from './ClinicalExperiences.module.css';

import makeoverReel from '@/assets/images/real/makeover_reel.mp4';
import checkupVideo from '@/assets/images/real/checkup_video.mp4';
import surgicalVideo from '@/assets/images/real/gallery_video.mp4';
import protoCase1 from '@/assets/images/real/proto_case1.jpg';
import protoCase2 from '@/assets/images/real/proto_case2.jpg';
import drHassanPortrait from '@/assets/images/real/dr_hassan_clinic_portrait.jpg';

// Video mappings for each experience item (3 completely distinct clinical videos)
const VIDEO_CONFIG: Array<{ src: string; poster: string; instagramLabel: string }> = [
  {
    src: makeoverReel,
    poster: protoCase1,
    instagramLabel: '@ashaesthetics.pk',
  },
  {
    src: checkupVideo,
    poster: protoCase2,
    instagramLabel: '@ashaesthetics.pk',
  },
  {
    src: surgicalVideo,
    poster: drHassanPortrait,
    instagramLabel: '@ashaesthetics.pk',
  },
];

export function ClinicalExperiences() {
  // Track playback status per card index
  const [playingStates, setPlayingStates] = useState<boolean[]>([true, true, true]);

  // Single-active audio state: unmuting one card mutes all others
  const [activeAudioIndex, setActiveAudioIndex] = useState<number | null>(null);

  // Active item for full-screen cinematic modal
  const [activeModalItem, setActiveModalItem] = useState<{
    item: ClinicalExperienceItem;
    videoSrc: string;
  } | null>(null);

  // Video element refs
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  const items = clinicalExperiencesContent.items;

  // Autoplay all videos muted on initial mount
  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (video) {
        video.muted = activeAudioIndex !== index;
        const playPromise = video.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              setPlayingStates((prev) => {
                const next = [...prev];
                next[index] = true;
                return next;
              });
            })
            .catch(() => {
              // Browser policy may require user interaction for unmuted, but muted autoplay succeeds
            });
        }
      }
    });
  }, [activeAudioIndex]);

  // Synchronized audio toggle: unmuting one card mutes all other cards
  const toggleAudio = (index: number) => {
    if (activeAudioIndex === index) {
      // Mute this card
      if (videoRefs.current[index]) {
        videoRefs.current[index]!.muted = true;
      }
      setActiveAudioIndex(null);
    } else {
      // Mute all other cards and unmute this one
      videoRefs.current.forEach((video, i) => {
        if (video) {
          if (i === index) {
            video.muted = false;
            // ensure playing
            video.play().catch(() => {});
          } else {
            video.muted = true;
          }
        }
      });
      setActiveAudioIndex(index);
    }
  };

  // Play / Pause toggle for specific card
  const togglePlay = (index: number) => {
    const video = videoRefs.current[index];
    if (!video) return;

    if (video.paused) {
      video.play().then(() => {
        setPlayingStates((prev) => {
          const next = [...prev];
          next[index] = true;
          return next;
        });
      }).catch(() => {});
    } else {
      video.pause();
      setPlayingStates((prev) => {
        const next = [...prev];
        next[index] = false;
        return next;
      });
    }
  };

  // Close modal on ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveModalItem(null);
      }
    };
    if (activeModalItem) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [activeModalItem]);

  return (
    <section
      id="clinical-experiences"
      className={styles.section}
      aria-labelledby="clinical-experiences-heading"
    >
      <div className={styles.ambientGlow} aria-hidden="true" />

      <div className={styles.container}>
        {/* Editorial Section Header */}
        <div className={styles.header}>
          <div className={styles.labelTag}>
            <Sparkles size={12} className={styles.labelIcon} aria-hidden="true" />
            <span>{clinicalExperiencesContent.label}</span>
          </div>

          <h2 id="clinical-experiences-heading" className={styles.headline}>
            {clinicalExperiencesContent.heading.split('&')[0].trim()} &amp;{' '}
            <span className={styles.headlineAccent}>
              {(clinicalExperiencesContent.heading.split('&')[1] || 'In-Practice Care').trim()}
            </span>
          </h2>

          <p className={styles.subheading}>{clinicalExperiencesContent.subheading}</p>
        </div>

        {/* 3-Column Luxury Cinematic Grid */}
        <div className={styles.grid}>
          {items.map((item, index) => {
            const config = VIDEO_CONFIG[index] || VIDEO_CONFIG[0];
            const isPlaying = playingStates[index] ?? true;
            const isAudioActive = activeAudioIndex === index;

            return (
              <article
                key={item.id}
                className={styles.card}
                aria-label={item.title}
              >
                {/* Architectural Gold Corner Accents */}
                <div className={`${styles.corner} ${styles.cornerTL}`} aria-hidden="true" />
                <div className={`${styles.corner} ${styles.cornerBR}`} aria-hidden="true" />

                {/* Card Top Metadata Bar */}
                <div className={styles.cardTopBar}>
                  <div className={styles.caseBadgeRow}>
                    <span className={styles.caseNumber}>{item.caseNumber}</span>
                    <span className={styles.clinicBadge}>
                      <span className={styles.pulseDot} aria-hidden="true" />
                      {item.badge}
                    </span>
                  </div>

                  {item.instagramUrl && (
                    <a
                      href={item.instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.instaBadgeLink}
                      aria-label={`Open Instagram post for ${item.title}`}
                    >
                      <Instagram size={11} aria-hidden="true" />
                      <span>{config.instagramLabel}</span>
                      <ExternalLink size={9} aria-hidden="true" />
                    </a>
                  )}
                </div>

                {/* Cinematic HD Video Stage */}
                <div className={styles.mediaWrap}>
                  <video
                    ref={(el) => {
                      videoRefs.current[index] = el;
                    }}
                    src={config.src}
                    poster={config.poster}
                    className={styles.mediaVideo}
                    autoPlay
                    loop
                    muted={!isAudioActive}
                    playsInline
                    preload="auto"
                    aria-label={`${item.title} live clinical demonstration`}
                    onPlay={() => {
                      setPlayingStates((prev) => {
                        const next = [...prev];
                        next[index] = true;
                        return next;
                      });
                    }}
                    onPause={() => {
                      setPlayingStates((prev) => {
                        const next = [...prev];
                        next[index] = false;
                        return next;
                      });
                    }}
                  />

                  {/* High-End Glassmorphism Video Overlay */}
                  <div className={styles.mediaOverlay}>
                    {/* Top Overlay Controls */}
                    <div className={`${styles.mediaTopRow} ${styles.interactive}`}>
                      <div className={styles.liveIndicator}>
                        <Radio size={12} className={styles.liveIcon} aria-hidden="true" />
                        <span>4K CLINICAL STREAM</span>
                      </div>

                      <div className={styles.topRightControls}>
                        {/* Audio Toggle Button with Animated Soundwave */}
                        <button
                          type="button"
                          onClick={() => toggleAudio(index)}
                          className={`${styles.glassIconBtn} ${isAudioActive ? styles.audioActiveBtn : ''}`}
                          aria-label={isAudioActive ? `Mute audio for ${item.title}` : `Unmute audio for ${item.title}`}
                          title={isAudioActive ? 'Click to Mute' : 'Click for Live Audio'}
                        >
                          {isAudioActive ? (
                            <>
                              <div className={styles.soundWaves} aria-hidden="true">
                                <span className={styles.soundBar} />
                                <span className={styles.soundBar} />
                                <span className={styles.soundBar} />
                              </div>
                              <Volume2 size={13} aria-hidden="true" />
                            </>
                          ) : (
                            <>
                              <VolumeX size={13} aria-hidden="true" />
                              <span className={styles.audioLabel}>Audio Off</span>
                            </>
                          )}
                        </button>

                        {/* Fullscreen Expand Lightbox Button */}
                        <button
                          type="button"
                          onClick={() =>
                            setActiveModalItem({
                              item,
                              videoSrc: config.src,
                            })
                          }
                          className={styles.glassIconBtn}
                          aria-label={`Expand ${item.title} to full screen`}
                          title="Full Cinematic View"
                        >
                          <Maximize2 size={13} aria-hidden="true" />
                        </button>
                      </div>
                    </div>

                    {/* Center Play / Pause Click Target */}
                    <div className={`${styles.centerControl} ${styles.interactive}`}>
                      <button
                        type="button"
                        onClick={() => togglePlay(index)}
                        className={`${styles.playBtn} ${!isPlaying ? styles.playBtnVisible : ''}`}
                        aria-label={isPlaying ? `Pause video for ${item.title}` : `Play video for ${item.title}`}
                      >
                        {isPlaying ? <Pause size={20} fill="#0f0d0b" /> : <Play size={20} fill="#0f0d0b" />}
                      </button>
                    </div>

                    {/* Bottom Vignette Overlay */}
                    <div className={styles.mediaBottomRow}>
                      <div className={styles.mediaDoctorBadge}>
                        <span>{item.doctor}</span>
                      </div>
                      <div className={styles.hdPill}>
                        <span>FULL HD · 60FPS</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Editorial Information Body */}
                <div className={styles.cardBody}>
                  <div className={styles.locationRow}>
                    <MapPin size={13} className={styles.locationPin} aria-hidden="true" />
                    <span>{item.location}</span>
                  </div>

                  <h3 className={styles.cardTitle}>{item.title}</h3>
                  <p className={styles.cardSubtitle}>{item.subtitle}</p>
                  <p className={styles.cardDesc}>{item.description}</p>

                  {/* Clinical Procedure Tags */}
                  <div className={styles.tagList} aria-label="Clinical procedures covered">
                    {item.tags.map((tag) => (
                      <span key={tag} className={styles.tag}>
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* High-Conversion Action CTAs */}
                  <div className={styles.actionRow}>
                    <Link
                      to={`/contact?case=${encodeURIComponent(item.inquiryCaseName)}&category=Clinical%20Experience`}
                      className={styles.primaryBtn}
                    >
                      <Calendar size={13} aria-hidden="true" />
                      <span>Book Consultation</span>
                    </Link>

                    <a
                      href={`https://wa.me/923349295638?text=${encodeURIComponent(item.whatsappMessage)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.whatsappBtn}
                      aria-label={`Inquire about ${item.title} on WhatsApp`}
                    >
                      <MessageCircle size={13} aria-hidden="true" />
                      <span>WhatsApp</span>
                    </a>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* Cinematic Modal Lightbox */}
      {activeModalItem && (
        <div
          className={styles.modalOverlay}
          role="dialog"
          aria-modal="true"
          aria-label={activeModalItem.item.title}
          onClick={() => setActiveModalItem(null)}
        >
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className={styles.modalCloseBtn}
              onClick={() => setActiveModalItem(null)}
              aria-label="Close cinematic lightbox"
            >
              <X size={18} />
            </button>

            <div className={styles.modalVideoWrap}>
              <video
                src={activeModalItem.videoSrc}
                autoPlay
                controls
                playsInline
                className={styles.modalVideo}
              />
            </div>

            <div className={styles.modalBody}>
              <div className={styles.modalMetaRow}>
                <span className={styles.caseNumber}>{activeModalItem.item.caseNumber}</span>
                <div className={styles.locationRow}>
                  <MapPin size={13} className={styles.locationPin} />
                  <span>{activeModalItem.item.location}</span>
                </div>
              </div>

              <h3 className={styles.modalTitle}>{activeModalItem.item.title}</h3>
              <p className={styles.modalSubtitle}>
                {activeModalItem.item.doctor} · {activeModalItem.item.subtitle}
              </p>
              <p className={styles.cardDesc}>{activeModalItem.item.description}</p>

              <div className={styles.modalActions}>
                <Link
                  to={`/contact?case=${encodeURIComponent(activeModalItem.item.inquiryCaseName)}&category=Clinical%20Experience`}
                  className={styles.primaryBtn}
                  onClick={() => setActiveModalItem(null)}
                >
                  <Calendar size={14} />
                  <span>Book Clinical Consultation</span>
                </Link>

                <a
                  href={`https://wa.me/923349295638?text=${encodeURIComponent(activeModalItem.item.whatsappMessage)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.whatsappBtn}
                >
                  <MessageCircle size={14} />
                  <span>Direct WhatsApp Inquiry</span>
                </a>

                {activeModalItem.item.instagramUrl && (
                  <a
                    href={activeModalItem.item.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.instaGhostBtn}
                  >
                    <Instagram size={14} />
                    <span>View on Instagram</span>
                    <ExternalLink size={12} />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
