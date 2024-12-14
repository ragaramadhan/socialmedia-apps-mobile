import { ObjectId } from "mongodb";
import { db } from "../config/config.js";

class Follow {
  static async followUser(followingId, followerId) {
    const collection = db.collection("follow");

    await collection.insertOne({ followingId: new ObjectId(followingId), followerId: new ObjectId(followerId), createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() });

    return {
      message: `Success Follow User with user id ${followingId}`,
    };
  }
}

export default Follow;
