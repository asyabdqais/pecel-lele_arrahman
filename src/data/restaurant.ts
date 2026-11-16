import restaurantJson from './restaurant.json';

export interface RestaurantInfo {
  name: string;
  tagline: string;
  badge: string;
  heroImage: string;
  aboutImage: string;
  welcomeHeading: string;
  welcomeDescription: string[];
  phone: string;
  phoneFormatted: string;
  whatsappNumber: string;
  address: string;
  locationKm: string;
  locationDescription: string;
  instagramHandle: string;
  instagramUrl: string;
  googleMapsUrl: string;
  openingHours: string;
  vision: string;
  missions: string[];
  principles: string[];
}

export const restaurantData: RestaurantInfo = restaurantJson as RestaurantInfo;

export function createWhatsAppOrderUrl(itemName?: string): string {
  const base = `https://wa.me/${restaurantData.whatsappNumber}`;
  const defaultText = itemName 
    ? `Halo Pecel Lele Al Rahman, saya ingin pesan menu: *${itemName}*. Mohon informasi ketersediaannya ya.`
    : `Halo Pecel Lele Al Rahman, saya ingin menanyakan menu dan memesan makanan. Mohon infonya, terima kasih.`;
  return `${base}?text=${encodeURIComponent(defaultText)}`;
}
