import React, {useState} from "react";
import {
  Alert, 
  Modal, 
  StyleSheet, 
  Text, 
  Pressable, 
  View, 
  SafeAreaView,
  TouchableWithoutFeedback,
  ScrollView,
  Image,
  TouchableOpacity,} from 'react-native';
import { coverMovies } from "../assets";

const MovieItem: React.FC<{key:string, _id:string, title:string, seqNr:number, releaseYear:number, rating: number}> = (props)=> {

  //---- statehandling --//
  const [rating, setRating] = useState<number>(props.rating); //default rating, taken from
  const [hover, setHover] = useState<Number | null | undefined>(null);
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  /*const [rateMovie] = useMutation(SET_RATING) //To set a new rating when new rating is clicked

  //For setting a new rating
  const handleChange = async (newRating: number | null) => {
      if (typeof newRating === 'number') {
          localStorage.setItem(JSON.stringify(props._id), newRating.toString());
          setRating(newRating)
          console.log(props);
          await rateMovie({ variables: { id: props._id, rating: newRating } })
      }
  }*/

  //finds correct picture to Movie
  const found = coverMovies.find(element => element.seqNr === props.seqNr);

  const [defaultRating, setDefaultRating] = useState(2);
  // To set the max number of Stars
  const [maxRating, setMaxRating] = useState([1, 2, 3, 4, 5]);

  // Filled Star. You can also give the path from local
  const starImageFilled =
    'https://raw.githubusercontent.com/AboutReact/sampleresource/master/star_filled.png';
  // Empty Star. You can also give the path from local
  const starImageCorner =
    'https://raw.githubusercontent.com/AboutReact/sampleresource/master/star_corner.png';

  const CustomRatingBar = () => {
    return (
      <View style={styles.customRatingBarStyle}>
        {maxRating.map((item, key) => {
          return (
            <TouchableOpacity
              activeOpacity={0.7}
              key={item}
              onPress={() => setDefaultRating(item)}>

              <Image
                style={styles.starImageStyle}
                source={
                  item <= defaultRating
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
            onPressOut={() => {setModalVisible(false)}}
          >
            <ScrollView 
              directionalLockEnabled={true} 
            >
        <TouchableWithoutFeedback>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
         
            <Image
              style={styles.startImage}
              source={require('../assets/marvel_pictures/Cap_first.jpg')} //{require(found!picture)}
            >
            </Image>

            <Text style={styles.titleText} /*{props.title}*/> Captain America: The first avenger </Text> 
            <Text style={styles.releaseYearText}/*{props.releaseYear}*/> 2010 </Text>
            <View style={styles.star}>
            <CustomRatingBar />
            <Text style={styles.rating}> Your rating is: {defaultRating} </Text>
            </View>
            <Pressable
              style={ styles.buttonClose}
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
          source={require('../assets/marvel_pictures/Cap_first.jpg')}
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
      marginTop: 22
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
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5
    },
    buttonClose: {
      borderRadius: 20,
      padding: 10,
      elevation: 2,
      backgroundColor: '#ED1D24',
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center"
    },
    titleText: {
      marginTop: 10, 
      marginBottom: 15,
      textAlign: "center",
      fontSize: 30,
      color: 'white', 
    },
    releaseYearText: {
      marginBottom: 15,
      textAlign: "center",
      marginTop: 0.25,
      color: '#ED1D24',
      fontWeight: 'bold',
      fontSize: 20,
    },
    rating:{
      marginTop: 5, 
      color: 'white', 
      textAlign: 'center', 
    },
    customRatingBarStyle: {
      justifyContent: 'center',
      flexDirection: 'row',
      marginTop: 5, 
    },
    star:{
      marginBottom:20,
    },
    starImageStyle: {
      width: 40,
      height: 40,
      resizeMode: 'cover',
    },
    startImage:{
      width: 200,
      height: 300,
      borderRadius: 5,
    },
    image:{
      width: 200,
      height: 300,
      borderRadius: 5,
      resizeMode: 'cover',
    }
  });

  export default MovieItem;