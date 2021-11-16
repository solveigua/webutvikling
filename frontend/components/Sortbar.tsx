import React from "react";
import { StyleSheet, Text, View, Button, Alert } from "react-native";

export default function Sortbar() {
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
          onPress={() =>
            Alert.alert("Release Year", "Sorting movies based on release year")
          }
        ></Button>
        <Button
          color="#fff"
          title="Chronological Order"
          onPress={() =>
            Alert.alert(
              "Chronological Order",
              "Sorting movies based on chronological order"
            )
          }
        ></Button>
      </View>
      <Text style={styles.paragraphTextBold}> Movie options: </Text>
      <View style={styles.buttonsView}>
        <Button
          color="#fff"
          title="Search for movie"
          onPress={() =>
            Alert.prompt(
              "Search Movie",
              "Search for movies containing this text in their title"
            )
          }
        ></Button>
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
});
