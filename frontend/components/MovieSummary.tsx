import React, { Component, useEffect, useState } from "react";
import { FlatList, View, Text } from "react-native";
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
  const movieState = useSelector((state: any) => state.movies.movies);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMoviesLazy("", 0, 8));
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        style={{ flex: 1 }}
        data={movieState}
        onEndReached={({ distanceFromEnd: number }) => {
          dispatch(fetchMoviesLazy("", movieState.length, 8));
        }}
        onEndReachedThreshold={0.5}
        renderItem={(item) => <MovieItemTmp movie={item.item} />}
      />
    </View>
  );
};

export default MovieSummary;
