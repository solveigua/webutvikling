import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";
import React from "react";
import { StyleSheet, SafeAreaView, Image, View } from "react-native";
import { Provider } from "react-redux";
import Header from "./components/Header";
import MovieItem from "./components/MovieItem";
import MovieSummary from "./components/MovieSummary";
import Sortbar from "./components/Sortbar";
import store from "./store";

export default function App() {
  const link = createHttpLink({
    uri: "http://it2810-19.idi.ntnu.no:4002/graphql",
    credentials: "same-origin",
  });

  const client = new ApolloClient({
    link,
    cache: new InMemoryCache(),
  });
  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <SafeAreaView style={styles.container}>
          <Header />
          <Image
            source={require("./assets/marvel_pictures/marvel.png")}
            style={styles.image}
          ></Image>
          <Sortbar />
          <MovieSummary />
        </SafeAreaView>
      </Provider>
    </ApolloProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ED1D24",
    alignItems: "center",
    height: "100%",
  },
  image: {
    width: "100%",
    height: 190,
    zIndex: 0,
    overflow: "hidden",
    transform: [{ rotate: "-5deg" }],
    position: "absolute",
  },
});
