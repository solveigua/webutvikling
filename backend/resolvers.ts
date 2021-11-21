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
  text: string;
  limit: number;
  start: number;
  sorting: string;
};

type SearchCondition = { seqNr: 1; title: 1 } | { releaseYear: 1; title: 1 };

export const resolvers = {
  Query: {
    hello: () => {
      return "hello world";
    },
    getAllMovies: async () => {
      const movies = await Movie.find();
      return movies;
    },
    getMovie: async (_: Object, args: { input: movieId }) => {
      try {
        const movie = await Movie.findById(args.input.id);
        return movie;
      } catch (err) {
        throw err;
      }
    },

    lazyLoading: async (_: Object, args: { input: loadingInput }) => {
      try {
        let searchCondition = {};

        const sortCondition: SearchCondition =
          args.input.sorting === "year"
            ? { releaseYear: 1, title: 1 }
            : { seqNr: 1, title: 1 };

        //Hvis det ikke er en tom string:
        if (args.input.text !== "") {
          searchCondition = {
            ...searchCondition,
            title: { $regex: new RegExp(args.input.text, "i") },
          };
        }
        const movies: any[] = await Movie.find(searchCondition)
          .sort(sortCondition)
          .skip(args.input.start)
          .limit(args.input.limit);

        console.log(movies);

        return movies;
      } catch (err) {
        throw err;
      }
    },
  },

  Mutation: {
    setRating: async (_: Object, args: { input: ratingInput }) => {
      try {
        const movie = await Movie.findById(args.input.movieId);
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
