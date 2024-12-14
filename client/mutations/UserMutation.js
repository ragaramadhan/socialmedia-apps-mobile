import { gql } from "@apollo/client";

export const DO_LOGIN = gql`
  mutation Mutation($body: Login) {
    login(body: $body) {
      message
    }
  }
`;

export const DO_FOLLOW = gql`
  mutation Mutation($followingId: ID!) {
    follower(followingId: $followingId) {
      message
    }
  }
`;
