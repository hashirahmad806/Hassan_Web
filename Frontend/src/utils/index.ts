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
 * Formats a phone number for WhatsApp links.
 */
export function formatWhatsAppLink(phone: string): string {
  return `https://wa.me/${phone.replace(/\D/g, '')}`;
}
