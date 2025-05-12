import { ListingCard } from '@/components/ui/ListingCard';
import { shopService } from '@/services/dataService';
import { Shop } from '@/types';
import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, useColorScheme, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ShoppingScreen() {
  const colorScheme = useColorScheme();
  const [shops, setShops] = useState<Shop[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Subscribe to real-time updates
    const unsubscribe = shopService.subscribe((updatedShops) => {
      setShops(updatedShops);
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
          Shopping
        </Text>
      </View>
      <ScrollView style={styles.scrollView}>
        {loading ? (
          <Text style={[styles.message, { color: colorScheme === 'dark' ? '#fff' : '#000' }]}>
            Loading shops...
          </Text>
        ) : error ? (
          <Text style={[styles.message, { color: 'red' }]}>
            {error}
          </Text>
        ) : shops.length === 0 ? (
          <Text style={[styles.message, { color: colorScheme === 'dark' ? '#fff' : '#000' }]}>
            No shops found
          </Text>
        ) : (
          shops.map((shop) => (
            <ListingCard
              key={shop.id}
              id={shop.id}
              type="shop"
              title={shop.name}
              description={shop.description}
              imageUrl={shop.imageUrl}
              category={shop.category}
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