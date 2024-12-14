import { gql } from "@apollo/client";

export const DETAIL_POST = gql`
  query Query($postByIdId: ID) {
    postById(id: $postByIdId) {
      _id
      content
      tags
      imgUrl
      authorId
      comments {
        username
        content
      }
      likes {
        username
      }
      createdAt
      updatedAt
      User {
        _id
        username
      }
    }
  }
`;
