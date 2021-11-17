/**
 * Exports all resolvers
 */

import { Movie } from "./models/movie";
import { Character } from "./models/character";
import mongoose from "mongoose";

//TODO: remove unused interfaces

/*interface IMovie {
    id: String;
    title: String;
    seqNr: number;
    releaseYear: number;
    rating: number;

}

interface Character {
    id: String
    name: String
    actor: String
    appearencesInMovies: number
    movies: [String]
}

interface ratingInput {
    id: String,
    rating: number
}*/

export const resolvers = {
  Query: {
    hello: () => {
      return "hello world";
    },
    getAllMovies: async () => {
      const movies = await Movie.find();
      console.log(movies);
      return movies;
    },

    getAllCharacters: async () => {
      const characters = await Character.find();
      return characters;
    },
    getMovie: async (_: any, args: any) => {
      console.log(args.input.id);
      try {
        const movie = await Movie.findById(args.input.id);
        return movie;
      } catch (err) {
        throw err;
      }
    },

    getCharacter: async (_: any, args: any) => {
      console.log(args.input.id);
      try {
        const character = await Character.findById(args.input.id);
        return character;
      } catch (err) {
        throw err;
      }
    },

    lazyLoading: async (_: any, args: any) => {
      try {
        const allMovies = await Movie.find();
        const start = false;
        const endResult = [];

        for (let i = args.input.start; i <= allMovies.length; i++) {
          if (i <= args.input.limit) {
            endResult.push(allMovies[i]);
          }
          if (args.input.limit && endResult.length === args.input.limit) {
            break;
          }
          return endResult;
        }
      } catch (err) {
        throw err;
      }
    },
  },

  Mutation: {
    setRating: async (_: any, args: any) => {
      console.log(args.input);
      try {
        const movie = await Movie.findById(args.input.movieId);
        console.log(JSON.parse(JSON.stringify(movie)));
        if (movie) {
          await Movie.updateOne(movie, { $set: { rating: args.input.rating } });
          return movie;
        } else {
          throw new Error("Movie does not exist in database. ");
        }
      } catch (err) {
        throw err;
      }
    },
  },
};
