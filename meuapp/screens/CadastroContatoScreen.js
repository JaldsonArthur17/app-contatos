import { useState } from 'react';

import { Button, Text, TextInput, View } from 'react-native';

import api from '../services/api';

export default function CadastroContatoScreen() {
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [cidade, setCidade] = useState('');
  const [anotacao, setAnotacao] = useState('');
  const [mensagem, setMensagem] = useState('');

  async function cadastrarContato() {
    try {
      const response = await api.post('/contatos', {
        nome: nome,
        telefone: telefone,
        cidade: cidade,
        anotacao: anotacao,
      });

      console.log('Contato cadastrado:', response.data);

      setMensagem('Contato cadastrado com sucesso!');
    } catch (error) {
      console.log('Erro ao cadastrar contato:', error);

      setMensagem('Erro ao cadastrar contato.');
    }
  }

  return (
    <View>
      <Text>Cadastrar Contato</Text>

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
        title="Cadastrar"
        onPress={cadastrarContato}
      />

      <Text>{mensagem}</Text>
    </View>
  );
}