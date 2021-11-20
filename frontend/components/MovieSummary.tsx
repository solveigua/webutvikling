import React, { Component, useEffect, useState } from "react";
import { FlatList, View, Text, SafeAreaView } from "react-native";
import { connect, useDispatch, useSelector } from "react-redux";
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

  const dispatch = useDispatch();

  useEffect(() => {
    console.log("useEffect changed");
    console.log(value);
    dispatch(fetchMoviesLazy("", 0, 3));
  }, []);

  const [value, setValue] = useState(3);

  const renderNew = () => {
    value > 23 ? console.log("done") : dispatch(fetchMoviesLazy("", value, 3));
    setValue(value + movieState.length);

    console.log(movieState);
    console.log(movieState.length);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        style={{ flex: 1 }}
        data={movieState}
        onEndReached={renderNew}
        onEndReachedThreshold={0.1}
        keyExtractor={(item, index) => "key" + index}
        renderItem={(item) => <MovieItemTmp movie={item.item} />}
      />
    </SafeAreaView>
  );
};

export default MovieSummary;
