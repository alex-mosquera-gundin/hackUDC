import React, { useState } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, Dimensions, TouchableOpacity, Modal, Linking, Switch } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Ionicons, FontAwesome } from '@expo/vector-icons';

const screenWidth = Dimensions.get('window').width;

export default function ResultsScreen() {
  const { imageUri, itemsCount = 5 } = useLocalSearchParams();

  // 📌 Stati per modale e preferiti
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [favorites, setFavorites] = useState([]);

  // ✅ Apri la modale quando un container viene cliccato
  const openModal = (item) => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  // ✅ Gestisci i preferiti
  const toggleFavorite = (itemId) => {
    setFavorites((prev) =>
      prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId]
    );
  };

  // ✅ Condividi su social
  const shareOnSocial = (platform, item) => {
    const message = `Guarda questo prodotto: ${item.title} - ${item.description}`;
    let url = '';

    if (platform === 'facebook') {
      url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(message)}`;
    } else if (platform === 'instagram') {
      url = 'https://www.instagram.com/'; // Instagram non supporta link diretti
    } else if (platform === 'whatsapp') {
      url = `whatsapp://send?text=${encodeURIComponent(message)}`;
    }

    Linking.openURL(url);
  };

  return (
    <View style={styles.container}>
      {/* 📷 Container principale ora cliccabile */}
      <TouchableOpacity
        style={styles.mainImageContainer}
        onPress={() =>
          openModal({
            id: 'main',
            title: 'Prodotto Principale',
            image: imageUri,
            description: 'Questa è la descrizione del prodotto principale.',
          })
        }
      >
        <Image source={{ uri: imageUri }} style={styles.mainImage} />
      </TouchableOpacity>

      <Text style={styles.subtitle}>Prodotti Correlati</Text>

      {/* 🔄 Container scrollabile */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
        {[...Array(Number(itemsCount)).keys()].map((index) => {
          const item = {
            id: index,
            title: `Prodotto ${index + 1}`,
            image: imageUri,
            description: `Descrizione del prodotto ${index + 1}`,
          };

          return (
            <TouchableOpacity key={index} style={styles.thumbnailContainer} onPress={() => openModal(item)}>
              <Image source={{ uri: imageUri }} style={styles.thumbnail} />
              <Text style={styles.thumbnailText}>{item.title}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* ✅ MODALE PER DETTAGLI */}
      {selectedItem && (
        <Modal
          visible={modalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              {/* 🔼 Social Icons */}
              <View style={styles.socialIcons}>
                <TouchableOpacity onPress={() => shareOnSocial('facebook', selectedItem)}>
                  <FontAwesome name="facebook" size={24} color="#4267B2" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => shareOnSocial('instagram', selectedItem)}>
                  <FontAwesome name="instagram" size={24} color="#C13584" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => shareOnSocial('whatsapp', selectedItem)}>
                  <FontAwesome name="whatsapp" size={24} color="#25D366" />
                </TouchableOpacity>
              </View>

              {/* 📸 Immagine del prodotto */}
              <Image source={{ uri: selectedItem.image }} style={styles.modalImage} />

              {/* 📝 Descrizione scrollabile */}
              <ScrollView style={styles.descriptionBox}>
                <Text>{selectedItem.description}</Text>
              </ScrollView>

              {/* ✅ Switch e preferito */}
              <View style={styles.actionsRow}>
                <Switch
                  value={favorites.includes(selectedItem.id)}
                  onValueChange={() => toggleFavorite(selectedItem.id)}
                />
                <TouchableOpacity onPress={() => toggleFavorite(selectedItem.id)}>
                  <Ionicons
                    name={favorites.includes(selectedItem.id) ? 'heart' : 'heart-outline'}
                    size={28}
                    color={favorites.includes(selectedItem.id) ? 'red' : 'gray'}
                  />
                </TouchableOpacity>
              </View>

              {/* ❌ Chiudi Modale */}
              <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
                <Text style={{ color: 'white' }}>Chiudi</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 40,
    alignItems: 'center',
  },
  mainImageContainer: {
    width: screenWidth * 0.6,
    height: screenWidth * 0.8,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#ccc',
    overflow: 'hidden',
    marginBottom: 20,
  },
  mainImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  scrollContainer: {
    paddingHorizontal: 10,
    paddingTop: 30,
  },
  thumbnailContainer: {
    width: 120,
    height: 160,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  thumbnail: {
    width: 100,
    height: 120,
    borderRadius: 8,
  },
  thumbnailText: {
    marginTop: 5,
    fontSize: 14,
  },
  // 🔴 MODALE
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
  },
  socialIcons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%',
    marginBottom: 10,
  },
  modalImage: {
    width: '100%',
    height: 150,
    borderRadius: 10,
  },
  descriptionBox: {
    height: 60,
    marginTop: 10,
    padding: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
  },
  actionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
    gap: 10,
  },
  closeButton: {
    marginTop: 15,
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
  },
});
