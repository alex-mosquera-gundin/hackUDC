import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

const screenWidth = Dimensions.get('window').width;

export default function RecommendationScreen() {
  const { imageUri, recommendations } = useLocalSearchParams();
  const recommendedItems = JSON.parse(recommendations || '[]'); // 📊 Parso i dati consigliati

  return (
    <View style={styles.container}>
      {/* 📷 Immagine principale */}
      <Image source={{ uri: imageUri }} style={styles.mainImage} />

      <Text style={styles.subtitle}>Prodotti Consigliati</Text>

      {/* 🔄 Carosello dei prodotti */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
        {recommendedItems.map((item, index) => (
          <TouchableOpacity key={index} style={styles.thumbnailContainer}>
            <Image source={{ uri: item.imageUrl }} style={styles.thumbnail} />
            <Text style={styles.thumbnailText}>{item.title}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingTop: 40, alignItems: 'center' },
  mainImage: { width: screenWidth * 0.8, height: screenWidth * 0.8, borderRadius: 15, marginBottom: 20 },
  subtitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  scrollContainer: { paddingHorizontal: 10 },
  thumbnailContainer: { width: 120, height: 160, borderRadius: 10, marginRight: 10, alignItems: 'center' },
  thumbnail: { width: 100, height: 120, borderRadius: 8 },
  thumbnailText: { marginTop: 5, fontSize: 14, textAlign: 'center' },
});
