import React from "react";
import { StyleSheet, SafeAreaView, Image, View } from "react-native";
import { Provider } from "react-redux";
import Header from "./components/Header";
import MovieItem from "./components/MovieItem";
import MovieSummary from "./components/MovieSummary";
import Sortbar from "./components/Sortbar";
import store from "./store";

export default function App() {
  return (
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ED1D24",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: 190,
    zIndex: 0,
    overflow: "hidden",
    transform: [{ rotate: "-5deg" }],
  },
});
