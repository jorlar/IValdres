export interface BaseItem {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
}

export interface Hotel extends BaseItem {
  priceRange: string;
  rating: number;
  amenities: string[];
  address: string;
  website: string;
  phone: string;
  openingHours: string;
}

export interface Restaurant extends BaseItem {
  cuisine: string;
  priceRange: string;
  rating: number;
  address: string;
  website: string;
  phone: string;
  openingHours: string;
}

export interface Shop extends BaseItem {
  category: string;
  openingHours: string;
  address: string;
  website: string;
  phone: string;
}

export interface Activity extends BaseItem {
  duration: string;
  difficulty: string;
  season: string[];
  priceRange: string;
  rating: number;
  address: string;
  website: string;
  phone: string;
}

export interface Event extends BaseItem {
  date: string;
  time: string;
  location: string;
  price: string;
  organizer: string;
  website: string;
  phone: string;
}

export type ListingItem = Hotel | Restaurant | Shop | Activity | Event; 