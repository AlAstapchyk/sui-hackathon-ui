import { SERVICES, ServiceData } from "@/app/data/services";

export function getService(id: string): ServiceData | undefined {
  return SERVICES.find((s) => s.id === id);
}

export function formatPrice(priceMist: number): string {
  const priceInSui = priceMist / 1_000_000_000;
  if (priceInSui >= 1) return priceInSui.toFixed(4);
  if (priceInSui >= 0.001) return (priceInSui * 1000).toFixed(4) + "m";
  return (priceMist / 1_000_000).toFixed(4) + "μ";
}

export function formatSubscriptionAmount(amount: number): string {
  if (amount >= 1_000_000_000) {
    return `${(amount / 1_000_000_000).toFixed(4)} SUI`;
  }
  if (amount >= 1_000_000) {
    return `${(amount / 1_000_000).toFixed(2)}M MIST`;
  }
  if (amount >= 1_000) {
    return `${(amount / 1_000).toFixed(2)}K MIST`;
  }
  return `${amount} MIST`;
}
