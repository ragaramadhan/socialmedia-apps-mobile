import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Input, Button } from "@ui-kitten/components";
import { useMutation } from "@apollo/client";
import { useNavigation } from "@react-navigation/native";
import { REGISTER } from "../../queries/profil";
export default function Register() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();
  const [register, {}] = useMutation(REGISTER, {
    onCompleted: () => {
      navigation.navigate(`login`);
    },
  });

  function handleSubmit() {
    register({
      variables: {
        body: {
          name,
          username,
          email,
          password,
        },
      },
    });
  }
  //   useEffect(() => {
  //     console.log(name);

  //   }, [name]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Create your account</Text>
      <View style={styles.loginBox}>
        <Input style={styles.input} placeholder="Name" onChangeText={(text) => setName(text)} />
        <Input style={styles.input} placeholder="Username" onChangeText={(text) => setUsername(text)} />
        <Input style={styles.input} placeholder="Email" onChangeText={(text) => setEmail(text)} />
        <Input style={styles.input} placeholder="Password" onChangeText={(text) => setPassword(text)} secureTextEntry />
        <Button style={styles.button} onPress={handleSubmit}>
          Register
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black", // Sesuai desain di gambar
    padding: 20,
  },
  header: {
    fontSize: 26,
    fontWeight: "bold",
    color: "white",
    marginTop: 50, // Spasi di atas header
    marginBottom: 20, // Spasi antara header dan kotak input
    textAlign: "left",
  },
  loginBox: {
    flex: 1,
    justifyContent: "flex-start",
    paddingTop: 20,
  },
  input: {
    marginBottom: 20,
    borderRadius: 5,
    backgroundColor: "white", // Warna input sesuai dengan desain
  },
  button: {
    marginTop: 20,
    borderRadius: 30,
    backgroundColor: "#444", // Warna tombol abu-abu gelap
    alignSelf: "flex-end", // Tombol berada di kanan bawah
    width: 100,
  },
});
