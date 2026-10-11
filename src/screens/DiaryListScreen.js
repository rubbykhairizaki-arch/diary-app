import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import DiaryCard from '../components/DiaryCard';

// 1. Mengimpor gambar lokal (Pastikan nama file di komputermu adalah happy.png)
import happyMood from '../../assets/moods/happy.png'; 

// 2. Data diubah menjadi 5 entri
const diaryEntries = [
  {
    id: 1,
    title: ' senam pagi bersama mang uceng',
    date: '2026-10-09',
    preview: 'makan cungkring nya mang uceng',
    moodSource: happyMood, // Memanggil gambar lokal
    borderColor: '#4ade80', // Warna border: Hijau
  },
  {
    id: 2,
    title: 'main cekih di kampus',
    date: '2026-10-08',
    preview: 'Menyelesaikan modul praktikum dan berdiskusi dengan rekan kerja praktek. Banyak insight baru...',
    moodSource: { uri: 'https://picsum.photos/seed/focus/80' },
    borderColor: '#60a5fa', // Warna border: Biru
  },
  {
    id: 3,
    title: 'Senja di Taman',
    date: '2026-10-07',
    preview: 'Menikmati senja sambil membaca buku favorit. Warna langit sangat indah...',
    moodSource: { uri: 'https://picsum.photos/seed/calm/80' },
    borderColor: '#f472b6', // Warna border: Pink
  },
  {
    id: 4,
    title: 'Eksplorasi React Native',
    date: '2026-10-06',
    preview: 'Melanjutkan coding aplikasi Diary dengan Node.js dan Expo. Ternyata seru.',
    moodSource: { uri: 'https://picsum.photos/seed/code/80' },
    borderColor: '#facc15', // Warna border: Kuning
  },
  {
    id: 5,
    title: 'Istirahat Sejenak',
    date: '2026-10-05',
    preview: 'Bermain game survival top-down sebentar untuk melepas penat setelah coding.',
    moodSource: { uri: 'https://picsum.photos/seed/relax/80' },
    borderColor: '#9ca3af', // Warna border: Abu-abu
  }
];

export default function DiaryListScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      
      {/* 3. Header dengan Avatar Pengguna */}
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Buku Harian</Text>
        <Image
          source={{ uri: 'https://ui-avatars.com/api/?name=Rubby&background=random' }}
          style={styles.avatar}
        />
      </View>

      {/* Render komponen berulang */}
      {diaryEntries.map((entry) => (
        <DiaryCard
          key={entry.id}
          title={entry.title}
          date={entry.date}
          preview={entry.preview}
          moodSource={entry.moodSource}
          borderColor={entry.borderColor}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  content: {
    padding: 16,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: '700',
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  }
});