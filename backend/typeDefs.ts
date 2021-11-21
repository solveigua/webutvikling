/**
 * GraphQL schema and typeDefs
 */
import { gql } from "apollo-server-express";

export interface movie {
  _id: string;
  title: string;
  seqNr: number;
  releaseYear: number;
  rating: number;
}

export interface movieList {
  movies: movie[];
}

const typeDefs = gql`
  type Movie {
    _id: ID!
    title: String
    seqNr: Int
    releaseYear: Int
    rating: Int
  }

  type Character {
    _id: ID!
    name: String
    actor: String
    appearencesInMovies: Int
    movies: [String]
  }
  type Query {
    hello: String

    getAllMovies: [Movie]
    getMovie(input: movieId): Movie

    getAllCharacters: [Character]
    getCharacter(input: characterId): Character

    lazyLoading(input: loadingInput): [Movie]
  }

  type Mutation {
    setRating(input: ratingInput): Movie
  }

  input movieId {
    id: ID
  }
  input characterId {
    id: ID
  }
  input ratingInput {
    movieId: ID!
    rating: Int
  }

  input loadingInput {
    text: String
    limit: Int
    start: Int
    sorting: String
  }
`;

export default typeDefs;
