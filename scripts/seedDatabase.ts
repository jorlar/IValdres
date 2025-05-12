import { collection, doc, getDocs, setDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { Activity, Event, Hotel, Restaurant, Shop } from '../types';

// Sample images from Unsplash
const SAMPLE_IMAGES = {
  hotels: [
    'https://images.unsplash.com/photo-1566073771259-6a8506099945',
    'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa',
    'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4'
  ],
  restaurants: [
    'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4',
    'https://images.unsplash.com/photo-1555396273-367ea4eb4db5',
    'https://images.unsplash.com/photo-1414235077428-338989a2e8c0'
  ],
  shops: [
    'https://images.unsplash.com/photo-1441986300917-64674bd600d8',
    'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04',
    'https://images.unsplash.com/photo-1472851294608-062f824d29cc'
  ],
  activities: [
    'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800',
    'https://images.unsplash.com/photo-1501554728187-ce583db33af7',
    'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1'
  ],
  events: [
    'https://images.unsplash.com/photo-1511795409834-ef04bbd61622',
    'https://images.unsplash.com/photo-1514525253161-7a46d19cd819',
    'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3'
  ]
};

const seedHotels = async () => {
  try {
    console.log('Seeding hotels...');
    const hotels: Omit<Hotel, 'id'>[] = [
      {
        name: 'Valdres Fjellhotell',
        description: 'Luxury mountain hotel with stunning views',
        imageUrl: SAMPLE_IMAGES.hotels[0],
        rating: 4.5,
        priceRange: '$$$',
        amenities: ['WiFi', 'Restaurant', 'Spa', 'Pool'],
        address: 'Fjellveien 1, 2900 Fagernes',
        phone: '+47 61 35 00 00',
        website: 'https://valdresfjellhotell.no',
        openingHours: '24/7'
      },
      {
        name: 'Fagernes Hotel',
        description: 'Central hotel in the heart of Fagernes',
        imageUrl: SAMPLE_IMAGES.hotels[1],
        rating: 4.0,
        priceRange: '$$',
        amenities: ['WiFi', 'Bar', 'Conference rooms'],
        address: 'Storgata 15, 2900 Fagernes',
        phone: '+47 61 35 00 01',
        website: 'https://fagerneshotel.no',
        openingHours: '24/7'
      }
    ];

    for (const hotel of hotels) {
      const docRef = doc(collection(db, 'hotels'));
      await setDoc(docRef, hotel, { merge: true });
      console.log(`Updated hotel with ID: ${docRef.id}`);
    }
  } catch (error) {
    console.error('Error seeding hotels:', error);
    throw error;
  }
};

const seedRestaurants = async () => {
  try {
    console.log('Seeding restaurants...');
    const restaurants: Omit<Restaurant, 'id'>[] = [
      {
        name: 'Fjellstua Restaurant',
        description: 'Traditional Norwegian cuisine with a modern twist',
        imageUrl: SAMPLE_IMAGES.restaurants[0],
        rating: 4.7,
        priceRange: '$$$',
        cuisine: 'Norwegian',
        address: 'Fjellstua 1, 2900 Fagernes',
        phone: '+47 61 35 00 02',
        website: 'https://fjellstua.no',
        openingHours: 'Mon-Sun: 11:00-22:00'
      },
      {
        name: 'Valdres Pizza',
        description: 'Best pizza in town with local ingredients',
        imageUrl: SAMPLE_IMAGES.restaurants[1],
        rating: 4.3,
        priceRange: '$$',
        cuisine: 'Italian',
        address: 'Storgata 20, 2900 Fagernes',
        phone: '+47 61 35 00 03',
        website: 'https://valdrespizza.no',
        openingHours: 'Mon-Sun: 11:00-22:00'
      }
    ];

    for (const restaurant of restaurants) {
      const docRef = doc(collection(db, 'restaurants'));
      await setDoc(docRef, restaurant, { merge: true });
      console.log(`Updated restaurant with ID: ${docRef.id}`);
    }
  } catch (error) {
    console.error('Error seeding restaurants:', error);
    throw error;
  }
};

const seedShops = async () => {
  try {
    console.log('Seeding shops...');
    const shops: Omit<Shop, 'id'>[] = [
      {
        name: 'Valdres Husflid',
        description: 'Traditional Norwegian crafts and souvenirs',
        imageUrl: SAMPLE_IMAGES.shops[0],
        category: 'Souvenirs',
        address: 'Storgata 25, 2900 Fagernes',
        phone: '+47 61 35 00 04',
        website: 'https://valdreshusflid.no',
        openingHours: 'Mon-Sat: 10:00-18:00'
      },
      {
        name: 'Fjellbutikken',
        description: 'Outdoor gear and equipment',
        imageUrl: SAMPLE_IMAGES.shops[1],
        category: 'Outdoor',
        address: 'Fjellveien 5, 2900 Fagernes',
        phone: '+47 61 35 00 05',
        website: 'https://fjellbutikken.no',
        openingHours: 'Mon-Sat: 09:00-20:00'
      }
    ];

    for (const shop of shops) {
      const docRef = doc(collection(db, 'shops'));
      await setDoc(docRef, shop, { merge: true });
      console.log(`Updated shop with ID: ${docRef.id}`);
    }
  } catch (error) {
    console.error('Error seeding shops:', error);
    throw error;
  }
};

const seedActivities = async () => {
  try {
    console.log('Seeding activities...');
    const activities: Omit<Activity, 'id'>[] = [
      {
        name: 'Valdres Ski Resort',
        description: 'Family-friendly ski resort with slopes for all levels',
        imageUrl: SAMPLE_IMAGES.activities[0],
        rating: 4.8,
        priceRange: '$$',
        difficulty: 'All levels',
        duration: 'Full day',
        season: ['Winter'],
        address: 'Skiveien 1, 2900 Fagernes',
        phone: '+47 61 35 00 06',
        website: 'https://valdresski.no'
      },
      {
        name: 'Valdres Hiking Trails',
        description: 'Beautiful hiking trails with stunning views',
        imageUrl: SAMPLE_IMAGES.activities[1],
        rating: 4.9,
        priceRange: 'Free',
        difficulty: 'Medium',
        duration: '2-4 hours',
        season: ['Summer'],
        address: 'Fjellstien 1, 2900 Fagernes',
        phone: '+47 61 35 00 07',
        website: 'https://valdreshiking.no'
      }
    ];

    for (const activity of activities) {
      const docRef = doc(collection(db, 'activities'));
      await setDoc(docRef, activity, { merge: true });
      console.log(`Updated activity with ID: ${docRef.id}`);
    }
  } catch (error) {
    console.error('Error seeding activities:', error);
    throw error;
  }
};

const seedEvents = async () => {
  try {
    console.log('Seeding events...');
    const events: Omit<Event, 'id'>[] = [
      {
        name: 'Valdres Folk Festival',
        description: 'Annual celebration of traditional Norwegian music and dance',
        imageUrl: SAMPLE_IMAGES.events[0],
        date: '2024-07-15',
        time: '10:00',
        organizer: 'Valdres Cultural Association',
        location: 'Fagernes Torg, 2900 Fagernes',
        phone: '+47 61 35 00 08',
        website: 'https://valdresfolk.no',
        price: 'Free'
      },
      {
        name: 'Winter Market',
        description: 'Traditional winter market with local crafts and food',
        imageUrl: SAMPLE_IMAGES.events[1],
        date: '2024-12-01',
        time: '11:00',
        organizer: 'Fagernes Chamber of Commerce',
        location: 'Storgata, 2900 Fagernes',
        phone: '+47 61 35 00 09',
        website: 'https://valdreswinter.no',
        price: 'Free'
      }
    ];

    for (const event of events) {
      const docRef = doc(collection(db, 'events'));
      await setDoc(docRef, event, { merge: true });
      console.log(`Updated event with ID: ${docRef.id}`);
    }
  } catch (error) {
    console.error('Error seeding events:', error);
    throw error;
  }
};

const seedDatabase = async () => {
  try {
    console.log('Starting database seeding...');
    
    // Check Firebase connection
    console.log('Checking Firebase connection...');
    await getDocs(collection(db, 'hotels'));
    console.log('Firebase connection successful');
    
    await seedHotels();
    console.log('Hotels seeded successfully');
    
    await seedRestaurants();
    console.log('Restaurants seeded successfully');
    
    await seedShops();
    console.log('Shops seeded successfully');
    
    await seedActivities();
    console.log('Activities seeded successfully');
    
    await seedEvents();
    console.log('Events seeded successfully');
    
    console.log('Database seeding completed successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

// Run the seeding function
seedDatabase(); 