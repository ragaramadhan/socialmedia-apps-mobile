import { GraphQLError } from "graphql";
import { compare, hash } from "../../utils/bcrypt.js";
import { db } from "../config/config.js";
import { signToken } from "../../utils/jwt.js";
import { ObjectId } from "mongodb";

class User {
  static async findAll() {
    const collection = db.collection("users");
    const users = await collection.find().toArray(); // jadikan aray supaya data dapat dibaca

    return users;
  }

  static async create(body) {
    const collection = db.collection("users");
    // console.log(body);
    if (body.password.length < 5) {
      throw new GraphQLError("MIN PASSWORD 5", {
        extensions: {
          http: "400",
          code: "email must be 5 length +",
        },
      });
    }
    body.password = hash(body.password);

    const user = await collection.findOne({ username: body.username });

    if (user) {
      throw new GraphQLError("Email Must Be Unique", {
        extensions: {
          http: "400",
          code: "DUPLICATE_DATA",
        },
      });
    }

    await collection.insertOne(body);

    return {
      message: "Success Created User",
    };
  }

  static async getUserByIdFollower(id) {
    const collection = db.collection("users");
    const user = await collection
      .aggregate([
        {
          $match: {
            _id: new ObjectId(id),
          },
        },
        {
          $lookup: {
            from: "follow",
            localField: "_id",
            foreignField: "followingId",
            as: "Follower",
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "Follower.followerId",
            foreignField: "_id",
            as: "UserDetails",
          },
        },
        {
          $addFields: {
            Followers: {
              $map: {
                input: "$Follower",
                as: "follower",
                in: {
                  username: {
                    $arrayElemAt: ["$UserDetails.username", { $indexOfArray: ["$UserDetails._id", "$$follower.followerId"] }],
                  },
                },
              },
            },
          },
        },
        {
          $unset: ["UserDetails", "Follower"],
        },
        {
          $lookup: {
            from: "follow",
            localField: "_id",
            foreignField: "followerId",
            as: "Following",
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "Following.followingId",
            foreignField: "_id",
            as: "UserFollowing",
          },
        },
        {
          $addFields: {
            Followings: {
              $map: {
                input: "$Following",
                as: "following",
                in: {
                  username: {
                    $arrayElemAt: [
                      "$UserFollowing.username",
                      {
                        $indexOfArray: ["$UserFollowing._id", "$$following.followerId"],
                      },
                    ],
                  },
                },
              },
            },
          },
        },
        {
          $unset: ["UserFollowing", "Following"],
        },
      ])
      .toArray();

    // console.log(user[0]);
    return user[0];
  }

  static async login(body) {
    const collection = db.collection("users");
    const { username, password } = body;
    const user = await collection.findOne({ username });
    // console.log(user);
    if (!user || !compare(password, user.password)) {
      throw new GraphQLError("Invalid username/password", {
        extensions: {
          http: "401",
          code: "Invalid_INPUT",
        },
      });
    }

    // console.log(`masuk sini`);
    const payload = {
      userId: user._id,
      username: user.username,
    };

    const token = signToken(payload);
    // console.log(token);

    return {
      message: token,
    };
  }

  static async getUserByName(username) {
    const collection = db.collection("users");
    const user = await collection.findOne({ username });
    if (!user) {
      throw new GraphQLError("User Not Found", {
        extensions: {
          http: "404",
          code: "NOT_FOUND",
        },
      });
    }

    return user;
  }

  static async search(username) {
    const collection = db.collection("users");
    if (!username) throw new GraphQLError("Input ur username ");
    const users = await collection.find({ username: { $regex: username, $options: "i" } }).toArray();

    return users;
  }

  static async userLogin(id) {
    const collection = db.collection("users");
    const user = await collection.findOne({ _id: id });

    return user;
  }
}

export default User;
