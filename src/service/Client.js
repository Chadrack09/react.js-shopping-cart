import { ApolloClient, InMemoryCache } from "@apollo/client";

/**
 * Initializing the connection between the frontend
 * and the server
 */

const client = new ApolloClient({
  uri: "http://localhost:4000/",
  cache: new InMemoryCache(),
});

export default client;
