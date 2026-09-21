import { useState } from 'react';

import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import { fazerLogin, mensagemErroFirebase } from '../services/auth';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [carregando, setCarregando] = useState(false);

  function validarFormulario() {
  if (!email.trim()) {
    return 'Informe seu e-mail.';
  }

  const emailValido =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

  if (!emailValido) {
    return 'Digite um e-mail válido.';
  }

  if (!senha) {
    return 'Informe sua senha.';
  }

  return '';
}

  async function entrar() {
  const erroValidacao = validarFormulario();

  if (erroValidacao) {
    setMensagem(erroValidacao);
    return;
  }

  try {
    setCarregando(true);
    setMensagem('');

    const response = await fazerLogin(
      email.trim(),
      senha
    );

    console.log('Usuário logado:', response.user);

    setMensagem('Login realizado com sucesso!');
  } catch (error) {
    console.log('Erro ao fazer login:', error);

    setMensagem(mensagemErroFirebase(error));
  } finally {
    setCarregando(false);
  }
}

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.form}>
        <Text style={styles.titulo}>
          Bem-vindo de volta!
        </Text>

        <Text style={styles.subtitulo}>
          Entre para acessar seus contatos.
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
          onPress={entrar}
          disabled={carregando}
        >
          <Text style={styles.textoBotao}>
            {carregando ? 'Entrando...' : 'Entrar'}
          </Text>
        </Pressable>

        <View style={styles.cadastroContainer}>
          <Text style={styles.textoCadastro}>
            Ainda não tem uma conta?
          </Text>

          <Pressable
            onPress={() => navigation.navigate('Cadastro')}
          >
            <Text style={styles.linkCadastro}>
              Cadastre-se
            </Text>
          </Pressable>
        </View>
      </View>
    </KeyboardAvoidingView>
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
  },

  botaoDesativado: {
    opacity: 0.6,
},

  textoBotao: {
    fontSize: 16,
    fontWeight: 'bold',
  },

  mensagem: {
    textAlign: 'center',
    marginBottom: 12,
    fontSize: 14,
  },

  cadastroContainer: {
    marginTop: 24,
    alignItems: 'center',
  },

  textoCadastro: {
    fontSize: 14,
    marginBottom: 6,
  },

  linkCadastro: {
    fontSize: 15,
    fontWeight: 'bold',
  },
});