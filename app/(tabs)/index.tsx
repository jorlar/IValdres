import { LanguageSelector } from '@/components/LanguageSelector';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { useLanguage } from '@/contexts/LanguageContext';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Platform, Pressable, ScrollView, StatusBar, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type TabRoute = '/(tabs)/hotels' | '/(tabs)/restaurants' | '/(tabs)/shopping' | '/(tabs)/activities' | '/(tabs)/events';

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { t } = useLanguage();

  const quickLinks: { title: string; icon: string; route: TabRoute }[] = [
    { title: t('nav.hotels'), icon: 'bed', route: '/(tabs)/hotels' },
    { title: t('nav.restaurants'), icon: 'restaurant', route: '/(tabs)/restaurants' },
    { title: t('nav.shopping'), icon: 'cart', route: '/(tabs)/shopping' },
    { title: t('nav.activities'), icon: 'fitness', route: '/(tabs)/activities' },
    { title: t('nav.events'), icon: 'calendar', route: '/(tabs)/events' },
  ];

  const howToGuides: { title: string; description: string; icon: string; route: TabRoute }[] = [
    {
      title: t('home.guides.accommodation.title'),
      description: t('home.guides.accommodation.description'),
      icon: 'bed',
      route: '/(tabs)/hotels',
    },
    {
      title: t('home.guides.cuisine.title'),
      description: t('home.guides.cuisine.description'),
      icon: 'restaurant',
      route: '/(tabs)/restaurants',
    },
    {
      title: t('home.guides.activities.title'),
      description: t('home.guides.activities.description'),
      icon: 'fitness',
      route: '/(tabs)/activities',
    },
  ];

  return (
    <ThemedView style={styles.container}>
      <View style={[
        styles.header, 
        { 
          backgroundColor: colors.background,
          paddingTop: Platform.OS === 'ios' ? insets.top : (StatusBar.currentHeight ?? 24)
        }
      ]}>
        <ThemedText style={styles.title}>{t('nav.home')}</ThemedText>
        <LanguageSelector />
      </View>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          {/* Quick Links Section */}
          <View style={styles.section}>
            <ThemedText style={styles.sectionTitle}>{t('home.quickLinks')}</ThemedText>
            <View style={styles.quickLinks}>
              {quickLinks.map((link) => (
                <Pressable
                  key={link.title}
                  style={[styles.quickLink, { backgroundColor: colors.card }]}
                  onPress={() => router.push(link.route)}
                >
                  <Ionicons name={link.icon as any} size={24} color={colors.text} />
                  <ThemedText style={styles.quickLinkText}>{link.title}</ThemedText>
                </Pressable>
              ))}
            </View>
          </View>

          {/* How-to Guides Section */}
          <View style={styles.section}>
            <ThemedText style={styles.sectionTitle}>{t('home.howToUse')}</ThemedText>
            {howToGuides.map((guide) => (
              <Pressable
                key={guide.title}
                style={[styles.guideCard, { backgroundColor: colors.card }]}
                onPress={() => router.push(guide.route)}
              >
                <View style={styles.guideIcon}>
                  <Ionicons name={guide.icon as any} size={24} color={colors.text} />
                </View>
                <View style={styles.guideContent}>
                  <ThemedText style={styles.guideTitle}>{guide.title}</ThemedText>
                  <ThemedText style={[styles.guideDescription, { color: colors.tabIconDefault }]}>
                    {guide.description}
                  </ThemedText>
                </View>
                <Ionicons name="chevron-forward" size={24} color={colors.tabIconDefault} />
              </Pressable>
            ))}
          </View>

          {/* About Section */}
          <View style={styles.section}>
            <ThemedText style={styles.sectionTitle}>{t('home.about.title')}</ThemedText>
            <View style={[styles.aboutCard, { backgroundColor: colors.card }]}>
              <ThemedText style={styles.aboutText}>
                {t('home.about.description')}
              </ThemedText>
            </View>
          </View>
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  title: {
    fontSize: 34,
    fontWeight: 'bold',
    padding: 20,
    marginBottom: 8,
    marginTop: 40,
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 22,
    paddingHorizontal: 20,
  },
  content: {
    flex: 1,
    padding: 16,
    paddingBottom: 24,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  quickLinks: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -8,
  },
  quickLink: {
    width: '45%',
    margin: 8,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  quickLinkText: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: '500',
  },
  guideCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  guideIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.05)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  guideContent: {
    flex: 1,
  },
  guideTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  guideDescription: {
    fontSize: 14,
  },
  aboutCard: {
    padding: 16,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  aboutText: {
    fontSize: 16,
    lineHeight: 24,
    paddingBottom: 20,
  },
});
