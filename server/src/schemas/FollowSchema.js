import Follow from "../models/Follow.js";

export const typeDefs = `#graphql
    type Follow {
        _id:ID
        followingId:ID
        followerId:ID
        createdAt:String
        updatedAt:String
    }

    type GeneralResponse {
        message:String!
    }
    # type Query {
    
    # }


    type Mutation {
        follower(followingId:ID!): GeneralResponse 
    } 




`;

export const resolvers = {
  //   Query: {},
  Mutation: {
    follower: async (_, args, contextValue) => {
      const { id } = await contextValue.doAuth();
      const { followingId } = args;
      const response = await Follow.followUser(followingId, id);

      return response;
    },
  },
};
