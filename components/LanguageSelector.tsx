import { Colors } from '@/constants/Colors';
import { useLanguage } from '@/contexts/LanguageContext';
import { useColorScheme } from '@/hooks/useColorScheme';
import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { ThemedText } from './ThemedText';

export function LanguageSelector() {
  const { language, setLanguage, t } = useLanguage();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  return (
    <View style={styles.container}>
      <Pressable
        style={[
          styles.button,
          language === 'en' && { backgroundColor: colors.tint },
        ]}
        onPress={() => setLanguage('en')}
      >
        <ThemedText style={[
          styles.text,
          language === 'en' && { color: '#fff' }
        ]}>
          🇬🇧 {t('language.english')}
        </ThemedText>
      </Pressable>
      <Pressable
        style={[
          styles.button,
          language === 'no' && { backgroundColor: colors.tint },
        ]}
        onPress={() => setLanguage('no')}
      >
        <ThemedText style={[
          styles.text,
          language === 'no' && { color: '#fff' }
        ]}>
          🇳🇴 {t('language.norwegian')}
        </ThemedText>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    gap: 8,
  },
  button: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  text: {
    fontSize: 14,
    fontWeight: '500',
  },
}); 