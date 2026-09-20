import { ActivityIndicator, Text, View } from 'react-native';

export default function SplashScreen() {
  return (
    <View>
      <Text>Carregando...</Text>

      <ActivityIndicator size="large"/>
    </View>
  );
}