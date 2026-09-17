import { Button, Text, View } from 'react-native';

export default function DetalhesContatoScreen({ route, navigation }) {
  const { contato } = route.params;

  return (
    <View>
      <Text>Detalhes do Contato</Text>

      <Text>Nome: {contato.nome}</Text>

      <Text>Telefone: {contato.telefone}</Text>

      <Text>Cidade: {contato.cidade}</Text>

      <Text>Anotação: {contato.anotacao}</Text>

      <Button
        title="Editar"
        onPress={() =>
          navigation.navigate('EditarContato', {
            contato: contato,
          })
        }
      />

      <Button
        title="Excluir"
        onPress={() =>
          navigation.navigate('ExcluirContato', {
            contato: contato,
          })
        }
      />
    </View>
  );
}