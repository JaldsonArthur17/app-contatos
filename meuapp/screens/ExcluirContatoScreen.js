import { useState } from 'react';

import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import api from '../services/api';

export default function ExcluirContatoScreen({ route, navigation }) {
  const { contato } = route.params;

  const [modalVisivel, setModalVisivel] = useState(true);
  const [mensagem, setMensagem] = useState('');

  async function excluirContato() {
    try {
      await api.delete(`/contatos/${contato.id}`);

      setModalVisivel(false);
      setMensagem('Contato excluído com sucesso!');

      navigation.navigate('Contatos');
    } catch (error) {
      console.log('Erro ao excluir contato:', error);

      setModalVisivel(false);
      setMensagem('Erro ao excluir contato.');
    }
  }

  function cancelarExclusao() {
    setModalVisivel(false);
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>
        Excluir Contato
      </Text>

      <Text style={styles.mensagem}>
        {mensagem}
      </Text>

      <Modal
        visible={modalVisivel}
        transparent
        animationType="fade"
        onRequestClose={cancelarExclusao}
      >
        <View style={styles.overlay}>
          <View style={styles.modal}>
            <Text style={styles.modalTitulo}>
              Excluir contato?
            </Text>

            <Text style={styles.modalTexto}>
              Deseja realmente excluir o contato:
            </Text>

            <Text style={styles.nomeContato}>
              {contato.nome}
            </Text>

            <View style={styles.botoes}>
              <Pressable
                style={styles.botaoCancelar}
                onPress={cancelarExclusao}
              >
                <Text style={styles.textoCancelar}>
                  Cancelar
                </Text>
              </Pressable>

              <Pressable
                style={styles.botaoExcluir}
                onPress={excluirContato}
              >
                <Text style={styles.textoExcluir}>
                  Excluir
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
    padding: 24,
  },

  titulo: {
    fontSize: 24,
    fontWeight: '700',
  },

  mensagem: {
    marginTop: 20,
    textAlign: 'center',
    fontSize: 15,
  },

  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },

  modal: {
    width: '100%',
    maxWidth: 380,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
  },

  modalTitulo: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 12,
  },

  modalTexto: {
    fontSize: 15,
    marginBottom: 8,
  },

  nomeContato: {
    fontSize: 17,
    fontWeight: '700',
    marginBottom: 24,
  },

  botoes: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
  },

  botaoCancelar: {
    paddingHorizontal: 18,
    paddingVertical: 11,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#D9DEE7',
  },

  textoCancelar: {
    fontWeight: '600',
  },

  botaoExcluir: {
    paddingHorizontal: 18,
    paddingVertical: 11,
    borderRadius: 8,
    backgroundColor: '#E53935',
  },

  textoExcluir: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
});