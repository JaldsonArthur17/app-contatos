import { useCallback, useState } from 'react';

import {
  Button,
  Text,
  View,
} from 'react-native';

import { useFocusEffect } from '@react-navigation/native';

import api from '../services/api';

export default function DetalhesContatoScreen({ route, navigation }) {
  const { contato: contatoInicial } = route.params;

  const [contato, setContato] = useState(contatoInicial);
  const [carregando, setCarregando] = useState(true);

  const carregarContato = useCallback(async () => {
    try {
      setCarregando(true);

      const response = await api.get(
        `/contatos/${contatoInicial.id}`
      );

      setContato(response.data);
    } catch (error) {
      console.log('Erro ao carregar contato:', error);
    } finally {
      setCarregando(false);
    }
  }, [contatoInicial.id]);

  useFocusEffect(
    useCallback(() => {
      carregarContato();
    }, [carregarContato])
  );

  if (carregando) {
    return (
      <View>
        <Text>Carregando contato...</Text>
      </View>
    );
  }

  return (
    <View>
      <Text>Detalhes do Contato</Text>

      <Text>
        Nome: {contato.nome}
      </Text>

      <Text>
        Telefone: {contato.telefone}
      </Text>

      <Text>
        Cidade: {contato.cidade}
      </Text>

      <Text>
        Anotação: {contato.anotacao}
      </Text>

      <Button
        title="Editar"
        onPress={() =>
          navigation.navigate('EditarContato', {
            contato: contato,
          })
        }
      />

      <Button
        title="Excluir"
        onPress={() =>
          navigation.navigate('ExcluirContato', {
            contato: contato,
          })
        }
      />
    </View>
  );
}