import { useRouter } from 'expo-router';
import { Image, Pressable, StyleSheet, Text, useColorScheme, View } from 'react-native';

export type ListingCardProps = {
  id: string;
  type: 'hotel' | 'restaurant' | 'shop' | 'activity' | 'event';
  title: string;
  description: string;
  imageUrl: string;
  rating?: number;
  priceRange?: string;
  subtitle?: string;
  category?: string;
};

export function ListingCard({
  id,
  type,
  title,
  description,
  imageUrl,
  rating,
  priceRange,
  subtitle,
  category,
}: ListingCardProps) {
  const router = useRouter();
  const colorScheme = useColorScheme();

  const handlePress = () => {
    router.push({
      pathname: '/details/[id]',
      params: { id, type }
    });
  };

  const getSubtitle = () => {
    if (subtitle) return subtitle;
    const parts = [];
    if (priceRange) parts.push(priceRange);
    if (rating) parts.push(`${rating} ★`);
    if (category) parts.push(category);
    return parts.join(' • ');
  };

  return (
    <Pressable
      onPress={handlePress}
      style={({ pressed }) => [
        styles.card,
        {
          backgroundColor: colorScheme === 'dark' ? '#1c1c1e' : '#fff',
          opacity: pressed ? 0.8 : 1,
        },
      ]}
    >
      <Image source={{ uri: imageUrl }} style={styles.image} />
      <View style={styles.content}>
        <Text
          style={[
            styles.title,
            { color: colorScheme === 'dark' ? '#fff' : '#000' },
          ]}
          numberOfLines={1}
        >
          {title}
        </Text>
        <Text
          style={[
            styles.subtitle,
            { color: colorScheme === 'dark' ? '#8e8e93' : '#666' },
          ]}
          numberOfLines={1}
        >
          {getSubtitle()}
        </Text>
        <Text
          style={[
            styles.description,
            { color: colorScheme === 'dark' ? '#8e8e93' : '#666' },
          ]}
          numberOfLines={2}
        >
          {description}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    marginHorizontal: 16,
    marginBottom: 16,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
  },
}); 