import { useState } from 'react';

import {
  Button,
  Text,
  TextInput,
  View,
} from 'react-native';

import api from '../services/api';

export default function EditarContatosScreen({ route, navigation }) {
  const { contato } = route.params;

  const [nome, setNome] = useState(contato.nome);
  const [telefone, setTelefone] = useState(contato.telefone);
  const [cidade, setCidade] = useState(contato.cidade);
  const [anotacao, setAnotacao] = useState(contato.anotacao);

  const [mensagem, setMensagem] = useState('');

  async function alterarContato() {
    try {
      const response = await api.put(`/contatos/${contato.id}`, {
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

      <Button
        title="Voltar"
        onPress={() => navigation.goBack()}
      />
    </View>
  );
}