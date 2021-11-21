/**
 * Exports a MovieSummay component, containing all MovieItems in a scrollable list
 * Handles fetching of data from backend
 */
import React, { useEffect } from "react";
import { FlatList } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchMoviesLazy } from "../actions/searchActions";
import MovieItem from "./MovieItem";

/**
 * Defines type to render in renderItem in Flatlist
 * @param movie the movie we are mapping from renderItem.
 */
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

// State for current movies fetched for redux
const MovieSummary = () => {
  const movieState: [] = useSelector((state: any) => state.movies.movies);

  const searchText: string = useSelector((state: any) => state.movies.text);

  const sorting: string = useSelector((state: any) => state.movies.sort);

  const dispatch = useDispatch();

  // Initial fetch. Gets first 3 movies from db, with sorting from
  // inital state and cleanmovies = true
  useEffect(() => {
    dispatch(fetchMoviesLazy(searchText, 0, 3, sorting, true));
  }, [searchText, sorting]);

  /**
   * Called every time Flatlist reaches the end.
   * Updates the offset for pagination with the movieStates length, so 3 new
   * movies are fetched. Stops when all movies are fetched.
   */
  const renderNew = () => {
    movieState.length > 23
      ? console.log("done fetching")
      : dispatch(fetchMoviesLazy(searchText, movieState.length, 3, sorting));
  };

  // Rendering of MovieSummary, using Flatlist from RN for å list
  // with dynamic loading and infinite scroll.
  return (
    <FlatList
      style={{ flex: 1 }}
      data={movieState}
      onEndReached={renderNew}
      onEndReachedThreshold={0.5}
      keyExtractor={(_, index) => "key" + index}
      renderItem={(item) => <MovieItemTmp movie={item.item} />}
    />
  );
};

export default MovieSummary;
