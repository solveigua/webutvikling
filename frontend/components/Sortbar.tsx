import React, { useState } from "react";
import { StyleSheet, Text, View, Button, Alert, TextInput } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { searchMovie, sortMovies } from "../actions/searchActions";

export default function Sortbar() {
  const [search, setSearch] = useState("");
  const [isPressed, setIsPressed] = useState("chronological");

  const dispatch = useDispatch();

  const updateSearch = (search: string) => {
    setSearch(search);
    dispatch(searchMovie(search));
  };

  const allMovies: any = useSelector<any, any>((state) => state.movies.movies);

  const releaseYearPress = () => {
    dispatch(sortMovies("year"));
    setIsPressed("year");
  };

  const chronologicalPress = () => {
    dispatch(sortMovies("chronological"));
    setIsPressed("chronological");
  };

  //Brukes ikke til noe spess, bare logges
  const searchText: string = useSelector<any, any>(
    (state) => state.movies.text
  );

  const submitPress = () => {
    // Trenger vi noe her?
    //setSearch(" ");
  };

  const allMoviesPress = () => {
    // Gjør noe med allMovies her
    updateSearch("");
  };

  return (
    <View style={styles.sortbar}>
      <Text style={styles.paragraphTextBold}>Sort movies based on: </Text>
      <View style={styles.sortButtonsView}>
        <View
          style={
            isPressed === "year"
              ? styles.sortButtonsPressed
              : styles.sortButtonsNotPressed
          }
        >
          <Button
            color="#fff"
            title="Release Year"
            onPress={releaseYearPress}
          ></Button>
        </View>
        <View
          style={
            isPressed === "chronological"
              ? styles.sortButtonsPressed
              : styles.sortButtonsNotPressed
          }
        >
          <Button
            color="#fff"
            title="Chronological Order"
            onPress={chronologicalPress}
          ></Button>
        </View>
      </View>
      <Text style={styles.paragraphTextBold}> Search for a movie: </Text>
      <View style={styles.searchView}>
        <TextInput
          style={styles.input}
          onChangeText={updateSearch}
          value={search}
          placeholder="Search for a MCU Movie"
          placeholderTextColor="rgba(255, 255, 255, 0.5)"
          onSubmitEditing={submitPress}
        />
        <Button
          color="#fff"
          title="Reset movies"
          onPress={allMoviesPress}
        ></Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  sortbar: {
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    textAlign: "center",
    width: "90%",
    position: "relative",
    color: "white",
    borderRadius: 14,
    alignItems: "center",
    height: 250,
  },
  paragraphText: {
    color: "#fff",
    fontSize: 12,
    textAlign: "center",
    paddingBottom: 10,
  },
  paragraphTextBold: {
    fontWeight: "bold",
    color: "#fff",
    fontSize: 17,
    textAlign: "center",
    paddingBottom: 10,
    paddingTop: 10,
  },
  paragraphTextBoldPad: {
    fontWeight: "bold",
    color: "#fff",
    fontSize: 12,
    textAlign: "center",
    paddingBottom: 10,
    paddingTop: "2%",
  },
  titleText: {
    color: "#fff",
    fontSize: 20,
    paddingBottom: 10,
    paddingTop: 10,
  },
  sortButtonsView: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  sortButtonsPressed: {
    backgroundColor: "rgba(237,29,36, 0.6)",
    borderRadius: 20,
  },
  sortButtonsNotPressed: {
    backgroundColor: "transparent",
  },
  buttonsView: {
    backgroundColor: "transparent",
    paddingBottom: "5%",
    flex: 1,
    flexDirection: "row",
  },
  input: {
    borderColor: "gray",
    width: 180,
    height: 50,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    color: "#fff",
  },
  searchView: {
    backgroundColor: "transparent",
    paddingBottom: "5%",
    flex: 1,
    flexDirection: "column",
  },
});
