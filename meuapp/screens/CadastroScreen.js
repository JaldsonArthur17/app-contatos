import { useState } from 'react';

import {
    Button,
    Text,
    TextInput,
    View,
} from 'react-native';

import { cadastrarUsuario } from '../services/auth';

export default function CadastroScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mensagem, setMensagem] = useState('');

  async function cadastrar() {
    try {
      const response = await cadastrarUsuario(email, senha);

      console.log('Usuário cadastrado:', response.user);

      setMensagem('Usuário cadastrado com sucesso!');
    } catch (error) {
      console.log('Erro ao cadastrar usuário:', error);

      setMensagem('Erro ao cadastrar usuário.');
    }
  }

  return (
    <View>
      <Text>Criar sua conta</Text>

      <TextInput
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />

      <TextInput
        placeholder="Senha"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
      />

      <Button
        title="Cadastrar"
        onPress={cadastrar}
      />

      <Text>{mensagem}</Text>

      <Button
        title="Já tenho uma conta"
        onPress={() => navigation.navigate('Login')}
      />
    </View>
  );
}