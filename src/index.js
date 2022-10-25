import React from "react";
import ReactDOM from "react-dom/client";
// import "./index.css";
import App from "./App";
import { ApolloProvider } from "@apollo/client";
import { Provider } from "react-redux";
import client from "./service/Client";
import store from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import persistStore from "redux-persist/es/persistStore";
import { Global } from "./components/styles/Global";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistStore(store)}>
          <Global />
          <App />
        </PersistGate>
      </Provider>
    </ApolloProvider>
  </React.StrictMode>
);
