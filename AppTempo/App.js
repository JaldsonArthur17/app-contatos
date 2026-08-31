import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import telaClima from './screens/telaClima';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Clima" 
        component={telaClima} 
        options={{ title: "clima na sua região"}}
        >
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  )
}