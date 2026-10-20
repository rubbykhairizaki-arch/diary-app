// src/components/DiaryCard.js
import React from 'react';
import { View, Text, Image, StyleSheet, Pressable, Platform } from 'react-native';
import { COLORS, SPACE, RADIUS, TYPO } from '../styles/tokens';

export default function DiaryCard({
  title,
  date,
  preview,
  moodUri,
  onPress,
  variant = 'list',
}) {
  const isGrid = variant === 'grid';

  return (
    <Pressable
      onPress={onPress}
      android_ripple={{ color: '#E2E8F0' }}
      style={({ pressed }) => [
        styles.pressable,
        { opacity: pressed ? 0.88 : 1 },
      ]}
      accessible={true}
      accessibilityRole="button"
      accessibilityLabel={`Entri ${title} tanggal ${date}`}
      accessibilityHint="Ketuk untuk melihat detail buku harian"
    >
      <View style={[styles.card, isGrid && styles.cardGrid]}>
        <View style={styles.imageWrapper}>
          <Image
            source={{ uri: moodUri }}
            style={styles.mood}
            resizeMode="cover"
          />
        </View>

        <View style={styles.content}>
          <View style={styles.headerRow}>
            <Text style={styles.title} numberOfLines={1}>
              {title}
            </Text>
          </View>
          <Text style={styles.date}>{date}</Text>
          <Text
            style={styles.preview}
            numberOfLines={2}
            ellipsizeMode="tail"
          >
            {preview}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressable: {
    borderRadius: RADIUS.card,
    minHeight: 48, // Standar aksesibilitas target sentuh
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACE.m,
    padding: SPACE.m,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.card,
    backgroundColor: COLORS.surface,
    // Shadow lembut yang rapi di Android & iOS/Web
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 6,
      },
      android: {
        elevation: 2,
      },
      default: {
        boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.04)',
      },
    }),
  },
  cardGrid: {
    minHeight: 110,
  },
  imageWrapper: {
    width: 64,
    height: 64,
    borderRadius: RADIUS.avatar,
    backgroundColor: '#EEF2FF',
    overflow: 'hidden',
    borderWidth: 1.5,
    borderColor: COLORS.accentLight,
  },
  mood: {
    width: '100%',
    height: '100%',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: TYPO.title,
    fontWeight: '700',
    color: COLORS.text,
    letterSpacing: -0.2,
  },
  date: {
    fontSize: TYPO.caption,
    color: COLORS.muted,
    marginTop: 2,
    marginBottom: 6,
    fontWeight: '500',
  },
  preview: {
    fontSize: TYPO.body,
    color: '#475569',
    lineHeight: 19,
  },
});