import { useState } from "react";
import { View, Text, StyleSheet, Button, TextInput } from "react-native";

import Colors from "../constants/Colors";

const LoginScreen = ({ navigation }) => {
  const [username, onChangeUsername] = useState("");
  const [password, onChangePassword] = useState("");

  const [loading, setLoading] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>User name</Text>
      <TextInput
        style={styles.input}
        onChangeText={onChangeUsername}
        value={username}
        placeholder='Enter username'
      />
      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        onChangeText={onChangePassword}
        value={password}
        placeholder='Enter password'
        secureTextEntry
      />
      <Button
        title='Login'
        onPress={() => {
          navigation.navigate("Home");
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    justifyContent: "center",
    flex: 1,
  },
  label: {
    color: "gray",
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    padding: 10,
    marginTop: 5,
    marginBottom: 20,
    backgroundColor: "white",
    borderRadius: 5,
  },
  textButton: {
    alignSelf: "center",
    fontWeight: "bold",
    color: Colors.light.tint,
    marginVertical: 10,
  },
});

export default LoginScreen;
