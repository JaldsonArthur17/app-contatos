import { useState } from 'react';

import {
    Button,
    Text,
    View,
} from 'react-native';

import { fazerLogout } from '../services/auth';

export default function PerfilScreen({ navigation }) {
  const [mensagem, setMensagem] = useState('');

  async function sair() {
    try {
      await fazerLogout();

      navigation.reset({
        index: 0,
        routes: [
          {
            name: 'Login',
          },
        ],
      });
    } catch (error) {
      console.log('Erro ao sair:', error);

      setMensagem('Erro ao realizar logout.');
    }
  }

  return (
    <View>
      <Text>Perfil</Text>

      <Button
        title="Sair"
        onPress={sair}
      />

      <Text>{mensagem}</Text>
    </View>
  );
}