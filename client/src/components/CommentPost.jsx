import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { View, Text, Image, StyleSheet, ScrollView, FlatList, TouchableOpacity } from "react-native";
import { DETAIL_POST } from "../../queries/PostDetail";
import { TextInput } from "react-native";
import { Comment_User } from "../../queries/PostQuery";
import { useNavigation } from "@react-navigation/native";

export default function CommentPost({ route }) {
  const { postId } = route.params;
  const [commentInput, setCommentInput] = useState("");
  const navigation = useNavigation();

  const [comment, { error, loading }] = useMutation(Comment_User, {
    onCompleted: () => {
      navigation.navigate("DetailPost", { postId });
      setCommentInput("");
    },

    refetchQueries: [
      {
        query: DETAIL_POST,
        variables: { postByIdId: postId },
      },
    ],
    awaitRefetchQueries: true,
  });

  if (loading)
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading ....</Text>
      </View>
    );
  if (error)
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error.message}</Text>
      </View>
    );
  function handleComment() {
    comment({
      variables: {
        body: {
          content: commentInput,
          postId,
        },
      },
    });
  }

  return (
    <View style={styles.background}>
      <View style={styles.commentInputContainer}>
        <TextInput style={styles.commentInput} placeholder="Write a comment..." placeholderTextColor="#657786" value={commentInput} onChangeText={setCommentInput} />
        <TouchableOpacity style={styles.submitButton} onPress={handleComment}>
          <Text style={styles.submitButtonText}>Post</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "#15202B",
    padding: 16,
  },
  commentInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#192734",
    borderRadius: 12,
    padding: 10,
    marginBottom: 16,
  },
  commentInput: {
    flex: 1,
    backgroundColor: "#22303C",
    padding: 12,
    borderRadius: 8,
    color: "#E1E8ED",
    fontSize: 16,
    marginRight: 10,
  },
  submitButton: {
    backgroundColor: "#1DA1F2",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  submitButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 14,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#15202B",
  },
  loadingText: {
    color: "#E1E8ED",
    fontSize: 16,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#15202B",
    padding: 20,
  },
  errorText: {
    color: "#E0245E",
    fontSize: 16,
    textAlign: "center",
  },
});
