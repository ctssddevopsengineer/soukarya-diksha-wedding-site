export const RESPONSIVE_VALIDATION_WIDTHS = Object.freeze([320, 360, 390, 430, 768, 1024, 1440]);

export function viewportBucket(width) {
  const value = Number(width);
  if (!Number.isFinite(value) || value <= 0) return 'invalid';
  if (value <= 360) return 'compact-phone';
  if (value <= 430) return 'phone';
  if (value <= 680) return 'large-phone';
  if (value <= 1024) return 'tablet';
  return 'desktop';
}
