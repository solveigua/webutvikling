import React, { useEffect, useState } from "react";
import { FlatList, SafeAreaView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchMoviesLazy } from "../actions/searchActions";
import MovieItem from "./MovieItem";

const MovieItemTmp = ({ movie }: any) => {
  return (
    <MovieItem
      key={movie._id}
      _id={movie._id}
      title={movie.title}
      seqNr={movie.seqNr}
      releaseYear={movie.releaseYear}
      rating={movie.rating}
    />
  );
};

const MovieSummary = () => {
  const movieState: [] = useSelector<any, any>(
    (state: any) => state.movies.movies
  );

  const sorting: string = useSelector<any, any>(
    (state: any) => state.movies.sort
  );
  const [scrollPosition, setScrollPosition] = useState(0);

  const dispatch = useDispatch();

  useEffect(() => {
    console.log("useEffect changed");
    dispatch(fetchMoviesLazy("", 0, 3));
  }, []);

  /*
  sorting === "year"
    ? movieState.sort(function (a: any, b: any) {
        return a.releaseYear - b.releaseYear;
      })
    : movieState.sort(function (a: any, b: any) {
        return a.seqNr - b.seqNr;
      });
      */

  const [value, setValue] = useState(3);

  const renderNew = (event: any) => {
    value > 23 ? console.log("done") : dispatch(fetchMoviesLazy("", value, 3));
    setValue(value + movieState.length);

    // let yOffset=event.nativeEvent.contentOffset.y / 600;
    // setScrollPosition(yOffset)

    console.log(movieState);
    console.log(movieState.length);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        style={{ flex: 1 }}
        data={movieState}
        onEndReached={renderNew}
        onEndReachedThreshold={0}
        // onScroll={(e) => renderNew(e)}
        // initialScrollIndex={scrollPosition}
        keyExtractor={(item, index) => "key" + index}
        renderItem={(item) => <MovieItemTmp movie={item.item} />}
      />
    </SafeAreaView>
  );
};

export default MovieSummary;
