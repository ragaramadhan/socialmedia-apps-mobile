import { gql } from "@apollo/client";
export const Get_Post = gql`
  query Posts {
    posts {
      _id
      content
      tags
      imgUrl
      authorId
      comments {
        content
        username
        createdAt
        updatedAt
      }
      likes {
        username
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
      User {
        _id
        name
        username
        email
        password
      }
    }
  }
`;

export const Search_User = gql`
  query Posts($username: String!) {
    search(username: $username) {
      _id
      name
      username
      email
      password
    }
  }
`;

export const Comment_User = gql`
  mutation Mutation($body: AddComment) {
    AddComment(body: $body) {
      message
    }
  }
`;
