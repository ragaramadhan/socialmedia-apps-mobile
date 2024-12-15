// import { ApolloClient, InMemoryCache, ApolloProvider, gql } from "@apollo/client";

// export const client = new ApolloClient({
//   uri: "https://40plrft8-4000.asse.devtunnels.ms/",
//   cache: new InMemoryCache(),
// });

import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import * as SecureStore from "expo-secure-store";
const httpLink = createHttpLink({
  uri: "https://social-media.ragaram.site",
});

const authLink = setContext(async (_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = await SecureStore.getItemAsync("token");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
