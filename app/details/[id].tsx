import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { useLanguage } from '@/contexts/LanguageContext';
import { useColorScheme } from '@/hooks/useColorScheme';
import { activityService, eventService, hotelService, restaurantService, shopService } from '@/services/dataService';
import { ListingItem } from '@/types';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Image, Linking, Platform, Pressable, ScrollView, StatusBar, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function DetailScreen() {
  const { id, type } = useLocalSearchParams();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [item, setItem] = useState<ListingItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { t } = useLanguage();

  useEffect(() => {
    const fetchItem = async () => {
      try {
        let result: ListingItem | null = null;
        switch (type) {
          case 'hotel':
            result = await hotelService.getOne(id as string);
            break;
          case 'restaurant':
            result = await restaurantService.getOne(id as string);
            break;
          case 'shop':
            result = await shopService.getOne(id as string);
            break;
          case 'activity':
            result = await activityService.getOne(id as string);
            break;
          case 'event':
            result = await eventService.getOne(id as string);
            break;
        }
        setItem(result);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching item:', err);
        setError('Failed to load item details');
        setLoading(false);
      }
    };

    fetchItem();
  }, [id, type]);

  if (loading) {
    return (
      <ThemedView style={styles.container}>
        <ThemedText>{t('common.loading')}</ThemedText>
      </ThemedView>
    );
  }

  if (error || !item) {
    return (
      <ThemedView style={styles.container}>
        <ThemedText>{t('common.notFound')}</ThemedText>
      </ThemedView>
    );
  }

  const handleLink = async (url: string) => {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    }
  };

  const handleAddress = () => {
    const url = Platform.select({
      ios: `maps:0,0?q=${encodeURIComponent(item.address)}`,
      android: `geo:0,0?q=${encodeURIComponent(item.address)}`,
    });
    if (url) handleLink(url);
  };

  const renderTypeSpecificInfo = (item: ListingItem) => {
    if ('amenities' in item) {
      return (
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>{t('hotel.amenities')}</ThemedText>
          {item.amenities.map((amenity, index) => (
            <View key={index} style={styles.infoRow}>
              <Ionicons name="checkmark-circle" size={24} color={colors.text} />
              <ThemedText style={styles.infoText}>{t(`hotel.amenities.${amenity.toLowerCase()}`)}</ThemedText>
            </View>
          ))}
        </View>
      );
    }
    if ('cuisine' in item) {
      const cuisines = Array.isArray(item.cuisine) ? item.cuisine : [item.cuisine];
      return (
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>{t('restaurant.cuisine')}</ThemedText>
          {cuisines.map((type, index) => (
            <View key={index} style={styles.infoRow}>
              <Ionicons name="restaurant" size={24} color={colors.text} />
              <ThemedText style={styles.infoText}>{t(`restaurant.cuisine.${type.toLowerCase()}`)}</ThemedText>
            </View>
          ))}
        </View>
      );
    }
    if ('duration' in item) {
      return (
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>{t('activity.details')}</ThemedText>
          <View style={styles.infoRow}>
            <Ionicons name="time-outline" size={24} color={colors.text} />
            <ThemedText style={styles.infoText}>{t('activity.duration')}: {item.duration}</ThemedText>
          </View>
          <View style={styles.infoRow}>
            <Ionicons name="fitness" size={24} color={colors.text} />
            <ThemedText style={styles.infoText}>{t('activity.difficulty')}: {t(`activity.difficulty.${item.difficulty.toLowerCase()}`)}</ThemedText>
          </View>
          <View style={styles.infoRow}>
            <Ionicons name="calendar" size={24} color={colors.text} />
            <ThemedText style={styles.infoText}>{t('activity.season')}: {item.season.map(s => t(`activity.season.${s.toLowerCase()}`)).join(', ')}</ThemedText>
          </View>
          {item.type && (
            <View style={styles.infoRow}>
              <Ionicons name="compass" size={24} color={colors.text} />
              <ThemedText style={styles.infoText}>{t(`activity.type.${item.type.toLowerCase()}`)}</ThemedText>
            </View>
          )}
        </View>
      );
    }
    if ('date' in item) {
      return (
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>{t('event.details')}</ThemedText>
          <View style={styles.infoRow}>
            <Ionicons name="calendar" size={24} color={colors.text} />
            <ThemedText style={styles.infoText}>{t('event.date')}: {item.date}</ThemedText>
          </View>
          <View style={styles.infoRow}>
            <Ionicons name="time" size={24} color={colors.text} />
            <ThemedText style={styles.infoText}>{t('event.time')}: {item.time}</ThemedText>
          </View>
          <View style={styles.infoRow}>
            <Ionicons name="people" size={24} color={colors.text} />
            <ThemedText style={styles.infoText}>{t('event.organizer')}: {item.organizer}</ThemedText>
          </View>
          {item.type && (
            <View style={styles.infoRow}>
              <Ionicons name="star" size={24} color={colors.text} />
              <ThemedText style={styles.infoText}>{t(`event.type.${item.type.toLowerCase()}`)}</ThemedText>
            </View>
          )}
        </View>
      );
    }
    return null;
  };

  return (
    <ThemedView style={styles.container}>
      <View style={[
        styles.header, 
        { 
          backgroundColor: colors.background,
          paddingTop: Platform.OS === 'ios' ? insets.top : (StatusBar.currentHeight ?? 24)
        }
      ]}>
        <Pressable 
          style={styles.backButton} 
          onPress={() => router.back()}
        >
          <Ionicons name="chevron-back" size={24} color={colors.text} />
        </Pressable>
        <ThemedText style={styles.title}>{item.name}</ThemedText>
      </View>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Image source={{ uri: item.imageUrl }} style={styles.image} />
        <View style={styles.content}>
          <ThemedText style={styles.description}>{item.description}</ThemedText>
          
          <View style={styles.section}>
            <ThemedText style={styles.sectionTitle}>{t('common.address')}</ThemedText>
            <Pressable style={styles.infoRow} onPress={handleAddress}>
              <Ionicons name="location" size={24} color={colors.text} />
              <ThemedText style={styles.infoText}>{item.address}</ThemedText>
            </Pressable>
          </View>

          {item.website && (
            <View style={styles.section}>
              <ThemedText style={styles.sectionTitle}>{t('common.website')}</ThemedText>
              <Pressable style={styles.infoRow} onPress={() => handleLink(item.website)}>
                <Ionicons name="globe" size={24} color={colors.text} />
                <ThemedText style={styles.infoText}>{item.website}</ThemedText>
              </Pressable>
            </View>
          )}

          {item.phone && (
            <View style={styles.section}>
              <ThemedText style={styles.sectionTitle}>{t('common.phone')}</ThemedText>
              <Pressable 
                style={styles.infoRow} 
                onPress={() => handleLink(`tel:${item.phone}`)}
              >
                <Ionicons name="call" size={24} color={colors.text} />
                <ThemedText style={styles.infoText}>{item.phone}</ThemedText>
              </Pressable>
            </View>
          )}

          {item.openingHours && (
            <View style={styles.infoRow}>
              <Ionicons name="time" size={24} color={colors.text} />
              <ThemedText style={styles.infoText}>{t('common.openingHours')}: {item.openingHours}</ThemedText>
            </View>
          )}

          {item.priceRange && (
            <View style={styles.infoRow}>
              <Ionicons name="cash" size={24} color={colors.text} />
              <ThemedText style={styles.infoText}>{t('common.priceRange')}: {item.priceRange}</ThemedText>
            </View>
          )}

          {item.price && (
            <View style={styles.infoRow}>
              <Ionicons name="cash" size={24} color={colors.text} />
              <ThemedText style={styles.infoText}>{t('common.price')}: {item.price}</ThemedText>
            </View>
          )}

          {item.rating && (
            <View style={styles.infoRow}>
              <Ionicons name="star" size={24} color={colors.text} />
              <ThemedText style={styles.infoText}>{t('common.rating')}: {item.rating} ★</ThemedText>
            </View>
          )}

          {renderTypeSpecificInfo(item)}
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 16,
    paddingBottom: 24,
    zIndex: 1,
  },
  backButton: {
    marginBottom: 16,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },
  title: {
    fontSize: 34,
    fontWeight: 'bold',
    padding: 20,
    marginBottom: 8,
    marginTop: 40,
  },
  content: {
    flex: 1,
    padding: 16,
    paddingBottom: 24,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 24,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    paddingVertical: 8,
  },
  infoText: {
    fontSize: 16,
    marginLeft: 12,
    flex: 1,
  },
  section: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
}); 