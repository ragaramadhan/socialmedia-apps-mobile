import { useQuery } from "@apollo/client";
import React, { useState } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from "react-native";
import { PROFIL_DETAIL } from "../../queries/profil";

export default function UserDetail({ route }) {
  const { userId } = route.params;
  // console.log(userId);

  const [showDetails, setShowDetails] = useState(false);
  const { loading, error, data } = useQuery(PROFIL_DETAIL, {
    variables: {
      userId,
    },
    fetchPolicy: "network-only",
    nextFetchPolicy: "no-cache",
  });

  if (loading)
    return (
      <View>
        <Text>Loading... ...</Text>
      </View>
    );
  // const user = {
  //   username: "johndoe",
  //   followers: 123,
  //   following: 456,
  //   followersList: ["follower1", "follower2", "follower3"],
  //   followingList: ["following1", "following2", "following3"],
  // };
  // console.log(data);

  const user = data?.followerUser;

  const followersList = user.Followers;
  const followingList = user.Followings;

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.username}>@{user.username}</Text>
        <View style={styles.statsContainer}>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>{user.Followers.length}</Text>
            <Text style={styles.statLabel}>Followers</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>{user.Followings.length}</Text>
            <Text style={styles.statLabel}>Following</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.button} onPress={() => setShowDetails(!showDetails)}>
          <Text style={styles.buttonText}>Show Detail</Text>
        </TouchableOpacity>
        {showDetails && (
          <ScrollView style={styles.detailsContainer}>
            <Text style={styles.detailHeader}>Followers:</Text>
            {followersList.map((follower, index) => (
              <Text key={index} style={styles.detailText}>
                @{follower.username}
              </Text>
            ))}
            <Text style={styles.detailHeader}>Following:</Text>
            {followingList.map((following, index) => (
              <Text key={index} style={styles.detailText}>
                @{following.username}
              </Text>
            ))}
          </ScrollView>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f4f4f4",
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
  username: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 15,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginBottom: 15,
  },
  statBox: {
    alignItems: "center",
  },
  statNumber: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  statLabel: {
    fontSize: 14,
    color: "#888",
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
  detailsContainer: {
    width: "100%",
    marginTop: 15,
  },
  detailHeader: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  detailText: {
    fontSize: 14,
    color: "#555",
    marginBottom: 5,
  },
});
