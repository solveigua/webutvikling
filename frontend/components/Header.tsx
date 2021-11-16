import React from "react";
import { Text, View, Image, StyleSheet } from "react-native";

export default function Header() {
  return (
    <View style={styles.header}>
      <Text style={styles.text}>Marvel Movies</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 190,
    zIndex: 0,
    overflow: "hidden",
    transform: [{ rotate: "-5deg" }],
  },
  header: {
    backgroundColor: "#ED1D24",
    width: "100%",
    height: "10%",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontWeight: "bold",
    color: "#fff",
    fontSize: 30,
  },
  container: {
    flex: 1,
    backgroundColor: "#ED1D24",
    alignItems: "center",
  },
});
