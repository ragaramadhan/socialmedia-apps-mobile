import { ObjectId } from "mongodb";
import { db } from "../config/config.js";

class Post {
  static async readAll() {
    const collection = db.collection("posts");
    // console.log(`masuk sini`);

    const posts = await collection
      .aggregate([
        {
          $lookup: {
            from: "users",
            localField: "authorId",
            foreignField: "_id",
            as: "User",
          },
        },
        {
          $unwind: {
            path: "$User",
            preserveNullAndEmptyArrays: true,
          },
        },
      ])
      .toArray();

    // console.log(posts);

    return posts;
  }

  static async AddPost(body) {
    const collection = db.collection("posts");
    await collection.insertOne(body);
    // console.log(body);

    return {
      message: `Success Add New Post`,
    };
  }

  static async commentPost(body, username) {
    const collection = db.collection("posts");
    const { postId, content } = body;
    // console.log(postId);

    const post = await collection.findOne({ _id: new ObjectId(postId) });

    // console.log(post);
    if (!post) {
      return `Post Not Found!`;
    }

    const postTemplate = {
      content,
      username,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    post.comments.push(postTemplate);

    await collection.updateOne({ _id: new ObjectId(postId) }, { $set: { comments: post.comments } }); // pertama filter , bagian ke 2 apa yang ingin di update(action)
    return {
      message: `Success Add Comment!`,
    };
  }

  static async likePost(postId, username) {
    const collection = db.collection("posts");

    const post = await collection.findOne({ _id: new ObjectId(postId) });

    if (!post) {
      return `Post Not Found!`;
    }

    const like = {
      username,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    post.likes.push(like);

    await collection.updateOne({ _id: new ObjectId(postId) }, { $set: { likes: post.likes } });

    return {
      message: `Success Add Like `,
    };
  }

  static async postById(id) {
    const collection = db.collection("posts");

    const post = await collection
      .aggregate([
        {
          $match: {
            _id: new ObjectId(id),
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "authorId",
            foreignField: "_id",
            as: "User",
          },
        },
        {
          $unset: ["User.email", "User.password", "User._id", "User.name"],
        },
        {
          $unwind: {
            path: "$User",
          },
        },
      ])
      .toArray();
    // console.log(post[0]);

    return post[0];
  }
}

export default Post;
