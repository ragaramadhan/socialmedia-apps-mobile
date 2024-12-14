import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, Button } from "react-native";
import { Get_Post } from "../../queries/PostQuery";
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { useNavigation } from "@react-navigation/native";
import { DO_LIKE } from "../../mutations/likepost";
import { DETAIL_POST } from "../../queries/PostDetail";

export default function HomePage() {
  const { loading, error, data } = useQuery(Get_Post);
  const navigation = useNavigation();
  const [postId, setPostId] = useState("");
  const [likePost, {}] = useMutation(DO_LIKE, {
    refetchQueries: [
      {
        query: DETAIL_POST,
        variables: { postByIdId: postId },
      },
    ],
    // awaitRefetchQueries: true,
    onCompleted: () => {
      navigation.navigate("DetailPost", { postId });
      setPostId("");
      alert("Thanks For Like!");
    },
  });
  if (loading)
    return (
      <View>
        <Text>Loading ....</Text>
      </View>
    );
  if (error)
    return (
      <View>
        <Text>{error.message}</Text>
      </View>
    );

  function handleClick(postId) {
    // console.log(data);
    navigation.navigate("DetailPost", { postId });
  }
  function handleLike(postId) {
    // console.log(data);
    setPostId(postId);
    likePost({
      variables: {
        postId,
      },
    });
  }
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>What happend at Today ??? 👌</Text>
      {data.posts.map((post) => (
        <View key={post._id} style={styles.card}>
          <View style={styles.cardHeader}>
            <Image source={{ uri: "https://preview.redd.it/gc2m1tdq22w81.jpg?auto=webp&s=986e1823e5e7d80c2e61f93223467339cbbfd2f2" }} style={styles.avatar} />
            <Text style={styles.user}>{post.User.username}</Text>
          </View>
          <Text style={styles.content}>{post.content}</Text>
          {post.imgUrl && <Image source={{ uri: post.imgUrl }} style={styles.image} />}
          <View style={styles.actionsContainer}>
            <TouchableOpacity style={styles.actionButton} onPress={() => handleClick(post._id)}>
              <Text style={styles.actionText}>Cek Detail Post</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton} onPress={() => handleLike(post._id)}>
              <Text style={styles.actionText}>Like</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    padding: 10,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#1DA1F2",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: 15,
    margin: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  user: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#14171A",
  },
  content: {
    fontSize: 14,
    marginBottom: 10,
    color: "#14171A",
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 8,
    marginTop: 10,
  },
  actionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  actionButton: {
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  actionText: {
    fontSize: 14,
    color: "#1DA1F2",
  },
});
