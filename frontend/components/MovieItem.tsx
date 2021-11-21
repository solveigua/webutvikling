/**
 * MovieItem defines a single instance of a movie
 * Exports a functional component with props corresponding to movie items in db
 * Handles rating mutation
 */
import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  TouchableWithoutFeedback,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import { coverMovies } from "../assets";
import { SET_RATING } from "../util/queries";

const MovieItem: React.FC<{
  key: string;
  _id: string;
  title: string;
  seqNr: number;
  releaseYear: number;
  rating: number;
}> = (props) => {
  //---- Statehandling and change --//
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [rating, setRating] = useState<number>(props.rating);

  const [rateMovie] = useMutation(SET_RATING); //To set a new rating when new rating is clicked

  /**
   * For setting a new rating
   * @param newRating a number containing the rating we want to give.
   * rateMovie fires the mutation SET_RATING, which sets the new rating for the correct item in db.
   */
  const handleChange = async (newRating: number | null) => {
    if (typeof newRating === "number") {
      setRating(newRating);
      try {
        await rateMovie({ variables: { id: props._id, rating: newRating } });
      } catch (e) {
        console.log(e);
        throw e;
      }
    }
  };

  //---------Rating bar-----------//
  // Images fetched from internet
  // Filled Star
  const starImageFilled =
    "https://raw.githubusercontent.com/AboutReact/sampleresource/master/star_filled.png";
  // Empty Star
  const starImageCorner =
    "https://raw.githubusercontent.com/AboutReact/sampleresource/master/star_corner.png";

  // max rating is 5 stars
  const maxRating = [1, 2, 3, 4, 5];

  const CustomRatingBar = () => {
    return (
      <View style={styles.customRatingBarStyle}>
        {maxRating.map((item, key) => {
          return (
            <TouchableOpacity
              activeOpacity={0.7}
              key={item}
              onPress={() => handleChange(item)}
            >
              <Image
                style={styles.starImageStyle}
                source={
                  item <= rating
                    ? { uri: starImageFilled }
                    : { uri: starImageCorner }
                }
              />
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  //--------- MovieItem ---------//

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <TouchableOpacity
          style={styles.centeredView}
          activeOpacity={1}
          onPressOut={() => {
            setModalVisible(false);
          }}
        >
          <ScrollView directionalLockEnabled={true}>
            <TouchableWithoutFeedback>
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <Image
                    style={styles.startImage}
                    source={coverMovies[props.seqNr]} //mapping the movie to seqNr
                  ></Image>

                  <Text style={styles.titleText}> {props.title} </Text>
                  <Text style={styles.releaseYearText}>
                    {" "}
                    {props.releaseYear}{" "}
                  </Text>
                  <View style={styles.star}>
                    <CustomRatingBar />
                    <Text style={styles.rating}>
                      {" "}
                      Your rating is: {rating}{" "}
                    </Text>
                  </View>
                  <Pressable
                    style={({ pressed }) => [
                      {
                        backgroundColor: pressed ? "white" : "#ED1D24",
                        color: pressed ? "black" : "white",
                      },
                      styles.buttonClose,
                    ]}
                    onPress={() => setModalVisible(!modalVisible)}
                  >
                    <Text style={styles.textStyle}>Close</Text>
                  </Pressable>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </ScrollView>
        </TouchableOpacity>
      </Modal>

      <View>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Image
            source={coverMovies[props.seqNr]} //mapping the movie to SeqNr
            style={styles.image}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

//---- styling -----//

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "rgba(0, 0, 0, 0.9)",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonClose: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  titleText: {
    marginTop: 10,
    marginBottom: 15,
    textAlign: "center",
    fontSize: 30,
    color: "white",
  },
  releaseYearText: {
    marginBottom: 15,
    textAlign: "center",
    marginTop: 0.25,
    color: "#ED1D24",
    fontWeight: "bold",
    fontSize: 20,
  },
  rating: {
    marginTop: 5,
    color: "white",
    textAlign: "center",
  },
  customRatingBarStyle: {
    justifyContent: "center",
    flexDirection: "row",
    marginTop: 5,
  },
  star: {
    marginBottom: 20,
  },
  starImageStyle: {
    width: 40,
    height: 40,
    resizeMode: "cover",
  },
  startImage: {
    width: 200,
    height: 300,
    borderRadius: 5,
  },
  image: {
    width: 200,
    height: 300,
    borderRadius: 5,
    resizeMode: "cover",
  },
});

export default MovieItem;
