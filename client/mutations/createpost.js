import { gql } from "@apollo/client";
export const DO_POST = gql`
  mutation AddPost($body: AddPost) {
    AddPost(body: $body) {
      message
    }
  }
`;
