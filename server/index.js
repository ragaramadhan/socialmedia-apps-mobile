import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs as UserTypeDefs, resolvers as UserResolvers } from "./src/schemas/UserSchema.js";
import { typeDefs as PostTypeDefs, resolvers as PostResolvers } from "./src/schemas/PostSchema.js";
import { typeDefs as FollowTypeDefs, resolvers as FollowResolvers } from "./src/schemas/FollowSchema.js";
import { verifyToken } from "./utils/jwt.js";
import { authentication } from "./utils/auth.js";
// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
  typeDefs: [UserTypeDefs, PostTypeDefs, FollowTypeDefs],
  resolvers: [UserResolvers, PostResolvers, FollowResolvers],
  introspection: true, // Menambahkan introspection
});

// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests
const { url } = await startStandaloneServer(server, {
  listen: { port: process.env.PORT || 4000 },
  context: async ({ req, res }) => {
    return {
      doAuth: async () => await authentication(req),
    };
  },
});

console.log(`🚀  Server ready at: ${url}`);
