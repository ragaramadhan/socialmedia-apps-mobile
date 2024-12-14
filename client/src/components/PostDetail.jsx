import { useMutation, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { View, Text, Image, StyleSheet, ScrollView, FlatList, TouchableOpacity } from "react-native";
import { DETAIL_POST } from "../../queries/PostDetail";
import { TextInput } from "react-native";
import { Comment_User } from "../../queries/PostQuery";
import { useNavigation } from "@react-navigation/native";
import { Get_Post } from "../../queries/PostQuery";
export default function PostDetail({ route }) {
  const { postId } = route.params;
  const navigation = useNavigation();
  const { data, loading } = useQuery(DETAIL_POST, {
    variables: { postByIdId: postId },
    fetchPolicy: "network-only",
    nextFetchPolicy: "no-cache",
  });
  function handleComment() {
    navigation.navigate("Comment", { postId });
  }

  if (loading) {
    return (
      <View>
        <Text>Loading ...</Text>
      </View>
    );
  }

  const post = data.postById;
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{
            uri: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIALcAwwMBIgACEQEDEQH/xAAbAAABBQEBAAAAAAAAAAAAAAADAAIEBQYBB//EAEEQAAEDAgIECwYDBwQDAAAAAAIAAQMEEgUREyEiMgYxQUJRUmFigZGhFCNxscHRM3LhFSRDgpLw8Qc0U6Jzk8L/xAAaAQACAwEBAAAAAAAAAAAAAAAAAwECBAUG/8QAKhEAAgIBBAECBgIDAAAAAAAAAAECEQMEEiExQVFxEyIjMmGBBbEzQpH/2gAMAwEAAhEDEQA/ANnJREaaFBKHOJWjJ4rV2ZUVbUcia1FPfvK7YU60VFImimain56I1GSt2ZNkBDCiiKhkvuuTdGStZLQ31UYnVwRd709UqTReMSLWyxU4XXeX0VFV40O8Gzs5Fl2soeM4kVRcN2zd55cv6rLYjiVl21siOyL8934s+zj8kluzQol3iuPbEQ3XFGGVurifLP5Kp/aOIVAfjjGIl3c3+SqWgKoAam4iEh2ifrNxs/RrZn8W7chxyfvIjb58b6vj2qLLUbTBcWracx9+X5XHNn8ndbTDsV9oDb2fgvKKMRi/25EO1u8XgzP8eNabCa2eI7pSEoucXK3xz+asmUcT0AxkPaAkWghILtKV396lAw2uE7RuWggjE0yDsTONHGNNOoR/ZRQ3ok6mUBDULpzFZskjeximvRI5IIozSdZcKpLrKQWH95D/AGaPWRTAjSYhZzkEcTI9wlMkwoTTQwruopkMa1XLkkpjUA5JK4UxjMniyEMo9ZFEhSyQoOiZoTGKIJCiyRzOuHt7KIy4doAobJSKjE5fZwuCTp8FiMSmKo51sXbk2fRnnryV/wAIagqjc3fm3I3jrWVxZ9FDt73V1eqwzy3I2wx0iixeujpwu/ELiEe3obPi9VBwyCmq4ZyqB3tZDc7uza2u6Xyfo6VFrKeSom0p7MQ7pHqbLp/wmniI0lsdBtFzpLX18mXa33UqRO0lTS+yWxgN0RbuWVrt2OuSNBvae3+b11pC4ntSloyLeG5n7eJQqmQd0LfVWUiNtD5quMDEYiHZ1DkP6dOStMKqpD2dq75/Z1Swtt3BtEXO6Pr8le4TaAFfzSbj7Wf6spog02FFJEexu9Xk8OheiYHUDLDt73VXmlPU6L+llo8CqiAxKXZu5qvHhi5qzf7K4wqJTleFwqSJJ6Ygc4JaNdzJduVuQOWJrgnOlkgBlq7ansyWSLChiSfkkgDBhPJ1lKjq5FBB0cEqwLAKokeOqLq/9lABHBRbJpFgNcXVQ66tvh0fW1eHL9G8UEVDrDvqRjDmj6vr+rJWadQGYopyItXtn+X58iy2NvZtSjcWt7X4ss89f98q1VW4gBFzR1eSxuKze0XdXnF9G+65knTOljVmVrZJKua4xut7vybkQ44pQ2gj2vRvsrU4rAut2uYPKoskBWbfrrTVkL/CIRgIbRlGPwufwZs1GtvPYG0es/G/irGKgI9/15GSKAb7Q3RLIe1+V02MxUsYyii2N38o9L8TMrKk3y/M3oztmiUdLsbA7vO7elGCKyp/kz9cldzF7CfhzXzaU+bmw/f6eC0NIW2Q9XWP1+jqiw/Y/l1+L/36q1GUYjIu832/v4K8ZcCZRNjgtVsWmr8RWFwmqsm293U3m33WqpqwtDafNzbyd2T4SETVFnkkoTVqc1aKbaKEpLJR2qxTmqhRaAPauOyY1QPWXdMKA4O2pLt4pKbCjzwFIjUcFIjS2QSY0cFGAlIB1BIcVChbS185dUm+Q/ZS89hRsFAj9pkP/ldvLUkZuaQ/DxbKjhIZXjSRFbcLyGfUBnzd/jxM3a79DqgeAbB92VvMj5X6P7da7E6HSzFIe1dls6stWeWfTlm7+LquOlHeuK7rcqwTjyb8ckkUYUIhdPVWiXO6oN0N2dvKohUxVZ3W2xc3Z1v2ur6ejE9qW4rd3PibwbUhvCJh3UUNUjPyxj+HTjpOtZlrfoz5G7fJcp8NkM7pdnuh8s1ePHGGyCeFoJij6lJS9BlPSiAW2qv0N9TP/KA+X6srdy2FXRDZUyifOO8fhazfNvkpYv1C0kO2I95zLw5PN28nQ66eyYh7zKwp49uUu63q7/p5KmxG728R6xfJtf1V5cIWuWXmDSFLs98W83ZluGZY/grDfWD3Sv8AJ9XrktmtOLqzJlfIzJJPSyTRdjEk/JcyUBY1K4usu5LjsgBaQusupuSSkngy7CSNHcnAjAyCp2JSQTY2FFG1QSObvJ1IEdJR7XOIj83d/lkuWptaeihtAdkRyEWHobJknLxyOxcqiurcRjv24yt6yrzrqaU9grfis5jmM4z7ZFTUWH6MZDs0tTmw58mfQsnV8K6+KYhlpoSITICGNyZ2dndnZ3dllUJy5RtuEOJHo88l+zdcmlsBaqXAK79oRDJaUZEzbBcbZtm3o6tJ7gVOU6YxU+gTgRmjOyilNZtKP7cXOIR+JMytfoRRY5Ee4nNTCdpW7qhDUVcW5aQ+GfgrKhrBl2ZdkleDTFTTXQeGOzZ7uXkqOub9/IurqHxyz+S04wqqxPDtu7rFmrzjwKhLkuuCkdkJSc4h9M2WgzVJwbjkCEbxtGz5v+j+iulpx/ajLk+4dmlmmpK5QdclcmriAHZpZpqSCTuaS5mkgDNUlTHUbhKYIquERp9mlHyU2meSy6VRYJEoWJFFrFEHSX91SxdABRmRjcQBBhcTRSt56TlH4V2UmKQjUAQyxjIPYX31OsfV8FqSWYi/Z5FcTuV55Z58eeXH4re1Bj3VUVdcNOs+7b5NsY2qoi4PgsVJcWitIizLad9eWXG79DKRX0oqZQHOdslQIiJDmI3a8uTNuRBrnG/YJCknyyNrsoK2l2FkMWwGpqIdIAwTT3HeTlzXyyZmdtTtl6ut28w3+9EreK7kRiw6KXaHZLrNqdMU0nwUcL4keWYdgmLRaXRe0wkIswCxta755vnk7tl2dq2OB1Nb+HikFso6rm4nWiDDrN4rviDfNSooxDfEUSak+QS2qlyEopN1RuEB7cQgVo23mXZn+jqaMYhuLPV1VJV49XRhtRU8LR29/LN/V8vBUyzqJbBi3T9jTcGMQ9tCWOK4hjy2n48+T0V6q3g7hn7Mw0YP4pbZ/F+TwVpktGDdsW7syalweWWzoYmnciuyGV3NTRA1nJOzXRXckANSXckslJA1JOSQSZm2TmD/ANkaENLzkmrYL7VJjmi5iiiLHxU5BzlLjj66rp6+wNgbvggti08oWhAVyhuiy5LX2QQO67nZoFTPYo9O1ae1Kh12/as2durNWnq6IlTUqpy0tTt7qlVLKlP2uorBjotm3flfWwN8OV+xZFyzoeOC1nw4tN7TFVyDs5W3avFuJV1QWJczRl3nJ/l+qnnhlTZt4kP/AKmb6qJLSYgAe6q4JNndMHbN/iz6m4+R1f4a8EqfHLTARSYpLDLBVaMhLVc2rJle4bIWhtPmrOlXVNJ/uqYu8URXs3hx+is8OrNLDpR3SUuKiLbcmXjSojWn+ZU3tG2pVPNerRmVnj4LEG2CLqjmh4HhQ+2FV6MRiImkLIdZyPrd38c3QMTqxp6MRMrSkNrcuhsnf5srvC6+k9mgH3kekC8dKOV+fKz8SdGCk+fBzcmtx43LHuplhmusyY8ndRAWkWcdkwisRXBCkhv5yCaIU2IxxJ0VfEfOXTwyM0B8LED2VAEtqgTXXm7qAMBRIUVTKcxR6AvzcimwoktOXVXV3IuqkggyEFHPEataYhDZNdZiNOjpRMxI0MhJBmt6qcEghuD5LhiQbiZopDPdUFiUVVuiFyhVcU8v8Pa+aJUTezw/w9L28ngszimM1d5W3W+qRlnFKmc/N/JLFPbjVtf8OVc5X6PdId4X1O3Y7I9JNHThaO8SpTx+/wB1XxDUCOob82Nm6GJtfhxLo12HntU9TJ/4p+T4E2p/hksG5LpnUwfyUMqW7hlzJdUAXvbR7ONQjbRbkkhfnyds0AJ+oXkWaFMxfmTFbOjDJGiXFIMobQo1M8YXDbb8FXwiViNlZtGVo9Z+LzTGnJFN0YslG437Ck0W+qZ8Tw8N+rjLuxld8uJArsY0sJQU46OIt4n3jbo7G7EUo9mbU6/HjjV2/Qbj+JlW1n7uXuo8giy5+T638Xzy7GZek01N7PhVNAYiRQxCxC4s7Z5ZOvPuB+FlieKjIY+4p8jMul+Nm89fwZ16aLX3Ctuki6cn5OJiTm5Tl5G0pRWe692Q83k8lIaQjDqlzh/vkVezFFMpcElh2nulul9HT5Rs1QWx8dCEZ79stlSCTmIV1xSTQRHuv3kURLrImiSaMkUTYx2Tcu6j2CnMIoII+SSkZJKQMyBKRGggwo8aCLDiyDWVWi2R3vklPN7PDdzuIfisnW46IVksAfw9RF0vyrPnzKCrycv+Q1Uo/Sxdvt+iLGoDS3EY3F28f6LNYo8sR7fvIub0t/fkmYzwknpLY6f4kSgUuMy4hcNRtW81+Xx5Fz3O0cjFgyRW59Aaq0+98/NVlRHzv/plcx4fPiFZBTUtxFIWQ8jtyu7v2Nm/gvQ6bD8Pp5ipKWCMSEBA53iFzNmzzciybN34+j0V8eFz56OtpcEsitdHi5zyxHskQkPQTs/mk2NYoG5Vl4iJers69fxDCMLlhGA6SCQYwsErGZ8m6HbLLwVBVcA8IqNqnknht1ELGxMz9GTtnytyrTDC10dD4OTEr/o87lxrFj2TrpP5Mh9WZnUQnklO6okKQutITk/m69DD/TiC/bxCT8rRN91Po+AOExfilUzfnNmb0Zn9U34ORlHKTPPKFtsdm7oy5ehmW2wLgtW4gYyVQlSwat8dt27Gfi+L+q2GHYRh+H/7KkjhLrMOZZfF9fqrVmV4aVXcuRDw27ZzD6KDD6YaaljtiHxd35Xd+V0UH99cCK22H5UwG21s6Q9Kg0wX7Q7yCDX7P9PxTjksO5InE/eB/MoZZDGmEKzRS7OkFnAvjnqfxZ1NFu8qPHj0R00l1twl/Uzs7fXzV1RmNRTRSdYfXlSG/maE6fM/izxS8cr2CMSQyddde1cyFQbRzSCnM6FkKc1qAH5pJlySkDOZooB3lFjNEqJxp6aWf/jF3+yHwrYuUlFW/BFr6i+a0N2PV48qw2JxaKaWQd67MlprisHrFrL6qmxEdgrv5fD/ACuNlm5StnmFlc8rm/JR1P7wG0qw3kojGaPk4/hysrGogQ4KYqibRmVo2u5l0C3G6rHhm+DSX4PQOA8EJYceIiNxzmwAXKwZM+rozd9fwVrQxyHitdV70BCzAWtmcs3zyzbW2psnb6LnB6moqLg/h9PSjbBohktcnfWW07u78et37EarrhDZDdW+NQjR6HTYVHHFIjVG3d9ECljkiulqLSlInccuRnyZm9G8kw6sd3/OabHUX7/9L/R02MjROLLWCeM9kyES5qO4qiZhCpln0hERCzDnxA3Y3qrOiqdKFp7y0Y5+DHmx/wCyJgsiC6ExpzEnGYkxHzV0W20BnRxe9SAjQAkIEUnUYiQ0BUcOikHg3JUxDcVMYyWt0Psv4a2fwT+AVfIeFx01SV0mtx8Xzy8nU+tgGuoKmkP+NEQeLtq9clicKlkCmGeIiGUTY7ezidvVvJYs/wAs1IwarI8OSOSP7/P4PVFxlV4Vif7QphLnDqMe1WLErp2dXHkjkipR6Y500Luelck7qxY7mkh8etdUAZiAdEFu93nUDhPUEGG6Pd0hM3gpsNVt2lEX9KzvCmp01fTQDzZRb1Z3+folamdY/cxayW3HXqHxCrjpA2y2uaKpsSqb9FIRbJZ7LeqZiJlXYx7MBc7Ii6GbjfyUThBVw3RQ0+7E3muU1bOLixU16gpZxsIuqo2FYkNVUzwbpSREw9ObZP8AJnVZU1feWh4OYTHTQFitV+NKDsAcjC/K/a7ejpsYpJuRtlGOPG3L9e5pOCuK6XChpj/Fpvcl8G4n8slNnqFiZpJKSs09KW1zugx6HVpBi8dQHVLnC/Grp2d/Q6qOSCXktZJ1xqjqEoAzd5LSWJsWbmW8M/X5yLRTDTzERyERET258nQzdioiqb7rSVtweovbphnlL3Ee733bkz6PstGO5OkJybYq2aldY04mQyXQo5NhhNEjksUUCsRCdQiSbmJqLO1hpjGSJdpQtNSQCA7Fk6yeiosSqaSX3dpu4lyWlkTeWeXgtTIBAsXw+pxM6au3SIHjPwfNvm/ks2qj8l+hk1eJZIc+CfhHCGmocSigu91NqIvutwNbGvBHMjO4S3V67wTrRxDBIJJfxR2D7cuVZME7+VltF9P6frz+zRNKK7eKgsA37yLb3lqOkSLhXVHyHrJIAzlLWDUObxDqEss35VkMYcoeEI37QjK8vhln9Eklm1X2r3MWuS2FPU1rYbSlKzfvNQN13VD7usrLXySzZA+b+SSSThiqbKaXHHa5eS7wTCpBj/aVcIHAOWjB9eZO/G7dDa3y6VosQrdsoh3fvxemSSSVke58mPNJ5Mi3fkoZ6jbtL/CA8/XG5cSVUPglQQa0x3JCH1+aLHWzGJNpwEWyzcwd+Pi4lxJOh2aMefJHqRJotNU1EQuZOBDcbam6fTVll8l6DQ18cIRiIWiIszZdjJJLo6boZHJLJ9zLmKrjPkdGZ4z5EklsKjDiLmooEPOSSUEhGZOdkklYDmdixH+qM0cWH0gC23JK75djNr+bLiSTqf8AEyk+jz2AlvOCNd7NRiFxWkeT5duSSS5EeJcGLLJxcZLuzYxU0oncVSRD1XUoUklvOyhXJJJKCx//2Q==",
          }}
          style={styles.profileImage}
        />
        <Text style={styles.author}>@{post.User.username}</Text>
      </View>

      <Text style={styles.content}>{post.content}</Text>

      {post.imgUrl && <Image source={{ uri: post.imgUrl }} style={styles.image} />}

      {post.tags && post.tags.length > 0 && (
        <View style={styles.tagsContainer}>
          <FlatList data={post.tags} horizontal renderItem={({ item }) => <Text style={styles.tag}>#{item}</Text>} keyExtractor={(item, index) => index.toString()} />
        </View>
      )}

      {/* Likes */}
      <View style={styles.likesContainer}>
        <Text style={styles.likesTitle}>Likes</Text>
        {post.likes.length > 0 ? (
          post.likes.map((like, index) => (
            <Text key={index} style={styles.like}>
              👍 {like.username}
            </Text>
          ))
        ) : (
          <Text style={styles.noLikes}>No likes yet</Text>
        )}
        {post.likes.length > 0 && (
          <View style={styles.commentCard}>
            <Text style={styles.TOTALLIKE}> TOTAL LIKES THIS POST :{post.likes.length}</Text>
          </View>
        )}
        {/* <Text style={styles.TOTALLIKE}> TOTAL LIKES THIS POST :{post.likes.length}</Text> */}
      </View>

      {/* Comments */}
      <View style={styles.commentsContainer}>
        <Text style={styles.commentsTitle}>Comments</Text>
        {post.comments.length > 0 ? (
          post.comments.map((comment, index) => (
            <View key={index} style={styles.commentCard}>
              <Text style={styles.commentUsername}>@{comment.username}</Text>
              <Text style={styles.commentContent}>{comment.content}</Text>
            </View>
          ))
        ) : (
          <Text style={styles.noComments}>No comments yet</Text>
        )}
      </View>

      {/* Comment Input */}
      <View style={styles.commentInputContainer}>
        <TouchableOpacity style={styles.submitButton} onPress={handleComment}>
          <Text style={styles.submitButtonText}>Comment</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#14171A",
    padding: 15,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  author: {
    fontWeight: "bold",
    fontSize: 18,
    color: "#1DA1F2",
  },
  content: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 15,
    color: "#E1E8ED",
  },
  image: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
    borderRadius: 10,
    marginBottom: 15,
  },
  tagsContainer: {
    flexDirection: "row",
    marginBottom: 15,
  },
  tag: {
    backgroundColor: "#657786",
    padding: 8,
    borderRadius: 20,
    marginRight: 8,
    fontSize: 14,
    color: "#E1E8ED",
  },
  likesContainer: {
    marginBottom: 15,
  },
  likesTitle: {
    fontWeight: "bold",
    marginBottom: 5,
    fontSize: 16,
    color: "#E1E8ED",
  },
  like: {
    fontSize: 14,
    marginVertical: 4,
    color: "#E1E8ED",
  },
  noLikes: {
    fontStyle: "italic",
    color: "#657786",
  },
  commentsContainer: {
    marginBottom: 15,
  },
  commentsTitle: {
    fontWeight: "bold",
    marginBottom: 5,
    fontSize: 16,
    color: "#E1E8ED",
  },
  commentCard: {
    backgroundColor: "#1C1F24",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  commentUsername: {
    fontWeight: "bold",
    color: "#1DA1F2",
    fontSize: 14,
  },
  commentContent: {
    fontSize: 14,
    color: "#E1E8ED",
    marginTop: 5,
  },
  noComments: {
    fontStyle: "italic",
    color: "#657786",
  },
  commentInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  commentInput: {
    flex: 1,
    backgroundColor: "#1C1F24",
    padding: 10,
    borderRadius: 8,
    color: "#E1E8ED",
    marginRight: 10,
  },
  submitButton: {
    backgroundColor: "#1DA1F2",
    padding: 10,
    borderRadius: 8,
  },
  submitButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  actionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  actionButton: {
    backgroundColor: "#1DA1F2",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
  },
  actionText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  TOTALLIKE: {
    color: "white",
  },
});
