import { createNativeStackNavigator } from '@react-navigation/native-stack';

import CadastroContatoScreen from '../screens/CadastroContatoScreen';
import ContatosScreen from '../screens/ContatosScreen';
import DetalhesContatoScreen from '../screens/DetalhesContatoScreen';
import EditarContatosScreen from '../screens/EditarContatosScreen';
import ExcluirContatoScreen from '../screens/ExcluirContatoScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Contatos"
        component={ContatosScreen}
        options={{
          title: 'Meus Contatos',
        }}
      />

      <Stack.Screen
        name="CadastroContato"
        component={CadastroContatoScreen}
        options={{
          title: 'Cadastrar Contato',
        }}
      />

      <Stack.Screen
        name="EditarContato"
        component={EditarContatosScreen}
        options={{
          title: 'Editar Contato',
        }}
      />

      <Stack.Screen
        name="ExcluirContato"
        component={ExcluirContatoScreen}
        options={{
          title: 'Excluir Contato',
        }}
      />
      <Stack.Screen
  name="DetalhesContato"
  component={DetalhesContatoScreen}
  options={{
    title: 'Detalhes do Contato',
  }}
/>
    </Stack.Navigator>
  );
}