import { useLocalSearchParams, useRouter } from 'expo-router';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function WelcomeScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenido, {params.firstName} {params.lastName}!</Text>
      <Text style={styles.subtitle}>Has efectuado el login con éxito</Text>

      <TouchableOpacity style={styles.button} onPress={() => router.replace('/login')}>
        <Text style={styles.buttonText}>Salir</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
    marginBottom: 30,
  },
  button: {
    width: '80%',
    height: 50,
    backgroundColor: '#ff4d4d',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});
