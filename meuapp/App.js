import { NavigationContainer } from '@react-navigation/native';

import { onAuthStateChanged } from 'firebase/auth';

import { useEffect, useState } from 'react';

import AppNavigator from './navigation/AppNavigator';
import AuthNavigator from './navigation/AuthNavigator';
import SplashScreen from './screens/SplashScreen';

import { auth } from './services/auth';

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
    return <SplashScreen />;
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