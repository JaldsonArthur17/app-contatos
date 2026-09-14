import { useEffect, useState } from 'react';

import { Button, Text, View } from 'react-native';

import api from '../services/api';

export default function ExcluirContatoScreen() {
  const [id, setId] = useState('');
  const [nome, setNome] = useState('');
  const [mensagem, setMensagem] = useState('');

  useEffect(() => {
    carregarContato();
  }, []);

  async function carregarContato() {
    try {
      const response = await api.get('/contatos');

      const contato = response.data[0];

      if (!contato) {
        setMensagem('Nenhum contato encontrado.');
        return;
      }

      setId(contato.id);
      setNome(contato.nome);
    } catch (error) {
      console.log('Erro ao carregar contato:', error);

      setMensagem('Erro ao carregar contato.');
    }
  }

  async function excluirContato() {
    try {
      await api.delete(`/contatos/${id}`);

      setMensagem('Contato excluído com sucesso!');
      setNome('');
      setId('');
    } catch (error) {
      console.log('Erro ao excluir contato:', error);

      setMensagem('Erro ao excluir contato.');
    }
  }

  return (
    <View>
      <Text>Excluir Contato</Text>

      <Text>
        {nome ? `Contato: ${nome}` : 'Nenhum contato selecionado'}
      </Text>

      <Button
        title="Excluir contato"
        onPress={excluirContato}
      />

      <Text>{mensagem}</Text>
    </View>
  );
}