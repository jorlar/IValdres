import { ListingCard } from '@/components/ui/ListingCard';
import { hotelService } from '@/services/dataService';
import { Hotel } from '@/types';
import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, useColorScheme, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HotelsScreen() {
  const colorScheme = useColorScheme();
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Subscribe to real-time updates
    const unsubscribe = hotelService.subscribe((updatedHotels) => {
      setHotels(updatedHotels);
      setLoading(false);
      setError(null);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colorScheme === 'dark' ? '#000' : '#fff' }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colorScheme === 'dark' ? '#fff' : '#000' }]}>
          Hotels
        </Text>
      </View>
      <ScrollView style={styles.scrollView}>
        {loading ? (
          <Text style={[styles.message, { color: colorScheme === 'dark' ? '#fff' : '#000' }]}>
            Loading hotels...
          </Text>
        ) : error ? (
          <Text style={[styles.message, { color: 'red' }]}>
            {error}
          </Text>
        ) : hotels.length === 0 ? (
          <Text style={[styles.message, { color: colorScheme === 'dark' ? '#fff' : '#000' }]}>
            No hotels found
          </Text>
        ) : (
          hotels.map((hotel) => (
            <ListingCard
              key={hotel.id}
              id={hotel.id}
              type="hotel"
              title={hotel.name}
              description={hotel.description}
              imageUrl={hotel.imageUrl}
              rating={hotel.rating}
              priceRange={hotel.priceRange}
            />
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    paddingTop: 0,
  },
  title: {
    fontSize: 34,
    fontWeight: 'bold',
    marginBottom: 8,
    marginTop: 40,
  },
  scrollView: {
    flex: 1,
  },
  message: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
  },
}); 