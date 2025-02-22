import React, { useState } from 'react';
import { View, Text, Button, Image, StyleSheet } from 'react-native';
import { getProductDetails } from '../scripts/inditexApi';

export default function VisualSearchScreen() {
  const [product, setProduct] = useState(null);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    try {
      const response = await getProductDetails('12345'); // Sostituisci con un ID reale
      setProduct(response);
    } catch (err) {
      setError('Errore durante la ricerca');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Visual Search</Text>

      <Button title="Cerca Prodotto" onPress={handleSearch} />

      {product && (
        <View style={styles.result}>
          <Image source={{ uri: product.imageUrl }} style={styles.image} />
          <Text>{product.name}</Text>
          <Text>{product.price}€</Text>
        </View>
      )}

      {error !== '' && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  result: { marginTop: 20, alignItems: 'center' },
  image: { width: 150, height: 150, marginBottom: 10 },
  error: { color: 'red', marginTop: 10 },
});
