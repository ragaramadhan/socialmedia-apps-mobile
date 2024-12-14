import { gql } from "@apollo/client";
export const PROFIL_LOGIN = gql`
  query Query {
    userLogin {
      _id
      email
      name
      password
      username
    }
  }
`;

export const PROFIL_DETAIL = gql`
  query Query($userId: ID!) {
    followerUser(userId: $userId) {
      Followers {
        username
      }
      Followings {
        username
      }
      _id
      name
      username
      email
      password
    }
  }
`;

export const REGISTER = gql`
  mutation Mutation($body: AddUser) {
    register(body: $body) {
      message
    }
  }
`;
