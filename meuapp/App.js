import { useEffect } from 'react';
import { Text, View } from 'react-native';

import api from './services/api';

export default function App() {

  useEffect(() => {
    consultarContatos();
  }, []);

  async function consultarContatos() {
    try {
      const response = await api.get('/contatos');

      console.log(response.data);
    } catch (error) {
      console.log('Erro ao consultar contatos:', error);
    }
  }

  return (
    <View>
      <Text>Testando API de contatos</Text>
    </View>
  );
}