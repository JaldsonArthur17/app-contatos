import { useCallback, useState } from 'react';

import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import { useFocusEffect } from '@react-navigation/native';

import api from '../services/api';

export default function ContatosScreen({ navigation }) {
  const [contatos, setContatos] = useState([]);
  const [busca, setBusca] = useState('');
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(false);

  const carregarContatos = useCallback(async () => {
    setCarregando(true);
    setErro(false);

    try {
      const response = await api.get('/contatos');

      setContatos(response.data);
    } catch (error) {
      console.log('Erro ao consultar contatos:', error);

      setErro(true);
      setContatos([]);
    } finally {
      setCarregando(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      carregarContatos();
    }, [carregarContatos])
  );

  const contatosFiltrados = contatos.filter((contato) => {
    const textoBusca = busca.toLowerCase();

    return (
      contato.nome?.toLowerCase().includes(textoBusca) ||
      contato.telefone?.toLowerCase().includes(textoBusca) ||
      contato.cidade?.toLowerCase().includes(textoBusca)
    );
  });

  function obterIniciais(nome) {
    if (!nome) {
      return '?';
    }

    const partes = nome.trim().split(' ');

    if (partes.length === 1) {
      return partes[0].substring(0, 2).toUpperCase();
    }

    return (
      partes[0][0] + partes[partes.length - 1][0]
    ).toUpperCase();
  }

  function renderContato({ item }) {
    return (
      <Pressable
        style={styles.card}
        onPress={() =>
          navigation.navigate('DetalhesContato', {
            contato: item,
          })
        }
      >
        <View style={styles.avatar}>
          <Text style={styles.avatarTexto}>
            {obterIniciais(item.nome)}
          </Text>
        </View>

        <View style={styles.info}>
          <Text style={styles.nome}>
            {item.nome}
          </Text>

          <Text style={styles.detalhe}>
            {item.telefone}
          </Text>

          <Text style={styles.detalhe}>
            {item.cidade}
          </Text>
        </View>

        <Text style={styles.seta}>
          ›
        </Text>
      </Pressable>
    );
  }

  function renderConteudo() {
    if (carregando) {
      return (
        <View style={styles.estado}>
          <ActivityIndicator size="large" />
          <Text style={styles.estadoTexto}>
            Carregando contatos...
          </Text>
        </View>
      );
    }

    if (erro) {
      return (
        <View style={styles.estado}>
          <Text style={styles.iconeErro}>
            !
          </Text>

          <Text style={styles.estadoTitulo}>
            Não foi possível carregar os contatos.
          </Text>

          <Text style={styles.estadoTexto}>
            Verifique sua conexão e tente novamente.
          </Text>

          <Pressable
            style={styles.botaoPrincipal}
            onPress={carregarContatos}
          >
            <Text style={styles.botaoTexto}>
              Tentar novamente
            </Text>
          </Pressable>
        </View>
      );
    }

    if (contatosFiltrados.length === 0) {
      return (
        <View style={styles.estado}>
          <Text style={styles.iconeVazio}>
            👤
          </Text>

          <Text style={styles.estadoTitulo}>
            Nenhum contato ainda
          </Text>

          <Text style={styles.estadoTexto}>
            Adicione seu primeiro contato para começar.
          </Text>

          <Pressable
            style={styles.botaoPrincipal}
            onPress={() =>
              navigation.navigate('NovoContato')
            }
          >
            <Text style={styles.botaoTexto}>
              Adicionar contato
            </Text>
          </Pressable>
        </View>
      );
    }

    return (
      <FlatList
        data={contatosFiltrados}
        keyExtractor={(item) => String(item.id)}
        renderItem={renderContato}
        contentContainerStyle={styles.lista}
        showsVerticalScrollIndicator={false}
      />
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.cabecalho}>
        <View>
          <Text style={styles.titulo}>
            Meus Contatos
          </Text>

          <Text style={styles.subtitulo}>
            Seus contatos em um só lugar
          </Text>
        </View>

        <Pressable
          style={styles.botaoAdicionar}
          onPress={() =>
            navigation.navigate('NovoContato')
          }
        >
          <Text style={styles.botaoAdicionarTexto}>
            +
          </Text>
        </Pressable>
      </View>

      <View style={styles.buscaContainer}>
        <Text style={styles.iconeBusca}>
          🔍
        </Text>

        <TextInput
          style={styles.inputBusca}
          placeholder="Buscar contato..."
          value={busca}
          onChangeText={setBusca}
        />
      </View>

      <View style={styles.conteudo}>
        {renderConteudo()}
      </View>

      <View style={styles.menuInferior}>
        <Pressable style={styles.menuItem}>
          <Text style={styles.menuIcone}>
            👥
          </Text>

          <Text style={styles.menuAtivo}>
            Contatos
          </Text>
        </Pressable>

        <Pressable
          style={styles.menuItem}
          onPress={() => navigation.navigate('Perfil')}
        >
          <Text style={styles.menuIcone}>
            👤
          </Text>

          <Text style={styles.menuTexto}>
            Perfil
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

  cabecalho: {
    backgroundColor: '#087CF0',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  titulo: {
    color: '#FFFFFF',
    fontSize: 26,
    fontWeight: '700',
  },

  subtitulo: {
    color: '#DCEBFF',
    fontSize: 14,
    marginTop: 4,
  },

  botaoAdicionar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },

  botaoAdicionarTexto: {
    color: '#087CF0',
    fontSize: 30,
    lineHeight: 32,
    fontWeight: '500',
  },

  buscaContainer: {
    marginHorizontal: 16,
    marginTop: -10,
    marginBottom: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    height: 44,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    elevation: 2,
  },

  iconeBusca: {
    fontSize: 16,
    marginRight: 8,
  },

  inputBusca: {
    flex: 1,
    fontSize: 15,
  },

  conteudo: {
    flex: 1,
  },

  lista: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
  },

  avatar: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: '#E5F0FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },

  avatarTexto: {
    color: '#087CF0',
    fontWeight: '700',
    fontSize: 15,
  },

  info: {
    flex: 1,
  },

  nome: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 3,
  },

  detalhe: {
    fontSize: 13,
    marginTop: 1,
  },

  seta: {
    fontSize: 28,
    marginLeft: 8,
  },

  estado: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },

  estadoTitulo: {
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
    marginTop: 12,
  },

  estadoTexto: {
    fontSize: 14,
    textAlign: 'center',
    marginTop: 8,
  },

  iconeVazio: {
    fontSize: 48,
  },

  iconeErro: {
    width: 54,
    height: 54,
    borderWidth: 2,
    borderColor: '#E53935',
    borderRadius: 27,
    color: '#E53935',
    fontSize: 32,
    fontWeight: '700',
    textAlign: 'center',
    lineHeight: 48,
  },

  botaoPrincipal: {
    marginTop: 20,
    backgroundColor: '#087CF0',
    borderRadius: 8,
    paddingHorizontal: 24,
    paddingVertical: 12,
  },

  botaoTexto: {
    color: '#FFFFFF',
    fontWeight: '700',
  },

  menuInferior: {
    height: 68,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },

  menuItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  menuIcone: {
    fontSize: 18,
  },

  menuAtivo: {
    color: '#087CF0',
    fontSize: 12,
    fontWeight: '700',
    marginTop: 3,
  },

  menuTexto: {
    fontSize: 12,
    marginTop: 3,
  },
});