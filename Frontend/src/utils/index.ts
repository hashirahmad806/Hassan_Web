/**
 * Checks if WebGL is supported in the current browser.
 */
export function isWebGLSupported(): boolean {
  try {
    const canvas = document.createElement('canvas');
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    );
  } catch {
    return false;
  }
}

/**
 * Combines reduced motion preference with low-end device detection.
 */
export function shouldDisableHeavyEffects(
  reducedMotion: boolean,
  isLowEnd: boolean,
): boolean {
  return reducedMotion || isLowEnd || !isWebGLSupported();
}

/**
 * Formats a phone number for tel: links.
 */
export function formatPhoneLink(phone: string): string {
  return `tel:${phone.replace(/\D/g, '')}`;
}

/**
 * Formats a phone number and optional prefilled message for WhatsApp links.
 */
export function formatWhatsAppLink(phone: string, message?: string): string {
  const cleanNumber = phone.replace(/\D/g, '');
  if (message) {
    return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
  }
  return `https://wa.me/${cleanNumber}`;
}
