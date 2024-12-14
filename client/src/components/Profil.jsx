import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { useQuery } from "@apollo/client";
import { PROFIL_LOGIN } from "../../queries/profil";
import { useNavigation } from "@react-navigation/native";
import { LoginContext } from "../../context/LoginContext";
import { useContext } from "react";
import * as SecureStore from "expo-secure-store";
export default function UserProfile() {
  const { loading, error, data } = useQuery(PROFIL_LOGIN, {
    fetchPolicy: "network-only",
    nextFetchPolicy: "no-cache",
  });
  const navigation = useNavigation();
  const { setIsLoggedIn } = useContext(LoginContext);
  if (loading)
    return (
      <View>
        <Text>WAIT...</Text>
      </View>
    );
  //   console.log(data);
  function handleClick(userId) {
    navigation.navigate("UserDetailS", { userId });
  }

  async function handleLogout() {
    await SecureStore.deleteItemAsync("token");

    // ?? We will set the isLoggedIn to false
    setIsLoggedIn(false);
  }
  const user = data?.userLogin;
  //   console.log(user);

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Image source={{ uri: "https://cdn2.vectorstock.com/i/1000x1000/57/91/profile-avatar-icon-design-template-vector-28515791.jpg" }} style={styles.avatar} />
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.username}>@{user.username}</Text>
        <Text style={styles.email}>{user.email}</Text>
        <TouchableOpacity style={styles.button} onPress={() => handleClick(user._id)}>
          <Text style={styles.buttonText}>Detail</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
    padding: 10,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 20,
    width: "90%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  username: {
    fontSize: 16,
    color: "#666",
    marginBottom: 10,
  },
  email: {
    fontSize: 14,
    color: "#888",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#1DA1F2",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  logoutButton: {
    backgroundColor: "#FF6347",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  logoutButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
