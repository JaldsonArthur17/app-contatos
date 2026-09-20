import { useState } from 'react';

import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import { cadastrarUsuario } from '../services/auth';

export default function CadastroScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [carregando, setCarregando] = useState(false);

  async function cadastrar() {
    try {
      setCarregando(true);
      setMensagem('');

      const response = await cadastrarUsuario(email, senha);

      console.log('Usuário cadastrado:', response.user);

      setMensagem('Usuário cadastrado com sucesso!');
    } catch (error) {
      console.log('Erro ao cadastrar usuário:', error);

      setMensagem('Erro ao cadastrar usuário.');
    } finally {
      setCarregando(false);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.titulo}>
          Criar sua conta
        </Text>

        <Text style={styles.subtitulo}>
          Cadastre-se para começar a usar o aplicativo.
        </Text>

        <Text style={styles.label}>
          E-mail
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Digite seu e-mail"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          autoCorrect={false}
        />

        <Text style={styles.label}>
          Senha
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Digite sua senha"
          value={senha}
          onChangeText={setSenha}
          secureTextEntry
          autoCapitalize="none"
          autoCorrect={false}
        />

        {mensagem !== '' && (
          <Text style={styles.mensagem}>
            {mensagem}
          </Text>
        )}

        <Pressable
          style={[
            styles.botao,
            carregando && styles.botaoDesativado,
          ]}
          onPress={cadastrar}
          disabled={carregando}
        >
          <Text style={styles.textoBotao}>
            {carregando ? 'Criando conta...' : 'Cadastrar'}
          </Text>
        </Pressable>

        <View style={styles.loginContainer}>
          <Text style={styles.textoLogin}>
            Já possui uma conta?
          </Text>

          <Pressable
            onPress={() => navigation.navigate('Login')}
          >
            <Text style={styles.linkLogin}>
              Fazer login
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },

  form: {
    width: '100%',
    maxWidth: 420,
  },

  titulo: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },

  subtitulo: {
    fontSize: 16,
    marginBottom: 32,
    textAlign: 'center',
  },

  label: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 6,
  },

  input: {
    height: 48,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 14,
    marginBottom: 18,
    fontSize: 16,
  },

  botao: {
    height: 48,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
    backgroundColor: '#087CF0',
  },

  botaoDesativado: {
    opacity: 0.6,
  },

  textoBotao: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },

  mensagem: {
    textAlign: 'center',
    marginBottom: 12,
    fontSize: 14,
  },

  loginContainer: {
    marginTop: 24,
    alignItems: 'center',
  },

  textoLogin: {
    fontSize: 14,
    marginBottom: 6,
  },

  linkLogin: {
    fontSize: 15,
    fontWeight: 'bold',
  },
});