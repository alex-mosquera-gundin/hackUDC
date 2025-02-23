import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { uploadImageToImgur, searchVisual } from '../inditexApi';

export default function UploadScreen() {
  const { firstName, lastName } = useLocalSearchParams();
  const [image, setImage] = useState(null);
  const [menuVisible, setMenuVisible] = useState(false);
  const router = useRouter();

  const selectImageOption = () => {
    Alert.alert(
      "Seleccionar la imagen",
      "¿Quieres tomar una foto o subir una de la galería?",
      [
        { text: "Cámara", onPress: () => takePhoto() },
        { text: "Galería", onPress: () => pickImage() },
        { text: "Cancela", style: "cancel" },
      ],
      { cancelable: true }
    );
  };

  // 📷 Cámara
  const takePhoto = async () => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  // 🖼️ Galería
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const confirmUpload = async () => {
    if (image) {
      try {
        Alert.alert("Cargando", "Estoy subiendo la imagen y buscando productos...");

        const publicImageUrl = await uploadImageToImgur(image);

        const response = await searchVisual(publicImageUrl);

        if (response && response.length > 0) {
          router.push({
            pathname: '/recommendation',
            params: {
              imageUri: publicImageUrl,
              recommendations: JSON.stringify(response),
            },
          });
        } else {
          Alert.alert("Sin resultados", "No se han encontrado productos similares.");
        }
      } catch (error) {
        Alert.alert("Error", "Se ha producido un error durante la búsqueda.");
        console.error("Error de API:", error);
      }
    } else {
      Alert.alert("Error", "No hay imagen seleccionada.");
    }
  };

  // 🔒 Logout
  const handleLogout = () => {
    setMenuVisible(false);
    router.push('/');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.userIcon} onPress={() => setMenuVisible(!menuVisible)}>
        <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png' }} style={styles.icon} />
      </TouchableOpacity>

      <Text style={styles.welcome}>Bienvenido {firstName} {lastName}! 👋</Text>

      {image ? (
        <Image source={{ uri: image }} style={styles.image} />
      ) : (
        <View style={styles.titleContainer}>
          <Text style={styles.title}>InditexTech</Text>
          <Text style={styles.subtitle}>Product's visual search</Text>
        </View>
      )}

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={selectImageOption}>
          <Text style={styles.buttonText}>Sacar foto o cargar archivo</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={confirmUpload}>
          <Text style={styles.buttonText}>Subir</Text>
        </TouchableOpacity>
      </View>

      {menuVisible && (
        <View style={styles.menu}>
          <TouchableOpacity style={styles.menuItem} onPress={handleLogout}>
            <Text style={styles.menuText}>Cerrar sesión</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
    paddingBottom: 40,
  },
  userIcon: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
  icon: {
    width: 40,
    height: 40,
  },
  titleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
    marginTop: 5,
    textAlign: 'center',
  },
  welcome: {
    fontSize: 20,
    color: '#333',
    fontWeight: '600',
    position: 'absolute',
    top: 20,
    left: 20,
  },
  image: {
    width: 300,
    height: 300,
    borderRadius: 10,
    marginTop: 170,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
  },
  button: {
    width: '80%',
    height: 50,
    backgroundColor: '#007BFF',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  menu: {
    position: 'absolute',
    top: 70,
    right: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  menuItem: {
    paddingVertical: 10,
  },
  menuText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#333',
  },
});
