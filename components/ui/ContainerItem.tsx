import React from 'react';
import { TouchableOpacity, View, Image, Text, StyleSheet } from 'react-native';

export default function ContainerItem({ image, title, onPress }) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image source={{ uri: image }} style={styles.image} />
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 120,
    height: 160,
    margin: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    overflow: 'hidden',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 100,
  },
  title: {
    marginTop: 5,
    fontSize: 14,
    textAlign: 'center',
  },
});
