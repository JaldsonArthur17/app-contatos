import { useCallback, useState } from 'react';

import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { useFocusEffect } from '@react-navigation/native';

import api from '../services/api';
import { auth } from '../services/auth';

export default function DetalhesContatoScreen({ route, navigation }) {
  const { contato: contatoInicial } = route.params;

  const [contato, setContato] = useState(contatoInicial);
  const [carregando, setCarregando] = useState(true);

  const carregarContato = useCallback(async () => {
    try {
      setCarregando(true);

      const usuario = auth.currentUser;

      if (!usuario) {
        return;
      }

      const response = await api.get(
        `/contatos?id=${contatoInicial.id}&uid=${usuario.uid}`
      );

      if (response.data.length > 0) {
        setContato(response.data[0]);
      }
    } catch (error) {
      console.log('Erro ao carregar contato:', error);
    } finally {
      setCarregando(false);
    }
  }, [contatoInicial.id]);

  useFocusEffect(
    useCallback(() => {
      carregarContato();
    }, [carregarContato])
  );

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

  if (carregando) {
    return (
      <View style={styles.carregando}>
        <ActivityIndicator size="large" />

        <Text style={styles.carregandoTexto}>
          Carregando contato...
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.cabecalho}>
        <Text style={styles.titulo}>
          Detalhes do Contato
        </Text>
      </View>

      <View style={styles.conteudo}>
        <View style={styles.avatar}>
          <Text style={styles.avatarTexto}>
            {obterIniciais(contato.nome)}
          </Text>
        </View>

        <Text style={styles.nome}>
          {contato.nome}
        </Text>

        <View style={styles.card}>
          <Text style={styles.label}>
            Telefone
          </Text>

          <Text style={styles.valor}>
            {contato.telefone}
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>
            Cidade
          </Text>

          <Text style={styles.valor}>
            {contato.cidade}
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>
            Anotação
          </Text>

          <Text style={styles.valor}>
            {contato.anotacao || 'Nenhuma anotação.'}
          </Text>
        </View>

        <View style={styles.acoes}>
          <Pressable
            style={styles.botaoEditar}
            onPress={() =>
              navigation.navigate('EditarContato', {
                contato: contato,
              })
            }
          >
            <Text style={styles.textoBotaoEditar}>
              Editar
            </Text>
          </Pressable>

          <Pressable
            style={styles.botaoExcluir}
            onPress={() =>
              navigation.navigate('ExcluirContato', {
                contato: contato,
              })
            }
          >
            <Text style={styles.textoBotaoExcluir}>
              Excluir
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
    backgroundColor: '#F5F7FA',
  },

  cabecalho: {
    backgroundColor: '#087CF0',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },

  titulo: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '700',
  },

  conteudo: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 28,
  },

  avatar: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: '#E5F0FF',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 14,
  },

  avatarTexto: {
    color: '#087CF0',
    fontSize: 26,
    fontWeight: '700',
  },

  nome: {
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 24,
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
  },

  label: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 5,
  },

  valor: {
    fontSize: 16,
  },

  acoes: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 12,
  },

  botaoEditar: {
    flex: 1,
    height: 48,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#087CF0',
    justifyContent: 'center',
    alignItems: 'center',
  },

  textoBotaoEditar: {
    color: '#087CF0',
    fontSize: 16,
    fontWeight: '700',
  },

  botaoExcluir: {
    flex: 1,
    height: 48,
    borderRadius: 8,
    backgroundColor: '#E53935',
    justifyContent: 'center',
    alignItems: 'center',
  },

  textoBotaoExcluir: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },

  carregando: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  carregandoTexto: {
    marginTop: 10,
    fontSize: 14,
  },
});