import { ListingCard } from '@/components/ui/ListingCard';
import { eventService } from '@/services/dataService';
import { Event } from '@/types';
import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, useColorScheme, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function EventsScreen() {
  const colorScheme = useColorScheme();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Subscribe to real-time updates
    const unsubscribe = eventService.subscribe((updatedEvents) => {
      setEvents(updatedEvents);
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
          Events
        </Text>
      </View>
      <ScrollView style={styles.scrollView}>
        {loading ? (
          <Text style={[styles.message, { color: colorScheme === 'dark' ? '#fff' : '#000' }]}>
            Loading events...
          </Text>
        ) : error ? (
          <Text style={[styles.message, { color: 'red' }]}>
            {error}
          </Text>
        ) : events.length === 0 ? (
          <Text style={[styles.message, { color: colorScheme === 'dark' ? '#fff' : '#000' }]}>
            No events found
          </Text>
        ) : (
          events.map((event) => (
            <ListingCard
              key={event.id}
              id={event.id}
              type="event"
              title={event.name}
              description={event.description}
              imageUrl={event.imageUrl}
              subtitle={`${event.date} • ${event.time}`}
              category={event.organizer}
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