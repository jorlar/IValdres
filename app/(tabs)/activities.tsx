import { ListingCard } from '@/components/ui/ListingCard';
import { activityService } from '@/services/dataService';
import { Activity } from '@/types';
import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, useColorScheme, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ActivitiesScreen() {
  const colorScheme = useColorScheme();
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Subscribe to real-time updates
    const unsubscribe = activityService.subscribe((updatedActivities) => {
      setActivities(updatedActivities);
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
          Activities
        </Text>
      </View>
      <ScrollView style={styles.scrollView}>
        {loading ? (
          <Text style={[styles.message, { color: colorScheme === 'dark' ? '#fff' : '#000' }]}>
            Loading activities...
          </Text>
        ) : error ? (
          <Text style={[styles.message, { color: 'red' }]}>
            {error}
          </Text>
        ) : activities.length === 0 ? (
          <Text style={[styles.message, { color: colorScheme === 'dark' ? '#fff' : '#000' }]}>
            No activities found
          </Text>
        ) : (
          activities.map((activity) => (
            <ListingCard
              key={activity.id}
              id={activity.id}
              type="activity"
              title={activity.name}
              description={activity.description}
              imageUrl={activity.imageUrl}
              rating={activity.rating}
              priceRange={activity.priceRange}
              category={activity.difficulty}
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