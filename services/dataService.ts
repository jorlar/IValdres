import { db } from '@/config/firebase';
import { Activity, Event, Hotel, Restaurant, Shop } from '@/types';
import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDoc,
    getDocs,
    onSnapshot,
    updateDoc
} from 'firebase/firestore';

// Collection names
const COLLECTIONS = {
  HOTELS: 'hotels',
  RESTAURANTS: 'restaurants',
  SHOPS: 'shops',
  ACTIVITIES: 'activities',
  EVENTS: 'events',
};

// Generic function to fetch all documents from a collection
async function fetchAll<T>(collectionName: string): Promise<T[]> {
  const querySnapshot = await getDocs(collection(db, collectionName));
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  })) as T[];
}

// Generic function to fetch a single document
async function fetchOne<T>(collectionName: string, id: string): Promise<T | null> {
  const docRef = doc(db, collectionName, id);
  const docSnap = await getDoc(docRef);
  
  if (docSnap.exists()) {
    return {
      id: docSnap.id,
      ...docSnap.data()
    } as T;
  }
  return null;
}

// Generic function to add a document
async function add<T>(collectionName: string, data: Omit<T, 'id'>): Promise<T> {
  const docRef = await addDoc(collection(db, collectionName), data);
  return {
    id: docRef.id,
    ...data
  } as T;
}

// Generic function to update a document
async function update<T>(collectionName: string, id: string, data: Partial<T>): Promise<void> {
  const docRef = doc(db, collectionName, id);
  await updateDoc(docRef, data as any);
}

// Generic function to remove a document
async function remove(collectionName: string, id: string): Promise<void> {
  const docRef = doc(db, collectionName, id);
  await deleteDoc(docRef);
}

// Generic function to subscribe to collection changes
function subscribeToCollection<T>(
  collectionName: string,
  callback: (items: T[]) => void
): () => void {
  return onSnapshot(
    collection(db, collectionName),
    (snapshot) => {
      const items = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as T[];
      callback(items);
    },
    (error) => {
      console.error(`Error subscribing to ${collectionName}:`, error);
    }
  );
}

// Hotel specific functions
export const hotelService = {
  getAll: () => fetchAll<Hotel>(COLLECTIONS.HOTELS),
  getOne: (id: string) => fetchOne<Hotel>(COLLECTIONS.HOTELS, id),
  add: (data: Omit<Hotel, 'id'>) => add<Hotel>(COLLECTIONS.HOTELS, data),
  update: (id: string, data: Partial<Hotel>) => update<Hotel>(COLLECTIONS.HOTELS, id, data),
  remove: (id: string) => remove(COLLECTIONS.HOTELS, id),
  subscribe: (callback: (hotels: Hotel[]) => void) => 
    subscribeToCollection<Hotel>(COLLECTIONS.HOTELS, callback),
  async create(data: Omit<Hotel, 'id'>): Promise<Hotel> {
    try {
      const docRef = await addDoc(collection(db, 'hotels'), data);
      return { id: docRef.id, ...data };
    } catch (error) {
      console.error('Error creating hotel:', error);
      throw new Error('Failed to create hotel');
    }
  },
  async delete(id: string): Promise<void> {
    try {
      const docRef = doc(db, 'hotels', id);
      await deleteDoc(docRef);
    } catch (error) {
      console.error('Error deleting hotel:', error);
      throw new Error('Failed to delete hotel');
    }
  }
};

// Restaurant specific functions
export const restaurantService = {
  getAll: () => fetchAll<Restaurant>(COLLECTIONS.RESTAURANTS),
  getOne: (id: string) => fetchOne<Restaurant>(COLLECTIONS.RESTAURANTS, id),
  add: (data: Omit<Restaurant, 'id'>) => add<Restaurant>(COLLECTIONS.RESTAURANTS, data),
  update: (id: string, data: Partial<Restaurant>) => update<Restaurant>(COLLECTIONS.RESTAURANTS, id, data),
  remove: (id: string) => remove(COLLECTIONS.RESTAURANTS, id),
  subscribe: (callback: (restaurants: Restaurant[]) => void) => 
    subscribeToCollection<Restaurant>(COLLECTIONS.RESTAURANTS, callback),
};

// Shop specific functions
export const shopService = {
  getAll: () => fetchAll<Shop>(COLLECTIONS.SHOPS),
  getOne: (id: string) => fetchOne<Shop>(COLLECTIONS.SHOPS, id),
  add: (data: Omit<Shop, 'id'>) => add<Shop>(COLLECTIONS.SHOPS, data),
  update: (id: string, data: Partial<Shop>) => update<Shop>(COLLECTIONS.SHOPS, id, data),
  remove: (id: string) => remove(COLLECTIONS.SHOPS, id),
  subscribe: (callback: (shops: Shop[]) => void) => 
    subscribeToCollection<Shop>(COLLECTIONS.SHOPS, callback),
};

// Activity specific functions
export const activityService = {
  getAll: () => fetchAll<Activity>(COLLECTIONS.ACTIVITIES),
  getOne: (id: string) => fetchOne<Activity>(COLLECTIONS.ACTIVITIES, id),
  add: (data: Omit<Activity, 'id'>) => add<Activity>(COLLECTIONS.ACTIVITIES, data),
  update: (id: string, data: Partial<Activity>) => update<Activity>(COLLECTIONS.ACTIVITIES, id, data),
  remove: (id: string) => remove(COLLECTIONS.ACTIVITIES, id),
  subscribe: (callback: (activities: Activity[]) => void) => 
    subscribeToCollection<Activity>(COLLECTIONS.ACTIVITIES, callback),
};

// Event specific functions
export const eventService = {
  getAll: () => fetchAll<Event>(COLLECTIONS.EVENTS),
  getOne: (id: string) => fetchOne<Event>(COLLECTIONS.EVENTS, id),
  add: (data: Omit<Event, 'id'>) => add<Event>(COLLECTIONS.EVENTS, data),
  update: (id: string, data: Partial<Event>) => update<Event>(COLLECTIONS.EVENTS, id, data),
  remove: (id: string) => remove(COLLECTIONS.EVENTS, id),
  subscribe: (callback: (events: Event[]) => void) => 
    subscribeToCollection<Event>(COLLECTIONS.EVENTS, callback),
}; 