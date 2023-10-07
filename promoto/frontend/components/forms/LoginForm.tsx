import { View, Text, StyleSheet, TextInput } from "react-native";
import React, { useState } from "react";
import { Button } from "react-native-elements";

const LoginForm = () => {
  const [displayPassword, setDisplayPassword] = useState(true);

  const handleDisplayPassword = () => {
    if (displayPassword) {
      setDisplayPassword(false);
    } else {
      setDisplayPassword(true);
    }
  };

  const handleLoginSubmit = () => {};

  return (
    <View style={[styles.conatiner, { height: 200 }]}>
      <View style={styles.inputRow}>
        <Text style={styles.inputTextLabel}>Username: </Text>
        <TextInput style={styles.inputTextFeild} placeholder="John Doe" />
      </View>
      <View style={styles.inputRow}>
        <Text style={styles.inputTextLabel}>Password: </Text>
        <TextInput
          style={styles.inputTextFeild}
          secureTextEntry={displayPassword}
          placeholder="12345"
        />
        <Button onPress={handleDisplayPassword}></Button>
      </View>
      <Button style={styles.submit} onPress={handleLoginSubmit}>
        <Text>Submit</Text>
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  conatiner: {
    backgroundColor: "gray",
    padding: 10,
  },
  inputTextLabel: {
    fontSize: 18,
    fontWeight: "600",
    width: 100,
  },
  inputTextFeild: {
    backgroundColor: "white",
    padding: 2,
    width: 200,
    borderRadius: 5,
    marginLeft: 13,
  },
  inputRow: {
    display: "flex",
    flexDirection: "row",
    marginTop: 15,
  },
  submit: {
    marginTop: 12,
  },
});

export default LoginForm;
