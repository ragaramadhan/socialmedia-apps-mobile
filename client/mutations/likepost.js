import { gql } from "@apollo/client";
export const DO_LIKE = gql`
  mutation Mutation($postId: ID!) {
    AddLike(postId: $postId) {
      message
    }
  }
`;
