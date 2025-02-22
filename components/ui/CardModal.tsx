import React, { useState } from 'react';
import { Modal, View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function CardModal({ visible, onClose, item }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isActive, setIsActive] = useState(item?.active || false);

  const handleShare = (platform) => {
    Alert.alert(`Condiviso su ${platform}`, `Descrizione: ${item.description}`);
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    Alert.alert(isFavorite ? 'Rimosso dai preferiti' : 'Aggiunto ai preferiti');
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.modalContent}>

          {/* 🔼 Icone social */}
          <View style={styles.socialIcons}>
            <TouchableOpacity onPress={() => handleShare('Facebook')}>
              <Ionicons name="logo-facebook" size={24} color="#4267B2" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleShare('Instagram')}>
              <Ionicons name="logo-instagram" size={24} color="#E1306C" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleShare('WhatsApp')}>
              <Ionicons name="logo-whatsapp" size={24} color="#25D366" />
            </TouchableOpacity>
          </View>

          {/* 🖼️ Immagine */}
          <Image source={{ uri: item?.image }} style={styles.image} />

          {/* 📄 Descrizione scrollabile */}
          <ScrollView style={styles.descriptionContainer}>
            <Text>{item?.description}</Text>
          </ScrollView>

          {/* ✅ Attiva/Disattiva */}
          <View style={styles.actions}>
            <TouchableOpacity onPress={() => setIsActive(!isActive)}>
              <Ionicons name={isActive ? "checkmark-circle" : "ellipse-outline"} size={30} color={isActive ? "green" : "gray"} />
            </TouchableOpacity>

            {/* ⭐ Preferiti */}
            <TouchableOpacity onPress={toggleFavorite}>
              <Ionicons name={isFavorite ? "star" : "star-outline"} size={30} color={isFavorite ? "gold" : "gray"} />
            </TouchableOpacity>
          </View>

          {/* ❌ Chiudi */}
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeText}>Chiudi</Text>
          </TouchableOpacity>

        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    margin: 20,
    borderRadius: 20,
    padding: 20,
    height: '80%',
  },
  socialIcons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  image: {
    width: '100%',
    height: 180,
    borderRadius: 10,
  },
  descriptionContainer: {
    height: 100,
    marginVertical: 10,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  closeButton: {
    backgroundColor: '#FF4D4D',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  closeText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
