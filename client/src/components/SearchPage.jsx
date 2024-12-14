import { useQuery, useLazyQuery, useMutation } from "@apollo/client";
import React, { useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet, StatusBar, Image, TouchableOpacity } from "react-native";
import { Search_User } from "../../queries/PostQuery";
import { useNavigation } from "@react-navigation/native";
import { DO_FOLLOW } from "../../mutations/UserMutation";
import { PROFIL_DETAIL } from "../../queries/profil";
export default function SearchPage() {
  const [userData, setUserData] = useState([]);
  const [username, setUsername] = useState("");
  const [temp, SetTemp] = useState("");
  const navigation = useNavigation();
  const [searchUser, { data }] = useLazyQuery(Search_User);
  const [follow, {}] = useMutation(DO_FOLLOW, {
    onCompleted: () => {
      SetTemp("");
    },
    refetchQueries: [
      {
        query: PROFIL_DETAIL,
      },
    ],
    awaitRefetchQueries: true,
  });
  async function handleCek() {
    const response = await searchUser({
      variables: {
        username,
      },
    });

    if (response?.data?.search) {
      setUserData(response.data.search); // Update userData with the search results
    }
  }
  function handleClick(userId) {
    navigation.navigate("UserDetail", { userId });
  }

  function handleFollow(userId) {
    follow({
      variables: {
        followingId: userId,
      },
    });

    navigation.navigate("UserDetail", { userId });
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      <View style={styles.searchBarContainer}>
        <TextInput style={styles.searchBar} placeholder="Search User..." placeholderTextColor="#888" onChangeText={(text) => setUsername(text)} />
        <TouchableOpacity style={styles.searchButton} onPress={handleCek}>
          <Text style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.userList}>
        {userData.map((item) => (
          <View key={item._id} style={styles.userItem}>
            <Image
              source={{
                uri: "https://cdn2.vectorstock.com/i/1000x1000/57/91/profile-avatar-icon-design-template-vector-28515791.jpg",
              }}
              style={styles.avatar}
            />
            <View style={styles.userInfo}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.username}>{item.username}</Text>
            </View>
            <TouchableOpacity style={[styles.detailButton, styles.followButton]} onPress={() => handleFollow(item._id)}>
              <Text style={styles.detailButtonText}>Follow</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.detailButton, styles.viewDetailButton]} onPress={() => handleClick(item._id)}>
              <Text style={styles.detailButtonText}>Detail</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  searchBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1a1a1a",
    padding: 10,
  },
  searchBar: {
    flex: 1,
    backgroundColor: "#333",
    color: "#fff",
    padding: 10,
    borderRadius: 8,
    fontSize: 16,
  },
  searchButton: {
    backgroundColor: "#444",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    marginLeft: 10,
  },
  searchButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  userList: {
    padding: 10,
  },
  userItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#444",
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  userInfo: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  username: {
    fontSize: 14,
    color: "#888",
  },
  detailButton: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 8,
    marginHorizontal: 5,
  },
  followButton: {
    backgroundColor: "#1DA1F2",
  },
  viewDetailButton: {
    backgroundColor: "#FFA500",
  },
  detailButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
  },
});
