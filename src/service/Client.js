import { ApolloClient, InMemoryCache } from "@apollo/client";

/**
 * Initializes the connection between the frontend
 * and the server
 * 
 * @param {string} uri The URI of the server
 */

const client = new ApolloClient({
  // uri: "http://localhost:4000/",
  uri: "https://apollo-express-server.vercel.app/",
  cache: new InMemoryCache(),
});

export default client;
