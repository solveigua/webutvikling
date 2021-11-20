import React, { useEffect, useState } from "react";
import { FlatList } from "react-native";
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

  const searchText: string = useSelector<any, any>(
    (state: any) => state.movies.text
  );

  const sorting: string = useSelector<any, any>(
    (state: any) => state.movies.sort
  );

  const dispatch = useDispatch();

  useEffect(() => {
    console.log("useEffect changed");
    dispatch(fetchMoviesLazy(searchText, 0, 3, true));
  }, [searchText]);

  const renderNew = (event: any) => {
    movieState.length > 23
      ? console.log("done")
      : dispatch(fetchMoviesLazy(searchText, movieState.length, 3));
  };

  return (
    <FlatList
      style={{ flex: 1 }}
      data={movieState}
      onEndReached={renderNew}
      onEndReachedThreshold={0.5}
      keyExtractor={(item, index) => "key" + index}
      renderItem={(item) => <MovieItemTmp movie={item.item} />}
    />
  );
};

export default MovieSummary;
