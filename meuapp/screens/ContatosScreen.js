import { useCallback, useState } from 'react';

import {
  FlatList,
  Pressable,
  Text,
  View,
} from 'react-native';

import { useFocusEffect } from '@react-navigation/native';

import api from '../services/api';

export default function ContatosScreen({ navigation }) {
  const [contatos, setContatos] = useState([]);

  const carregarContatos = useCallback(async () => {
    try {
      const response = await api.get('/contatos');

      setContatos(response.data);
    } catch (error) {
      console.log('Erro ao consultar contatos:', error);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      carregarContatos();
    }, [carregarContatos])
  );

  return (
    <View>
      <Text>Meus Contatos</Text>

      <Pressable
        onPress={() => navigation.navigate('CadastroContato')}
      >
        <Text>+ Novo contato</Text>
      </Pressable>

      <FlatList
        data={contatos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Pressable
            onPress={() =>
              navigation.navigate('DetalhesContato', {
                contato: item,
              })
            }
          >
            <View>
              <Text>{item.nome}</Text>
              <Text>{item.telefone}</Text>
              <Text>{item.cidade}</Text>
            </View>
          </Pressable>
        )}
      />
    </View>
  );
}