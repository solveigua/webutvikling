/**
 * Exports all queries
 * Connects frontend to backend
 * (some queries are not used in this project)
 */
import gql from "graphql-tag";

//----------- Queries: --------------

const GET_ALL_MOVIES = gql`
  query {
    getAllMovies {
      _id
      title
      seqNr
      releaseYear
      rating
    }
  }
`;

const GET_MOVIE = gql`
  query($id: ID!) {
    getMovie(input: { id: $id }) {
      title
      rating
      seqNr
      releaseYear
    }
  }
`;

const GET_ALL_CHARACTERS = gql`
  query {
    getAllCharacters {
      _id
      name
      actor
      appearencesInMovies
      movies
    }
  }
`;

const GET_CHARACTER = gql`
  query($id: ID!) {
    getCharacter(input: { id: $id }) {
      name
      actor
      movies
    }
  }
`;

const LAZY_LOADING = gql`
  query($text: String, $limit: Int, $start: Int, $sorting: String) {
    lazyLoading(
      input: { text: $text, limit: $limit, start: $start, sorting: $sorting }
    ) {
      title
      rating
      seqNr
      releaseYear
      _id
    }
  }
`;

//-------------- Mutation:--------------
const SET_RATING = gql`
  mutation($id: ID!, $rating: Int!) {
    setRating(input: { movieId: $id, rating: $rating }) {
      title
      rating
    }
  }
`;
export {
  GET_ALL_MOVIES,
  GET_MOVIE,
  GET_ALL_CHARACTERS,
  GET_CHARACTER,
  SET_RATING,
  LAZY_LOADING,
};
