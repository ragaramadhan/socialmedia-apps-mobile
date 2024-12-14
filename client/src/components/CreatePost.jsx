import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, StatusBar, TouchableOpacity, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useMutation } from "@apollo/client";
import { DO_POST } from "../../mutations/createpost";
import { Get_Post } from "../../queries/PostQuery";
export default function CreatePostPage() {
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const navigation = useNavigation();
  const [createPost, { loading, error, data }] = useMutation(DO_POST, {
    refetchQueries: [
      {
        query: Get_Post,
      },
    ],
  });
  function handleCreatePost() {
    // const postData = {
    //   content,
    //   tags: tags.split(",").map((tag) => tag.trim()), // Split tags into an array
    //   imgUrl,
    // };
    createPost({
      variables: {
        body: {
          imgUrl,
          tags: tags.split(",").map((tag) => tag.trim()),
          content,
        },
      },
    });

    navigation.navigate("Home");
    // console.log(postData.tags);

    setContent("");
    setTags("");
    setImgUrl("");
  }

  return (
    <ScrollView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      <View style={styles.inputContainer}>
        <TextInput style={styles.input} placeholder="Post Content..." placeholderTextColor="#888" value={content} onChangeText={setContent} />
        <TextInput style={styles.input} placeholder="Tags (Use comma if you want more than 1 tag )" placeholderTextColor="#888" value={tags} onChangeText={setTags} />
        <TextInput style={styles.input} placeholder="Image URL..." placeholderTextColor="#888" value={imgUrl} onChangeText={setImgUrl} />
        <TouchableOpacity style={styles.createButton} onPress={handleCreatePost}>
          <Text style={styles.createButtonText}>Create Post</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    padding: 20,
  },
  inputContainer: {
    marginTop: 20,
  },
  input: {
    backgroundColor: "#333",
    color: "#fff",
    padding: 10,
    borderRadius: 8,
    fontSize: 16,
    marginBottom: 15,
  },
  createButton: {
    backgroundColor: "#444",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  createButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
