import User from "../src/models/User.js";
import { verifyToken } from "./jwt.js";
import { GraphQLError } from "graphql";

const authentication = async (req) => {
  // console.log(req.headers);

  const headerAuthor = req.headers.authorization;

  if (!headerAuthor) {
    throw new GraphQLError("You are not aunthenticated", {
      extensions: {
        http: "401",
        code: "UNAUTH",
      },
    });
  }

  const token = headerAuthor.split(" ")[1];

  // verify token here  .
  const payload = verifyToken(token);

  // find username  di database mongoDB
  const user = await User.getUserByName(payload.username);

  return {
    id: user._id,
    username: user.username,
  };
};

export { authentication };
