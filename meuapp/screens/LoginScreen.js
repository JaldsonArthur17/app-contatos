import { useState } from 'react';

import {
    Button,
    Text,
    TextInput,
    View,
} from 'react-native';

import { fazerLogin } from '../services/auth';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mensagem, setMensagem] = useState('');

  async function entrar() {
    try {
      const response = await fazerLogin(email, senha);

      console.log('Usuário logado:', response.user);

      setMensagem('Login realizado com sucesso!');

      navigation.navigate('Contatos');
    } catch (error) {
      console.log('Erro ao fazer login:', error);

      setMensagem('E-mail ou senha inválidos.');
    }
  }

  return (
    <View>
      <Text>Bem-vindo de volta!</Text>

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
        title="Entrar"
        onPress={entrar}
      />

      <Text>{mensagem}</Text>

      <Button
        title="Ainda não tenho uma conta"
        onPress={() => navigation.navigate('Cadastro')}
      />
    </View>
  );
}