// src/components/DiaryDetailModal.js
import React from 'react';
import {
  Modal,
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
  ScrollView,
} from 'react-native';
import { COLORS, SPACE, RADIUS, TYPO } from '../styles/tokens';

export default function DiaryDetailModal({ visible, onClose, entry }) {
  if (!entry) return null;

  const { title, date, body, heroUri, moodUri } = entry;

  return (
    <Modal
      visible={visible}
      animationType="slide"
      onRequestClose={onClose}
      transparent={false}
    >
      <View style={styles.container}>
        <View style={styles.modalCard}>
          <Image
            source={{ uri: heroUri || moodUri }}
            style={styles.hero}
            resizeMode="cover"
          />
          <ScrollView
            contentContainerStyle={styles.content}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.metaBadge}>
              <Text style={styles.date}>{date}</Text>
            </View>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.body}>{body}</Text>

            <Pressable
              onPress={onClose}
              style={({ pressed }) => [
                styles.button,
                { opacity: pressed ? 0.88 : 1 },
              ]}
              accessible={true}
              accessibilityRole="button"
              accessibilityLabel="Tutup detail buku harian"
            >
              <Text style={styles.buttonText}>Tutup</Text>
            </Pressable>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    alignItems: 'center',
  },
  modalCard: {
    flex: 1,
    width: '100%',
    maxWidth: 680, // Menjaga modal tetap proporsional di tablet/desktop
    backgroundColor: COLORS.surface,
  },
  hero: {
    width: '100%',
    aspectRatio: 16 / 9,
    backgroundColor: '#E2E8F0',
    borderBottomLeftRadius: RADIUS.card,
    borderBottomRightRadius: RADIUS.card,
  },
  content: {
    padding: SPACE.l,
    gap: SPACE.s,
    paddingBottom: SPACE.xl * 2,
  },
  metaBadge: {
    alignSelf: 'flex-start',
    backgroundColor: COLORS.accentLight,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: RADIUS.badge,
    marginTop: 4,
  },
  date: {
    fontSize: TYPO.caption,
    color: COLORS.accent,
    fontWeight: '600',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: COLORS.text,
    letterSpacing: -0.3,
  },
  body: {
    fontSize: TYPO.body + 1,
    color: '#334155',
    lineHeight: 24,
    marginTop: SPACE.xs,
  },
  button: {
    marginTop: SPACE.xl,
    paddingVertical: 14,
    paddingHorizontal: SPACE.m,
    minHeight: 48,
    borderRadius: RADIUS.card,
    backgroundColor: COLORS.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: TYPO.title,
  },
});