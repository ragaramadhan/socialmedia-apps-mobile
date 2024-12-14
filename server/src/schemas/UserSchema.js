import User from "../models/User.js";

export const typeDefs = `#graphql
    type User {
        _id: ID
        name: String
        username: String!
        email:String!
        password:String!
    }

    type GeneralResponse{
        message:String
    }

    type followers {
      username:String
    }
    type following{
      username:String
    }
    type UserFollower {
        _id: ID
        name: String
        username: String!
        email:String!
        password:String!
        Followers:[followers]!
        Followings:[following]!
    }
    
    input AddUser{
        name:String
        username:String!
        email:String!
        password:String!
    }

    input Login {
      username:String!
      password:String!
    }

    type Query {
        users: [User]
        search(username:String!):[User]
        followerUser(userId:ID!):UserFollower
        userLogin:User
    }


    type Mutation {
        register(body:AddUser): GeneralResponse
        login(body:Login) :GeneralResponse
    }



`;

export const resolvers = {
  Query: {
    users: async (_, args, contextValue) => {
      await contextValue.doAuth();
      const users = await User.findAll();
      return users;
    },
    userLogin: async (_, args, contextValue) => {
      const { id: authorId } = await contextValue.doAuth();
      const users = await User.userLogin(authorId);
      return users;
    },
    search: async (_, args, contextValue) => {
      await contextValue.doAuth();
      const { username } = args;
      const users = await User.search(username);
      return users;
    },
    followerUser: async (_, args, contextValue) => {
      // console.log(args);
      await contextValue.doAuth();
      const { userId } = args;
      // console.log(id);

      const users = await User.getUserByIdFollower(userId);

      return users;
    },
  },
  Mutation: {
    register: async (_, args) => {
      const { body } = args;
      const response = await User.create(body);

      return response;
    },
    login: async (_, args) => {
      const { body } = args;
      const response = await User.login(body);

      return response;
    },
  },
};
