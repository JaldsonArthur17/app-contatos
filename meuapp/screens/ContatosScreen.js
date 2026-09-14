import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';

import { buscarContatos } from '../services/api';

export default function ContatosScreen() {
  const [contatos, setContatos] = useState([]);

  useEffect(() => {
    carregarContatos();
  }, []);

  async function carregarContatos() {
    try {
      const dados = await buscarContatos();

      console.log(dados);

      setContatos(dados);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View>
      <Text>Meus Contatos</Text>

      {contatos.map((contato) => (
        <Text key={contato.id}>
          {contato.nome}
        </Text>
      ))}
    </View>
  );
}