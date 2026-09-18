import { useEffect, useState } from 'react';

import {
  ActivityIndicator,
  View,
} from 'react-native';

import { onAuthStateChanged } from 'firebase/auth';

import { NavigationContainer } from '@react-navigation/native';

import { auth } from './services/auth';

import AppNavigator from './navigation/AppNavigator';
import AuthNavigator from './navigation/AuthNavigator';

export default function App() {
  const [usuario, setUsuario] = useState(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (usuarioAtual) => {
        setUsuario(usuarioAtual);
        setCarregando(false);
      }
    );

    return unsubscribe;
  }, []);

  if (carregando) {
    return (
      <View>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {usuario ? (
        <AppNavigator />
      ) : (
        <AuthNavigator />
      )}
    </NavigationContainer>
  );
}