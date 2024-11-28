export function generateEntryCode(promotionId: string): string {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 6);
  const prefix = promotionId.substring(0, 3).toUpperCase();
  return `${prefix}-${timestamp}${random}`.toUpperCase();
}