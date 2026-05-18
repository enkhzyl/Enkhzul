export function getDiscountedPrice(basePrice: number, discount?: number): number {
  if (!discount) return basePrice;
  return Math.round(basePrice * (1 - discount / 100));
}
