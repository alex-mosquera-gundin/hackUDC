import React, { useState } from 'react';
import { View, Text, Button, Image, StyleSheet, ActivityIndicator, ScrollView, Linking } from 'react-native';
import { searchVisual } from '../api_service';

export default function VisualSearchScreen() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    setLoading(true);
    setError('');
    setProducts([]);

    try {
      const imageUrl = 'https://i.imgur.com/example.jpg';

      const response = await searchVisual(imageUrl);

      console.log('📊 respuesta JSON:', JSON.stringify(response, null, 2));

      if (response && response.length > 0) {
        setProducts(response);
      } else {
        setError('No hay productos.');
      }
    } catch (err) {
      console.error('❌ Error durante la búsqueda:', err);
      setError('Error durante la búsqueda.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Visual Search</Text>

      <Button title="Buscar producto" onPress={handleSearch} />

      {loading && <ActivityIndicator size="large" color="#007BFF" style={{ marginTop: 20 }} />}

      {error !== '' && <Text style={styles.error}>{error}</Text>}

      {/* ✅ Mostra i prodotti trovati */}
      <ScrollView style={styles.scrollView}>
        {products.map((product, index) => (
          <View key={index} style={styles.result}>
            <Image source={{ uri: product.imageUrl || 'https://via.placeholder.com/150' }} style={styles.image} />
            <Text style={styles.productName}>{product.name}</Text>
            <Text style={styles.price}>
              Precio: {product.price.currency} {product.price.value.current}
            </Text>
            {product.price.value.original && (
              <Text style={styles.originalPrice}>Precio Original: {product.price.value.original}</Text>
            )}
            <Text style={styles.brand}>Brand: {product.brand}</Text>
            <Text style={styles.link} onPress={() => Linking.openURL(product.link)}>
              Ir al producto
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  scrollView: { marginTop: 20, width: '100%' },
  result: { padding: 15, marginBottom: 20, borderWidth: 1, borderRadius: 8, borderColor: '#ccc' },
  image: { width: '100%', height: 200, borderRadius: 8 },
  productName: { fontSize: 18, fontWeight: 'bold', marginTop: 10 },
  price: { fontSize: 16, color: 'green', marginTop: 5 },
  originalPrice: { fontSize: 14, textDecorationLine: 'line-through', color: 'red' },
  brand: { fontSize: 14, color: '#555', marginTop: 5 },
  link: { color: 'blue', marginTop: 5, textDecorationLine: 'underline' },
  error: { color: 'red', marginTop: 10, fontWeight: 'bold' },
});
