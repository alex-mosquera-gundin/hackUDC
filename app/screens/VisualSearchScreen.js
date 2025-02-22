import React, { useState } from 'react';
import { View, Text, Button, Image, FlatList, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { visualSearch } from '../../inditexApi';

export default function VisualSearchScreen() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  // Funzione per selezionare l'immagine dalla galleria
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  // Funzione per eseguire la ricerca visiva
  const handleSearch = async () => {
    if (!selectedImage) return alert("Seleziona un'immagine prima di continuare!");

    setLoading(true);
    try {
      const data = await visualSearch(selectedImage);
      setSearchResults(data.results || []);
    } catch (error) {
      alert("Errore nella ricerca visiva. Riprova.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ricerca Visiva</Text>

      {/* 📸 Selezione immagine */}
      <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
        {selectedImage ? (
          <Image source={{ uri: selectedImage }} style={styles.selectedImage} />
        ) : (
          <Text>Seleziona un'immagine</Text>
        )}
      </TouchableOpacity>

      <Button title="Cerca Prodotti" onPress={handleSearch} />

      {/* 🔄 Loading */}
      {loading && <ActivityIndicator size="large" color="#0000ff" />}

      {/* 📋 Lista risultati */}
      <FlatList
        data={searchResults}
        keyExtractor={(item) => item.product_id}
        renderItem={({ item }) => (
          <View style={styles.resultItem}>
            <Image source={{ uri: item.image_url }} style={styles.productImage} />
            <Text>{item.name}</Text>
            <Text>{item.price}€</Text>
            <Text>{item.availability}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  imagePicker: { borderWidth: 1, borderColor: '#ccc', padding: 20, alignItems: 'center', marginBottom: 20 },
  selectedImage: { width: 200, height: 200, resizeMode: 'cover' },
  resultItem: { borderBottomWidth: 1, borderBottomColor: '#eee', padding: 10 },
  productImage: { width: 80, height: 80, marginBottom: 5 }
});
