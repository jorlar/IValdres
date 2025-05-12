export interface Shop {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  address: string;
  openingHours: string;
  category: string;
}

export interface Hotel {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  address: string;
  priceRange: string;
  rating: number;
  amenities: string[];
}

export interface Restaurant {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  address: string;
  cuisine: string;
  priceRange: string;
  openingHours: string;
}

export interface Activity {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  location: string;
  duration: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  season: string[];
  priceRange: string;
  address: string;
  website: string;
  phone: string;
  openingHours: string;
}

export interface Event {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  date: string;
  time: string;
  location: string;
  address: string;
  price: string;
  website: string;
  phone: string;
  category: string;
  organizer: string;
}

export const dummyShops: Shop[] = [
  {
    id: '1',
    name: 'Valdres Husflid',
    description: 'Traditional Norwegian crafts and souvenirs',
    imageUrl: 'https://picsum.photos/400/300',
    address: 'Torget 1, Fagernes',
    openingHours: 'Mon-Fri: 10:00-18:00, Sat: 10:00-16:00',
    category: 'Crafts'
  },
  {
    id: '2',
    name: 'Valdres Sport',
    description: 'Outdoor equipment and sports gear',
    imageUrl: 'https://picsum.photos/400/301',
    address: 'Storgata 15, Fagernes',
    openingHours: 'Mon-Fri: 09:00-20:00, Sat: 10:00-18:00',
    category: 'Sports'
  },
  {
    id: '3',
    name: 'Valdres Mat',
    description: 'Local food products and delicacies',
    imageUrl: 'https://picsum.photos/400/302',
    address: 'Torget 5, Fagernes',
    openingHours: 'Mon-Fri: 09:00-17:00, Sat: 10:00-15:00',
    category: 'Food'
  }
];

export const dummyHotels: Hotel[] = [
  {
    id: '1',
    name: 'Valdres Hotel',
    description: 'Luxury hotel with mountain views',
    imageUrl: 'https://picsum.photos/400/303',
    address: 'Hotellveien 1, Fagernes',
    priceRange: 'NOK 1500-3000',
    rating: 4.5,
    amenities: ['WiFi', 'Spa', 'Restaurant', 'Pool']
  },
  {
    id: '2',
    name: 'Mountain Lodge',
    description: 'Cozy mountain lodge with traditional charm',
    imageUrl: 'https://picsum.photos/400/304',
    address: 'Fjellveien 10, Beitostølen',
    priceRange: 'NOK 1200-2500',
    rating: 4.2,
    amenities: ['WiFi', 'Restaurant', 'Ski Storage']
  },
  {
    id: '3',
    name: 'Valdres Resort',
    description: 'Family-friendly resort with activities',
    imageUrl: 'https://picsum.photos/400/305',
    address: 'Resortveien 5, Øystre Slidre',
    priceRange: 'NOK 1800-3500',
    rating: 4.7,
    amenities: ['WiFi', 'Spa', 'Restaurant', 'Pool', 'Kids Club']
  }
];

export const dummyRestaurants: Restaurant[] = [
  {
    id: '1',
    name: 'Valdres Mat & Vin',
    description: 'Fine dining with local ingredients',
    imageUrl: 'https://picsum.photos/400/306',
    address: 'Restaurantgata 1, Fagernes',
    cuisine: 'Norwegian',
    priceRange: 'NOK 300-600',
    openingHours: 'Tue-Sun: 17:00-22:00'
  },
  {
    id: '2',
    name: 'Fjellstua',
    description: 'Traditional mountain cuisine',
    imageUrl: 'https://picsum.photos/400/307',
    address: 'Fjellveien 20, Beitostølen',
    cuisine: 'Norwegian',
    priceRange: 'NOK 200-400',
    openingHours: 'Daily: 11:00-21:00'
  },
  {
    id: '3',
    name: 'Pizzeria Valdres',
    description: 'Italian cuisine with local twist',
    imageUrl: 'https://picsum.photos/400/308',
    address: 'Torget 3, Fagernes',
    cuisine: 'Italian',
    priceRange: 'NOK 150-300',
    openingHours: 'Daily: 12:00-22:00'
  }
];

export const dummyActivities: Activity[] = [
  {
    id: '1',
    name: 'Mountain Hiking',
    description: 'Guided tour to the top of Mount Valdres',
    imageUrl: 'https://picsum.photos/400/309',
    location: 'Valdres Mountains',
    duration: '4-6 hours',
    difficulty: 'Medium',
    season: ['Summer', 'Autumn'],
    priceRange: 'NOK 500-1000',
    address: 'Valdres Mountains, Norway',
    website: 'https://valdres.no/hiking',
    phone: '+47 123 45 678',
    openingHours: 'Daily 9:00-17:00'
  },
  {
    id: '2',
    name: 'Ski Touring',
    description: 'Backcountry skiing adventure',
    imageUrl: 'https://picsum.photos/400/310',
    location: 'Beitostølen',
    duration: '6-8 hours',
    difficulty: 'Hard',
    season: ['Winter'],
    priceRange: 'NOK 800-1500',
    address: 'Beitostølen Ski Resort, Norway',
    website: 'https://valdres.no/skiing',
    phone: '+47 123 45 679',
    openingHours: 'Daily 8:00-16:00'
  },
  {
    id: '3',
    name: 'Fishing Trip',
    description: 'Guided fishing in local lakes',
    imageUrl: 'https://picsum.photos/400/311',
    location: 'Valdres Lakes',
    duration: '3-4 hours',
    difficulty: 'Easy',
    season: ['Summer', 'Autumn'],
    priceRange: 'NOK 300-600',
    address: 'Valdres Lakes, Norway',
    website: 'https://valdres.no/fishing',
    phone: '+47 123 45 680',
    openingHours: 'Daily 6:00-20:00'
  }
];

export const dummyEvents: Event[] = [
  {
    id: '1',
    name: 'Valdres Folk Festival',
    description: 'Annual celebration of traditional Norwegian folk music and dance',
    imageUrl: 'https://picsum.photos/400/312',
    date: '2024-07-15',
    time: '10:00-22:00',
    location: 'Fagernes Town Square',
    address: 'Torget 1, Fagernes',
    price: 'NOK 350',
    website: 'https://valdres.no/folkfestival',
    phone: '+47 123 45 681',
    category: 'Culture',
    organizer: 'Valdres Cultural Association'
  },
  {
    id: '2',
    name: 'Valdres Ski Marathon',
    description: 'Annual cross-country skiing competition for all levels',
    imageUrl: 'https://picsum.photos/400/313',
    date: '2024-02-25',
    time: '09:00-16:00',
    location: 'Beitostølen Ski Center',
    address: 'Ski Center 1, Beitostølen',
    price: 'NOK 500',
    website: 'https://valdres.no/skimarathon',
    phone: '+47 123 45 682',
    category: 'Sports',
    organizer: 'Valdres Ski Association'
  },
  {
    id: '3',
    name: 'Valdres Food Festival',
    description: 'Celebration of local food and culinary traditions',
    imageUrl: 'https://picsum.photos/400/314',
    date: '2024-08-10',
    time: '11:00-20:00',
    location: 'Valdres Market Square',
    address: 'Markedsplassen 1, Fagernes',
    price: 'Free',
    website: 'https://valdres.no/foodfestival',
    phone: '+47 123 45 683',
    category: 'Food',
    organizer: 'Valdres Food Association'
  }
]; 