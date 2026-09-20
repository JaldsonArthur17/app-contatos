import {
    ActivityIndicator,
    StyleSheet,
    Text,
    View,
} from 'react-native';

export default function SplashScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>
        Meus Contatos
      </Text>

      <ActivityIndicator
        size="large"
        style={styles.loading}
      />

      <Text style={styles.mensagem}>
        Carregando...
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },

  titulo: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
  },

  loading: {
    marginBottom: 12,
  },

  mensagem: {
    fontSize: 16,
  },
});