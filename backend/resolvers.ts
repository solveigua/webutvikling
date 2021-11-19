/**
 * Exports all resolvers
 */

import { Movie } from "./models/movie";
import { Character } from "./models/character";
import mongoose, { ObjectId } from "mongoose";

type movieId = {
  id: ObjectId;
};

type ratingInput = {
  movieId: ObjectId;
  rating: Number;
};

type loadingInput = {
  limit: Number;
  start: Number;
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
