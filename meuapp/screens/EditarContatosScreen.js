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

export default function EditarContatosScreen({ route, navigation }) {
  const { contato } = route.params;

  const [nome, setNome] = useState(contato.nome);
  const [telefone, setTelefone] = useState(contato.telefone);
  const [cidade, setCidade] = useState(contato.cidade);
  const [anotacao, setAnotacao] = useState(
    contato.anotacao || ''
  );

  const [mensagem, setMensagem] = useState('');
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);

  function validarFormulario() {
    if (!nome.trim()) {
      return 'Informe o nome do contato.';
    }

    if (!telefone.trim()) {
      return 'Informe o telefone do contato.';
    }

    const telefoneNumeros = telefone.replace(/\D/g, '');

    if (telefoneNumeros.length < 10) {
      return 'Informe um telefone válido.';
    }

    if (!cidade.trim()) {
      return 'Informe a cidade do contato.';
    }

    return '';
  }

  async function alterarContato() {
    const erroValidacao = validarFormulario();

    if (erroValidacao) {
      setErro(erroValidacao);
      setMensagem('');
      return;
    }

    try {
      const usuario = auth.currentUser;

      if (!usuario) {
        setErro('Usuário não autenticado.');
        setMensagem('');
        return;
      }

      setCarregando(true);
      setErro('');
      setMensagem('');

      const response = await api.put(`/contatos/${contato.id}`, {
        uid: usuario.uid,
        nome: nome.trim(),
        telefone: telefone.trim(),
        cidade: cidade.trim(),
        anotacao: anotacao.trim(),
      });

      console.log('Contato alterado:', response.data);

      navigation.goBack();
    } catch (error) {
      console.log('Erro ao alterar contato:', error);

      setErro('Não foi possível alterar o contato.');
      setMensagem('');
    } finally {
      setCarregando(false);
    }
  }

  function obterIniciais(nome) {
    if (!nome) {
      return '?';
    }

    const partes = nome.trim().split(' ');

    if (partes.length === 1) {
      return partes[0]
        .substring(0, 2)
        .toUpperCase();
    }

    return (
      partes[0][0] +
      partes[partes.length - 1][0]
    ).toUpperCase();
  }

  return (
    <View style={styles.container}>
      <View style={styles.conteudo}>
        <View style={styles.avatarContainer}>
          <View style={styles.avatar}>
            <Text style={styles.avatarTexto}>
              {obterIniciais(nome)}
            </Text>
          </View>

          <Text style={styles.textoFoto}>
            Editar contato
          </Text>
        </View>

        <Text style={styles.label}>
          Nome *
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Nome"
          value={nome}
          onChangeText={setNome}
        />

        <Text style={styles.label}>
          Telefone *
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Telefone"
          value={telefone}
          onChangeText={setTelefone}
          keyboardType="phone-pad"
        />

        <Text style={styles.label}>
          Cidade *
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Cidade"
          value={cidade}
          onChangeText={setCidade}
        />

        <Text style={styles.label}>
          Anotação
        </Text>

        <TextInput
          style={[styles.input, styles.inputAnotacao]}
          placeholder="Anotação (opcional)"
          value={anotacao}
          onChangeText={setAnotacao}
          multiline
        />

        {erro !== '' && (
          <Text style={styles.erro}>
            {erro}
          </Text>
        )}

        {mensagem !== '' && (
          <Text style={styles.mensagem}>
            {mensagem}
          </Text>
        )}

        <Pressable
          style={[
            styles.botaoSalvar,
            carregando && styles.botaoDesativado,
          ]}
          onPress={alterarContato}
          disabled={carregando}
        >
          <Text style={styles.textoBotao}>
            {carregando
              ? 'Salvando...'
              : 'Salvar alterações'}
          </Text>
        </Pressable>

        <Pressable
          style={styles.botaoCancelar}
          onPress={() => navigation.goBack()}
          disabled={carregando}
        >
          <Text style={styles.textoCancelar}>
            Cancelar
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
    backgroundColor: '#E5F0FF',
    justifyContent: 'center',
    alignItems: 'center',
  },

  avatarTexto: {
    color: '#087CF0',
    fontSize: 24,
    fontWeight: '700',
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

  erro: {
    color: '#E53935',
    textAlign: 'center',
    marginBottom: 12,
    fontSize: 14,
  },

  mensagem: {
    color: '#2E7D32',
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

  botaoDesativado: {
    opacity: 0.6,
  },

  textoBotao: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },

  botaoCancelar: {
    height: 48,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#D9DEE7',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
  },

  textoCancelar: {
    fontSize: 15,
    fontWeight: '600',
  },
});