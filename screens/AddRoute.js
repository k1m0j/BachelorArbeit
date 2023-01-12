import { Button, StyleSheet, Text, TextInput, View } from "react-native";

function AddRoute() {
  return (
    <View>
      <View>
        <Text>Start location</Text>
        <TextInput></TextInput>
        <Button title="test">TEst</Button>
      </View>
      <View>
        <Text>Destination</Text>
        <TextInput></TextInput>
        <Button title="test">Test</Button>
      </View>
    </View>
  );
}

export default AddRoute;

const styles = StyleSheet.create({});
