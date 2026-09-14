import { useEffect, useState } from 'react';

import {
    Button,
    Text,
    TextInput,
    View,
} from 'react-native';

import api from '../services/api';

export default function EditarContatoScreen() {
  const [id, setId] = useState('');

  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [cidade, setCidade] = useState('');
  const [anotacao, setAnotacao] = useState('');

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
      setTelefone(contato.telefone);
      setCidade(contato.cidade);
      setAnotacao(contato.anotacao);
    } catch (error) {
      console.log('Erro ao carregar contato:', error);

      setMensagem('Erro ao carregar contato.');
    }
  }

  async function alterarContato() {
    try {
      const response = await api.put(`/contatos/${id}`, {
        nome: nome,
        telefone: telefone,
        cidade: cidade,
        anotacao: anotacao,
      });

      console.log('Contato alterado:', response.data);

      setMensagem('Contato alterado com sucesso!');
    } catch (error) {
      console.log('Erro ao alterar contato:', error);

      setMensagem('Erro ao alterar contato.');
    }
  }

  return (
    <View>
      <Text>Editar Contato</Text>

      <TextInput
        placeholder="Nome"
        value={nome}
        onChangeText={setNome}
      />

      <TextInput
        placeholder="Telefone"
        value={telefone}
        onChangeText={setTelefone}
      />

      <TextInput
        placeholder="Cidade"
        value={cidade}
        onChangeText={setCidade}
      />

      <TextInput
        placeholder="Anotação"
        value={anotacao}
        onChangeText={setAnotacao}
      />

      <Button
        title="Salvar alterações"
        onPress={alterarContato}
      />

      <Text>{mensagem}</Text>
    </View>
  );
}