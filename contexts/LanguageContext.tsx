import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';

export type Language = 'en' | 'no';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.shopping': 'Shopping',
    'nav.hotels': 'Hotels',
    'nav.restaurants': 'Restaurants',
    'nav.activities': 'Activities',
    'nav.events': 'Events',
    
    // Common
    'common.loading': 'Loading...',
    'common.error': 'An error occurred',
    'common.notFound': 'Item not found',
    'common.address': 'Address',
    'common.website': 'Website',
    'common.phone': 'Phone',
    'common.openingHours': 'Opening Hours',
    'common.price': 'Price',
    'common.rating': 'Rating',
    'common.description': 'Description',
    'common.viewDetails': 'View Details',
    'common.noItems': 'No items found',
    'common.search': 'Search',
    'common.filter': 'Filter',
    'common.sort': 'Sort',
    'common.more': 'More',
    
    // Hotels
    'hotel.amenities': 'Amenities',
    'hotel.priceRange': 'Price Range',
    'hotel.rooms': 'Rooms',
    'hotel.checkIn': 'Check-in',
    'hotel.checkOut': 'Check-out',
    'hotel.facilities': 'Facilities',
    'hotel.services': 'Services',
    'hotel.location': 'Location',
    'hotel.reviews': 'Reviews',
    'hotel.amenities.wifi': 'Free WiFi',
    'hotel.amenities.parking': 'Free Parking',
    'hotel.amenities.breakfast': 'Breakfast Included',
    'hotel.amenities.pool': 'Swimming Pool',
    'hotel.amenities.spa': 'Spa',
    'hotel.amenities.gym': 'Fitness Center',
    'hotel.amenities.restaurant': 'Restaurant',
    'hotel.amenities.bar': 'Bar',
    'hotel.amenities.roomService': 'Room Service',
    'hotel.amenities.conference': 'Conference Facilities',
    'hotel.amenities.pets': 'Pet Friendly',
    
    // Restaurants
    'restaurant.cuisine': 'Cuisine',
    'restaurant.menu': 'Menu',
    'restaurant.reservations': 'Reservations',
    'restaurant.delivery': 'Delivery',
    'restaurant.takeaway': 'Takeaway',
    'restaurant.dietary': 'Dietary Options',
    'restaurant.parking': 'Parking',
    'restaurant.outdoor': 'Outdoor Seating',
    'restaurant.cuisine.norwegian': 'Norwegian',
    'restaurant.cuisine.international': 'International',
    'restaurant.cuisine.local': 'Local',
    'restaurant.cuisine.fineDining': 'Fine Dining',
    'restaurant.cuisine.casual': 'Casual Dining',
    'restaurant.cuisine.cafe': 'Café',
    'restaurant.cuisine.pub': 'Pub',
    
    // Activities
    'activity.details': 'Activity Details',
    'activity.duration': 'Duration',
    'activity.difficulty': 'Difficulty',
    'activity.season': 'Season',
    'activity.booking': 'Booking',
    'activity.requirements': 'Requirements',
    'activity.equipment': 'Equipment',
    'activity.guide': 'Guide',
    'activity.location': 'Location',
    'activity.price': 'Price per Person',
    'activity.difficulty.easy': 'Easy',
    'activity.difficulty.medium': 'Medium',
    'activity.difficulty.hard': 'Hard',
    'activity.season.summer': 'Summer',
    'activity.season.winter': 'Winter',
    'activity.season.allYear': 'All Year',
    'activity.type.hiking': 'Hiking',
    'activity.type.skiing': 'Skiing',
    'activity.type.fishing': 'Fishing',
    'activity.type.cultural': 'Cultural',
    
    // Events
    'event.details': 'Event Details',
    'event.date': 'Date',
    'event.time': 'Time',
    'event.organizer': 'Organizer',
    'event.location': 'Location',
    'event.tickets': 'Tickets',
    'event.schedule': 'Schedule',
    'event.contact': 'Contact',
    'event.registration': 'Registration',
    'event.capacity': 'Capacity',
    'event.type.cultural': 'Cultural',
    'event.type.sports': 'Sports',
    'event.type.music': 'Music',
    'event.type.food': 'Food & Drink',
    'event.type.festival': 'Festival',
    
    // Language
    'language.english': 'English',
    'language.norwegian': 'Norwegian',

    // Home Screen
    'home.quickLinks': 'Quick Links',
    'home.howToUse': 'How to Use the App',
    'home.about.title': 'About Valdres',
    'home.about.description': 'Valdres is a beautiful region in Norway known for its stunning mountains, traditional culture, and outdoor activities. This app helps you discover the best of what Valdres has to offer, from accommodation and dining to activities and events.',
    'home.guides.accommodation.title': 'Finding Accommodation',
    'home.guides.accommodation.description': 'Browse hotels and book your stay in Valdres',
    'home.guides.cuisine.title': 'Discover Local Cuisine',
    'home.guides.cuisine.description': 'Explore restaurants and local food experiences',
    'home.guides.activities.title': 'Plan Your Activities',
    'home.guides.activities.description': 'Find and book activities for your stay',
  },
  no: {
    // Navigation
    'nav.home': 'Hjem',
    'nav.shopping': 'Shopping',
    'nav.hotels': 'Hoteller',
    'nav.restaurants': 'Restauranter',
    'nav.activities': 'Aktiviteter',
    'nav.events': 'Arrangementer',
    
    // Common
    'common.loading': 'Laster...',
    'common.error': 'En feil oppstod',
    'common.notFound': 'Element ikke funnet',
    'common.address': 'Adresse',
    'common.website': 'Nettside',
    'common.phone': 'Telefon',
    'common.openingHours': 'Åpningstider',
    'common.price': 'Pris',
    'common.rating': 'Vurdering',
    'common.description': 'Beskrivelse',
    'common.viewDetails': 'Se detaljer',
    'common.noItems': 'Ingen elementer funnet',
    'common.search': 'Søk',
    'common.filter': 'Filtrer',
    'common.sort': 'Sorter',
    'common.more': 'Mer',
    
    // Hotels
    'hotel.amenities': 'Fasiliteter',
    'hotel.priceRange': 'Prisklasse',
    'hotel.rooms': 'Rom',
    'hotel.checkIn': 'Innsjekk',
    'hotel.checkOut': 'Utsjekk',
    'hotel.facilities': 'Fasiliteter',
    'hotel.services': 'Tjenester',
    'hotel.location': 'Beliggenhet',
    'hotel.reviews': 'Anmeldelser',
    'hotel.amenities.wifi': 'Gratis WiFi',
    'hotel.amenities.parking': 'Gratis Parkering',
    'hotel.amenities.breakfast': 'Frokost Inkludert',
    'hotel.amenities.pool': 'Svømmebasseng',
    'hotel.amenities.spa': 'Spa',
    'hotel.amenities.gym': 'Treningssenter',
    'hotel.amenities.restaurant': 'Restaurant',
    'hotel.amenities.bar': 'Bar',
    'hotel.amenities.roomService': 'Room Service',
    'hotel.amenities.conference': 'Konferansefasiliteter',
    'hotel.amenities.pets': 'Dyrevennlig',
    
    // Restaurants
    'restaurant.cuisine': 'Kjøkken',
    'restaurant.menu': 'Meny',
    'restaurant.reservations': 'Reservasjoner',
    'restaurant.delivery': 'Levering',
    'restaurant.takeaway': 'Takeaway',
    'restaurant.dietary': 'Kostholdsalternativer',
    'restaurant.parking': 'Parkering',
    'restaurant.outdoor': 'Uteservering',
    'restaurant.cuisine.norwegian': 'Norsk',
    'restaurant.cuisine.international': 'Internasjonal',
    'restaurant.cuisine.local': 'Lokal',
    'restaurant.cuisine.fineDining': 'Fine Dining',
    'restaurant.cuisine.casual': 'Casual Dining',
    'restaurant.cuisine.cafe': 'Kafé',
    'restaurant.cuisine.pub': 'Pub',
    
    // Activities
    'activity.details': 'Aktivitetsdetaljer',
    'activity.duration': 'Varighet',
    'activity.difficulty': 'Vanskelighetsgrad',
    'activity.season': 'Sesong',
    'activity.booking': 'Bestilling',
    'activity.requirements': 'Krav',
    'activity.equipment': 'Utstyr',
    'activity.guide': 'Guide',
    'activity.location': 'Beliggenhet',
    'activity.price': 'Pris per person',
    'activity.difficulty.easy': 'Lett',
    'activity.difficulty.medium': 'Middels',
    'activity.difficulty.hard': 'Vanskelig',
    'activity.season.summer': 'Sommer',
    'activity.season.winter': 'Vinter',
    'activity.season.allYear': 'Hele året',
    'activity.type.hiking': 'Turgåing',
    'activity.type.skiing': 'Ski',
    'activity.type.fishing': 'Fiske',
    'activity.type.cultural': 'Kultur',
    
    // Events
    'event.details': 'Arrangementsdetaljer',
    'event.date': 'Dato',
    'event.time': 'Tid',
    'event.organizer': 'Arrangør',
    'event.location': 'Sted',
    'event.tickets': 'Billetter',
    'event.schedule': 'Program',
    'event.contact': 'Kontakt',
    'event.registration': 'Påmelding',
    'event.capacity': 'Kapasitet',
    'event.type.cultural': 'Kultur',
    'event.type.sports': 'Sport',
    'event.type.music': 'Musikk',
    'event.type.food': 'Mat og Drikke',
    'event.type.festival': 'Festival',
    
    // Language
    'language.english': 'Engelsk',
    'language.norwegian': 'Norsk',

    // Home Screen
    'home.quickLinks': 'Hurtiglenker',
    'home.howToUse': 'Slik bruker du appen',
    'home.about.title': 'Om Valdres',
    'home.about.description': 'Valdres er en vakker region i Norge kjent for sine imponerende fjell, tradisjonell kultur og friluftsaktiviteter. Denne appen hjelper deg med å oppdage det beste Valdres har å tilby, fra overnatting og spisesteder til aktiviteter og arrangementer.',
    'home.guides.accommodation.title': 'Finn overnatting',
    'home.guides.accommodation.description': 'Bla gjennom hoteller og bestill ditt opphold i Valdres',
    'home.guides.cuisine.title': 'Opplev lokal mat',
    'home.guides.cuisine.description': 'Utforsk restauranter og lokale matopplevelser',
    'home.guides.activities.title': 'Planlegg aktiviteter',
    'home.guides.activities.description': 'Finn og bestill aktiviteter for ditt opphold',
  },
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');

  useEffect(() => {
    // Load saved language preference
    AsyncStorage.getItem('language').then((savedLanguage) => {
      if (savedLanguage === 'en' || savedLanguage === 'no') {
        setLanguageState(savedLanguage);
      }
    });
  }, []);

  const setLanguage = async (lang: Language) => {
    setLanguageState(lang);
    await AsyncStorage.setItem('language', lang);
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
} 