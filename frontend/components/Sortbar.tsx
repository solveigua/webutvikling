import React, { useState } from "react";
import { StyleSheet, Text, View, Button, Alert, TextInput } from "react-native";
import { useDispatch } from "react-redux";
import { searchMovie } from "../actions/searchActions";

export default function Sortbar() {
  const [search, setSearch] = useState("");

  const updateSearch = (search: string) => {
    setSearch(search);
  };

  const dispatch = useDispatch();

  const releaseYearPress = () => {
    Alert.alert("Release Year", "Sorting movies based on release year");
  };

  const chronologicalPress = () => {
    Alert.alert(
      "Chronological Order",
      "Sorting movies based on chronological order"
    );
  };

  const submitPress = () => {
    dispatch(searchMovie(search));
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
      <Text style={styles.paragraphTextBold}> Movie options: </Text>
      <View style={styles.buttonsView}>
        <TextInput
          style={styles.input}
          onChangeText={updateSearch}
          value={search}
          placeholder="Search for a Marvel Movie"
          onSubmitEditing={submitPress}
        />
        <Button
          color="#fff"
          title="Show all movies"
          onPress={() => Alert.alert("Show all movies", "Showing all movies")}
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
    //maxWidth: "45rem",
    width: "90%",
    //marginTop: "-10rem",
    position: "relative",
    color: "white",
    borderRadius: 14,
    //padding: "1rem",
    alignItems: "center",
    //justifyContent: "center",
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
});
