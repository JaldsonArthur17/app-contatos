import { useEffect, useState } from 'react';
import { FlatList, Text, View } from 'react-native';

import api from './services/api';

export default function App() {
  const [contatos, setContatos] = useState([]);

  useEffect(() => {
    consultarContatos();
  }, []);

  async function consultarContatos() {
    try {
      const response = await api.get('/contatos');

      setContatos(response.data);
    } catch (error) {
      console.log('Erro ao consultar contatos:', error);
    }
  }

  return (
    <View>
      <Text>Meus Contatos</Text>

      <FlatList
        data={contatos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View>
            <Text>{item.nome}</Text>
            <Text>{item.telefone}</Text>
            <Text>{item.cidade}</Text>
            <Text>{item.anotacao}</Text>
          </View>
        )}
      />
    </View>
  );
}