import React, { useState } from "react";
import { StyleSheet, Text, View, Button, Alert, TextInput } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { searchMovie, sortMovies } from "../actions/searchActions";

export default function Sortbar() {
  const [search, setSearch] = useState("");

  const dispatch = useDispatch();

  const updateSearch = (search: string) => {
    setSearch(search);
    dispatch(searchMovie(search));
  };

  const allMovies: any = useSelector<any, any>((state) => state.movies.movies);

  const releaseYearPress = () => {
    dispatch(sortMovies("year"));
    Alert.alert("Release Year", "Sorting movies based on release year");
  };

  const chronologicalPress = () => {
    dispatch(sortMovies("chronological"));
    Alert.alert(
      "Chronological Order",
      "Sorting movies based on chronological order"
    );
  };

  //Brukes ikke til noe spess, bare logges
  const searchText: string = useSelector<any, any>(
    (state) => state.movies.text
  );

  const submitPress = () => {
    // Trenger vi noe her?
    console.log(searchText);
    setSearch("");
  };

  const allMoviesPress = () => {
    // Gjør noe med allMovies her
    Alert.alert("Show all movies", "Showing all movies");
    updateSearch("");
  };

  return (
    <View style={styles.sortbar}>
      <Text style={styles.titleText}>Marvel Cinematic Universe</Text>
      <Text style={styles.paragraphText}>
        Search for your favourite Marvel Cinematic Universe movies and give them
        a rating!
      </Text>
      <Text style={styles.paragraphTextBold}>Sort movies based on: </Text>
      <View style={styles.sortButtonsView}>
        <Button
          color="#fff"
          title="Release Year"
          onPress={releaseYearPress}
        ></Button>
        <Button
          color="#fff"
          title="Chronological Order"
          onPress={chronologicalPress}
        ></Button>
      </View>
      <Text style={styles.paragraphTextBold}> Search for a movie: </Text>
      <View style={styles.searchView}>
        <TextInput
          style={styles.input}
          onChangeText={updateSearch}
          value={search}
          placeholder="Search for a Marvel Movie"
          onSubmitEditing={submitPress}
        />
        <Text style={styles.paragraphTextBoldPad}>or..</Text>
        <Button
          color="#fff"
          title="Show all movies"
          onPress={allMoviesPress}
        ></Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  sortbar: {
    height: "40%",
    backgroundColor: "#000000",
    textAlign: "center",
    width: "90%",
    position: "relative",
    color: "white",
    borderRadius: 14,
    alignItems: "center",
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
    fontSize: 12,
    textAlign: "center",
    paddingBottom: 10,
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
    backgroundColor: "transparent",
    flex: 1,
    flexDirection: "row",
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
    paddingBottom: "20%",
    flex: 1,
    flexDirection: "column",
  },
});
