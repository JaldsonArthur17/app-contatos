import { useState } from 'react';

import {
  Button,
  Text,
  View,
} from 'react-native';

import api from '../services/api';

export default function ExcluirContatoScreen({ route, navigation }) {
  const { contato } = route.params;

  const [mensagem, setMensagem] = useState('');

  async function excluirContato() {
    try {
      await api.delete(`/contatos/${contato.id}`);

      setMensagem('Contato excluído com sucesso!');
    } catch (error) {
      console.log('Erro ao excluir contato:', error);

      setMensagem('Erro ao excluir contato.');
    }
  }

  return (
    <View>
      <Text>Excluir Contato</Text>

      <Text>
        Deseja excluir o contato:
      </Text>

      <Text>{contato.nome}</Text>

      <Button
        title="Excluir contato"
        onPress={excluirContato}
      />

      <Text>{mensagem}</Text>

      <Button
        title="Voltar"
        onPress={() => navigation.goBack()}
      />
    </View>
  );
}