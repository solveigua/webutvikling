import { useQuery } from "@apollo/client";
import { Component, useState } from "react";
import { LAZY_LOADING } from "../util/queries";
import { Movie } from "../types";
import MovieItem from "../components/MovieItem";
import { FlatList } from "react-native";

const [currentPage, setCurrentPage] = useState<number>(0);
const [movies, setMovies] = useState<Movie[]>();

class LazyLoadData extends Component {
  limit = 2;
  fetchResult = () => {
    const { data } = useQuery(LAZY_LOADING, {
      variables: { limit: this.limit, start: currentPage },
    });
    setCurrentPage(currentPage+2)
    setMovies(
      data.map((movie: Movie) => (
        <MovieItem
          key={movie._id}
          _id={movie._id}
          title={movie.title}
          seqNr={movie.seqNr}
          releaseYear={movie.releaseYear}
          rating={movie.rating}
        />
      ))
    );
  };

  renderItem = (movie : Movie ) => (
    <MovieItem
    key={movie._id}
    _id={movie._id}
    title={movie.title}
    seqNr={movie.seqNr}
    releaseYear={movie.releaseYear}
    rating={movie.rating}
  />
  );

  render = () => {
    //if (loading) return 'Loading...';

    return (
      <FlatList
        style={{ flex: 1 }}
        extraData={this.state}
        onEndReached={this.fetchResult}
        onEndReachedThreshold={0.7}
        data={movies} //movie content
        renderItem={this.renderItem}
        //keyExtractor={item => item.id.toString()}
      />
    );
  };
}
