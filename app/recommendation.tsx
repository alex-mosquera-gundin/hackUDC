import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

const screenWidth = Dimensions.get('window').width;

export default function RecommendationScreen() {
  const { imageUri, recommendations } = useLocalSearchParams();
  const recommendedItems = JSON.parse(recommendations || '[]');

  return (
    <View style={styles.container}>
      {}
      <Image source={{ uri: imageUri }} style={styles.mainImage} />

      <Text style={styles.subtitle}>Productos recomendados</Text>

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
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 50,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  mainImage: {
    width: screenWidth * 0.85,
    height: screenWidth * 0.85,
    borderRadius: 15,
    marginBottom: 25,
  },
  subtitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  scrollContainer: {
    paddingHorizontal: 5,
  },
  thumbnailContainer: {
    width: 120,
    height: 180,
    borderRadius: 10,
    marginRight: 12,
    alignItems: 'center',
    backgroundColor: '#f7f7f7',
    padding: 8,
  },
  thumbnail: {
    width: 100,
    height: 120,
    borderRadius: 8,
  },
  thumbnailText: {
    marginTop: 8,
    fontSize: 14,
    textAlign: 'center',
  },
});
