import { ApolloClient, InMemoryCache } from "@apollo/client";

/**
 * Initializes the connection between the frontend
 * and the server
 * 
 * @param {string} uri The URI of the server
 * @param {InMemoryCache} cache The cache to use
 */

const client = new ApolloClient({
  uri: "http://localhost:4000/",
  cache: new InMemoryCache(),
});

export default client;
