import { useState } from 'react';

import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import api from '../services/api';
import { auth } from '../services/auth';

export default function NovoContatoScreen({ navigation }) {
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [cidade, setCidade] = useState('');
  const [anotacao, setAnotacao] = useState('');
  const [mensagem, setMensagem] = useState('');

  async function cadastrarContato() {
    try {
      const response = await api.post('/contatos', {
        uid: auth.currentUser.uid,
        nome: nome,
        telefone: telefone,
        cidade: cidade,
        anotacao: anotacao,
      });

      console.log('Contato cadastrado:', response.data);

      setMensagem('Contato cadastrado com sucesso!');

      setNome('');
      setTelefone('');
      setCidade('');
      setAnotacao('');
    } catch (error) {
      console.log('Erro ao cadastrar contato:', error);

      setMensagem('Erro ao cadastrar contato.');
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.conteudo}>
        <View style={styles.avatarContainer}>
          <View style={styles.avatar}>
            <Text style={styles.avatarIcone}>👤</Text>
          </View>

          <Text style={styles.textoFoto}>
            Adicionar foto
          </Text>
        </View>

        <Text style={styles.label}>Nome *</Text>

        <TextInput
          style={styles.input}
          placeholder="Nome"
          value={nome}
          onChangeText={setNome}
        />

        <Text style={styles.label}>Telefone *</Text>

        <TextInput
          style={styles.input}
          placeholder="Telefone"
          value={telefone}
          onChangeText={setTelefone}
          keyboardType="phone-pad"
        />

        <Text style={styles.label}>Cidade *</Text>

        <TextInput
          style={styles.input}
          placeholder="Cidade"
          value={cidade}
          onChangeText={setCidade}
        />

        <Text style={styles.label}>Anotação</Text>

        <TextInput
          style={[styles.input, styles.inputAnotacao]}
          placeholder="Anotação (opcional)"
          value={anotacao}
          onChangeText={setAnotacao}
          multiline
        />

        {mensagem !== '' && (
          <Text style={styles.mensagem}>
            {mensagem}
          </Text>
        )}

        <Pressable
          style={styles.botaoSalvar}
          onPress={cadastrarContato}
        >
          <Text style={styles.textoBotao}>
            Salvar
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },

  conteudo: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },

  avatarContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },

  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#E6EAF0',
    justifyContent: 'center',
    alignItems: 'center',
  },

  avatarIcone: {
    fontSize: 38,
  },

  textoFoto: {
    marginTop: 8,
    fontSize: 13,
  },

  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 6,
  },

  input: {
    backgroundColor: '#FFFFFF',
    height: 48,
    borderWidth: 1,
    borderColor: '#D9DEE7',
    borderRadius: 8,
    paddingHorizontal: 14,
    fontSize: 15,
    marginBottom: 16,
  },

  inputAnotacao: {
    height: 80,
    paddingTop: 12,
    textAlignVertical: 'top',
  },

  mensagem: {
    textAlign: 'center',
    marginBottom: 12,
    fontSize: 14,
  },

  botaoSalvar: {
    backgroundColor: '#087CF0',
    height: 48,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 4,
  },

  textoBotao: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});