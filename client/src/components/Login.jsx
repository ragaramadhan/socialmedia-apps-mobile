import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { Input, Button } from "@ui-kitten/components";
import { useLazyQuery, useMutation } from "@apollo/client";
import * as SecureStore from "expo-secure-store";
import { DO_LOGIN } from "../../mutations/UserMutation";
import { LoginContext } from "../../context/LoginContext";
import { useContext } from "react";
import { useNavigation } from "@react-navigation/native";
export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setIsLoggedIn } = useContext(LoginContext);
  const navigation = useNavigation();
  const [login, { loading, error, data }] = useMutation(DO_LOGIN, {
    onCompleted: async (res) => {
      if (res?.login?.message) {
        await SecureStore.setItemAsync("token", res.login.message);
      }
      // console.log(res.login.message);
      // langsung set context
      setIsLoggedIn(true);
    },
  });

  async function handleSubmit() {
    await login({
      variables: {
        body: {
          username,
          password,
        },
      },
    });
  }

  // useEffect(() => {
  //   console.log(username);
  // }, [username]);
  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={{
          uri: "https://media.istockphoto.com/id/1324569050/vector/z-letter-liner-logo-design.jpg?s=612x612&w=0&k=20&c=OK89QZJ90zvKhFkB0lYGnpRBtXcf4Y067pY_xMGXwr8=",
        }}
      />
      <View style={styles.loginBox}>
        <Text style={styles.title}> Z LOGIN </Text>
        <Input style={styles.input} placeholder="Username " value={username} onChangeText={(text) => setUsername(text)} />
        <Input style={styles.input} placeholder="Password " value={password} onChangeText={(text) => setPassword(text)} secureTextEntry />
        <Button status="success" style={styles.button} onPress={handleSubmit}>
          Login
        </Button>
      </View>

      <Button style={styles.button} onPress={() => navigation.navigate(`register`)}>
        Register Here
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  loginBox: {
    width: "90%",
    padding: 20,
    borderRadius: 10,
    backgroundColor: "black", // Latar belakang  untuk box login
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "white", // Warna teks konsisten
  },
  input: {
    marginBottom: 15,
  },
  button: {
    marginTop: 10,
  },
  container: {
    // layar utama
    flex: 1,
    justifyContent: "center", // Elemen di tengah secara vertikal
    alignItems: "center", // Elemen di tengah secara horizontal
    backgroundColor: "#211f1f",
  },
  logo: {
    width: 200, // lebar
    height: 200, // Tinggi
    marginBottom: 95,
  },
});
