import redis from "../config/redis.js";
import Post from "../models/Post.js";

export const typeDefs = `#graphql
    type Post {
        _id:ID
        content:String
        tags:[String]
        imgUrl:String
        authorId:ID
        comments:[Comment]
        likes:[Like]
        createdAt:String
        updatedAt:String
    }
   
    type  PostWithUser {
      _id:ID
        content:String
        tags:[String]
        imgUrl:String
        authorId:ID
        comments:[Comment]
        likes:[Like]
        createdAt:String
        updatedAt:String
        User:User
    }

    

    input AddPost{
        content:String!
        tags:[String]
        imgUrl:String
    }

    input AddComment {
        postId:ID!
        content:String!
    }

 

    type Comment {
        content:String!
        username:String!
        createdAt:String
        updatedAt:String
    }
    
    type Like {
        username:String!
        createdAt:String
        updatedAt:String
    }


    type GeneralResponse{
        message:String
    }

    type Query {
        posts:[PostWithUser]
        postById(id:ID):PostWithUser
    }


    type Mutation {
        AddPost(body:AddPost): GeneralResponse
        AddComment(body:AddComment):GeneralResponse
        AddLike(postId:ID!):GeneralResponse
    }
`;

export const resolvers = {
  Query: {
    posts: async (_, args, contextValue) => {
      await contextValue.doAuth();
      const postsChace = await redis.get("posts");

      if (postsChace) {
        return JSON.parse(postsChace);
      }
      const posts = await Post.readAll();
      //   console.log(posts);
      await redis.set("posts", JSON.stringify(posts));
      return posts;
    },
    postById: async (_, args, contextValue) => {
      await contextValue.doAuth();
      const { id } = args;

      const post = await Post.postById(id);

      return post;
    },
  },

  Mutation: {
    AddPost: async (_, args, contextValue) => {
      await contextValue.doAuth();
      // console.log(isi);

      const { id: authorId } = await contextValue.doAuth();
      const { body } = args;
      const { content, tags, imgUrl } = body;
      //   console.log(body);

      if (!content || !authorId) {
        return { message: `Content or authorId is required` }; // validasi ulang !
      }

      const PostBody = {
        content,
        tags,
        imgUrl,
        authorId,
        comments: [],
        likes: [],
        createdAt: new Date().toISOString(), //mengubah menjadi standar iso 8601 Y-M-D
        updatedAt: new Date().toISOString(),
      };

      const response = await Post.AddPost(PostBody);
      await redis.del("posts");
      return response;
    },
    AddComment: async (_, args, contextValue) => {
      const { username } = await contextValue.doAuth();
      const { body } = args;

      const response = await Post.commentPost(body, username);

      return response;
    },
    AddLike: async (_, args, contextValue) => {
      const { username } = await contextValue.doAuth();
      const { postId } = args;

      const response = await Post.likePost(postId, username);

      return response;
    },
  },
};
