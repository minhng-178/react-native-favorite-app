import { View, Text, StyleSheet, Button } from "react-native";
import React from "react";

const WelcomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>WelcomeScreen</Text>
      <Button
        title='Go to Menu'
        onPress={() => {
          navigation.navigate("Menu");
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default WelcomeScreen;
