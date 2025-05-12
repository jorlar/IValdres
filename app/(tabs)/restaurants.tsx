import { ListingCard } from '@/components/ui/ListingCard';
import { restaurantService } from '@/services/dataService';
import { Restaurant } from '@/types';
import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, useColorScheme, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function RestaurantsScreen() {
  const colorScheme = useColorScheme();
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Subscribe to real-time updates
    const unsubscribe = restaurantService.subscribe((updatedRestaurants) => {
      setRestaurants(updatedRestaurants);
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
          Restaurants
        </Text>
      </View>
      <ScrollView style={styles.scrollView}>
        {loading ? (
          <Text style={[styles.message, { color: colorScheme === 'dark' ? '#fff' : '#000' }]}>
            Loading restaurants...
          </Text>
        ) : error ? (
          <Text style={[styles.message, { color: 'red' }]}>
            {error}
          </Text>
        ) : restaurants.length === 0 ? (
          <Text style={[styles.message, { color: colorScheme === 'dark' ? '#fff' : '#000' }]}>
            No restaurants found
          </Text>
        ) : (
          restaurants.map((restaurant) => (
            <ListingCard
              key={restaurant.id}
              id={restaurant.id}
              type="restaurant"
              title={restaurant.name}
              description={restaurant.description}
              imageUrl={restaurant.imageUrl}
              rating={restaurant.rating}
              priceRange={restaurant.priceRange}
              category={restaurant.cuisine}
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