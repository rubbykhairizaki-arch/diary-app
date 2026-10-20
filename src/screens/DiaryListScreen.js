// src/screens/DiaryListScreen.js
import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, FlatList, useWindowDimensions } from 'react-native';
import DiaryCard from '../components/DiaryCard';
import DiaryDetailModal from '../components/DiaryDetailModal';
import { COLORS, SPACE, TYPO, BREAKPOINTS } from '../styles/tokens';

const DATA = [
  {
    id: 1,
    title: 'Pagi yang Tenang',
    date: '2025-10-06',
    preview: 'Bangun lebih pagi menikmati secangkir teh hangat di teras rumah...',
    body: 'Memulai hari lebih awal memberikan ketenangan pikiran sebelum memulai aktivitas perkuliahan yang padat. Udara pagi yang sejuk membantu menjernihkan pikiran dan merencanakan target harian.',
    moodUri: 'https://picsum.photos/seed/morningcalm/200',
    heroUri: 'https://picsum.photos/seed/morningcalm/800/450',
  },
  {
    id: 2,
    title: 'Produktif di Kampus',
    date: '2025-10-05',
    preview: 'Menyelesaikan modul praktikum mobile programming bersama tim...',
    body: 'Kemajuan proyek hari ini sangat terasa. Berhasil memahami arsitektur Flexbox, perancangan layout responsif, dan penerapan FlatList serta Modal pada React Native.',
    moodUri: 'https://picsum.photos/seed/campustask/200',
    heroUri: 'https://picsum.photos/seed/campustask/800/450',
  },
  {
    id: 3,
    title: 'Senja di Taman',
    date: '2025-10-04',
    preview: 'Membaca buku dan menikmati pemandangan senja setelah seharian di depan laptop...',
    body: 'Refleksi singkat di penghujung hari. Meluangkan waktu tanpa layar gawai sangat membantu memulihkan energi fisik dan mental setelah aktivitas coding yang panjang.',
    moodUri: 'https://picsum.photos/seed/parkreading/200',
    heroUri: 'https://picsum.photos/seed/parkreading/800/450',
  },
  {
    id: 4,
    title: 'Eksplorasi Kuliner Malam',
    date: '2025-10-03',
    preview: 'Mencoba jajanan jalanan baru di pusat kota bersama sahabat...',
    body: 'Menjelajahi aneka kuliner lokal di malam hari. Suasana jalanan begitu hidup dan hangat, menjadi momen pelepas penat terbaik setelah tugas selesai.',
    moodUri: 'https://picsum.photos/seed/streetculinary/200',
    heroUri: 'https://picsum.photos/seed/streetculinary/800/450',
  },
  {
    id: 5,
    title: 'Lari Pagi Akhir Pekan',
    date: '2025-10-02',
    preview: 'Memulai akhir pekan dengan lari santai 5 km mengelilingi stadion...',
    body: 'Olahraga lari sejauh 5 km pagi ini membuat stamina kembali segar dan bugar. Menyiapkan kondisi fisik yang prima untuk menjalani perkuliahan di pekan mendatang.',
    moodUri: 'https://picsum.photos/seed/joggingweek/200',
    heroUri: 'https://picsum.photos/seed/joggingweek/800/450',
  },
];

export default function DiaryListScreen() {
  const { width } = useWindowDimensions();
  const twoCols = width >= BREAKPOINTS.tablet;
  const [selected, setSelected] = useState(null);

  // Mencegah error FlatList saat jumlah kolom berubah
  const keyForCols = useMemo(() => (twoCols ? 'grid2' : 'list1'), [twoCols]);

  const renderItem = ({ item }) => (
    <View style={[styles.itemWrap, twoCols && styles.itemWrap2]}>
      <DiaryCard
        title={item.title}
        date={item.date}
        preview={item.preview}
        moodUri={item.moodUri}
        variant={twoCols ? 'grid' : 'list'}
        onPress={() => setSelected(item)}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <View style={styles.headerContainer}>
          <Text style={styles.header}>Buku Harian</Text>
          <Text style={styles.subHeader}>Catatan & Aktivitas Harian</Text>
        </View>

        <FlatList
          key={keyForCols}
          data={DATA}
          numColumns={twoCols ? 2 : 1}
          keyExtractor={(item) => String(item.id)}
          renderItem={renderItem}
          columnWrapperStyle={twoCols ? { gap: SPACE.m } : undefined}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <Text style={styles.empty}>Belum ada entri catatan.</Text>
          }
        />
      </View>

      <DiaryDetailModal
        visible={!!selected}
        entry={selected}
        onClose={() => setSelected(null)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    alignItems: 'center', // Membuat kontainer berada di tengah (centered) saat di web/tablet
  },
  wrapper: {
    flex: 1,
    width: '100%',
    maxWidth: 860, // Mencegah tampilan terlalu renggang pada layar desktop
  },
  headerContainer: {
    paddingHorizontal: SPACE.l,
    paddingTop: SPACE.l,
    paddingBottom: SPACE.s,
  },
  header: {
    fontSize: TYPO.h1,
    fontWeight: '800',
    color: COLORS.text,
    letterSpacing: -0.5,
  },
  subHeader: {
    fontSize: TYPO.caption + 1,
    color: COLORS.muted,
    marginTop: 2,
  },
  listContent: {
    padding: SPACE.l,
    gap: SPACE.m,
  },
  itemWrap: {
    flex: 1,
  },
  itemWrap2: {
    flex: 1 / 2,
  },
  empty: {
    textAlign: 'center',
    color: COLORS.muted,
    marginTop: 40,
    fontSize: TYPO.body,
  },
});