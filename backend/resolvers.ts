/**
 * Exports all resolvers
 */

import { Movie } from "./models/movie";
import { Character } from "./models/character";
import { ObjectId } from "mongoose";

type movieId = {
  id: ObjectId;
};

type ratingInput = {
  movieId: ObjectId;
  rating: Number;
};

type loadingInput = {
  text: String;
  limit: number;
  start: number;
};

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
    getMovie: async (_: Object, args: { input: movieId }) => {
      console.log(args.input.id);
      try {
        const movie = await Movie.findById(args.input.id);
        return movie;
      } catch (err) {
        throw err;
      }
    },

    lazyLoading: async (_: Object, args: { input: loadingInput }) => {
      try {
        const allMovies: any[] = await Movie.find();
        //Find only movies we are searching for:
        const theseMovies: any[] = allMovies.filter((movie) =>
          movie.title.toLowerCase().includes(args.input.text.toLowerCase())
        );
        const start = false;
        const endResult = [];

        for (let i = args.input.start; i <= theseMovies.length; i++) {
          if (i <= args.input.limit + args.input.start - 1) {
            endResult.push(theseMovies[i]);
          }
          if (args.input.limit && endResult.length === args.input.limit) {
            break;
          }
        }
        return endResult;
      } catch (err) {
        throw err;
      }
    },
  },

  Mutation: {
    setRating: async (_: Object, args: { input: ratingInput }) => {
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
