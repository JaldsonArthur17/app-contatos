import { createNativeStackNavigator } from '@react-navigation/native-stack';

import CadastroScreen from '../screens/CadastroScreen';
import LoginScreen from '../screens/LoginScreen';

const Stack = createNativeStackNavigator();

export default function AuthNavigator() {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          title: 'Login',
        }}
      />

      <Stack.Screen
        name="Cadastro"
        component={CadastroScreen}
        options={{
          title: 'Cadastro',
        }}
      />
    </Stack.Navigator>
  );
}