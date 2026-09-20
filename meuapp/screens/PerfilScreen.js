import { useState } from 'react';

import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { auth, fazerLogout } from '../services/auth';

export default function PerfilScreen({ navigation }) {
  const [mensagem, setMensagem] = useState('');

  const usuario = auth.currentUser;

  async function sair() {
    try {
      await fazerLogout();
    } catch (error) {
      console.log('Erro ao sair:', error);
      setMensagem('Erro ao realizar logout.');
    }
  }

  function obterIniciais(email) {
    if (!email) {
      return '?';
    }

    return email.substring(0, 2).toUpperCase();
  }

  return (
    <View style={styles.container}>
      <View style={styles.cabecalho}>
        <Text style={styles.titulo}>
          Perfil
        </Text>
      </View>

      <View style={styles.conteudo}>
        <View style={styles.avatar}>
          <Text style={styles.avatarTexto}>
            {obterIniciais(usuario?.email)}
          </Text>
        </View>

        <Text style={styles.nome}>
          Usuário
        </Text>

        <Text style={styles.email}>
          {usuario?.email || 'Usuário não identificado'}
        </Text>

        <Pressable
          style={styles.botaoSair}
          onPress={sair}
        >
          <Text style={styles.textoBotaoSair}>
            Sair da conta
          </Text>
        </Pressable>

        {mensagem !== '' && (
          <Text style={styles.mensagem}>
            {mensagem}
          </Text>
        )}
      </View>

      <View style={styles.menuInferior}>
        <Pressable
          style={styles.menuItem}
          onPress={() => navigation.navigate('Contatos')}
        >
          <Text style={styles.menuIcone}>
            👥
          </Text>

          <Text style={styles.menuTexto}>
            Contatos
          </Text>
        </Pressable>

        <Pressable style={styles.menuItem}>
          <Text style={styles.menuIcone}>
            👤
          </Text>

          <Text style={styles.menuAtivo}>
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
    paddingVertical: 20,
  },

  titulo: {
    color: '#FFFFFF',
    fontSize: 26,
    fontWeight: '700',
  },

  conteudo: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 40,
  },

  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#E5F0FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 18,
  },

  avatarTexto: {
    color: '#087CF0',
    fontSize: 28,
    fontWeight: '700',
  },

  nome: {
    fontSize: 20,
    fontWeight: '700',
  },

  email: {
    fontSize: 15,
    marginTop: 6,
  },

  botaoSair: {
    width: '100%',
    maxWidth: 360,
    height: 48,
    backgroundColor: '#E53935',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 32,
  },

  textoBotaoSair: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },

  mensagem: {
    marginTop: 16,
    fontSize: 14,
    textAlign: 'center',
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

  menuTexto: {
    fontSize: 12,
    marginTop: 3,
  },

  menuAtivo: {
    color: '#087CF0',
    fontSize: 12,
    fontWeight: '700',
    marginTop: 3,
  },
});