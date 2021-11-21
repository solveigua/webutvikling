/**
 * Exports all resolvers
 */

import { Movie } from "./models/movie";
import { ObjectId } from "mongoose";

// ----- Typedefs for inputs in queries and mutation: -----

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

// Defines searchcondition in fetching
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

    /**
     * Does fetching in Lazy Load, with input arguments for pagination and conditions
     * for search and sort.
     * If sortCondition is year, we fetch and load according to year movie was released.
     * Else, we sort by sequence number.
     * Function takes in text and searches movies according to this directly in backend
     * with the regex syntax from mongoose.
     * @param _ Object
     * @param args type loadingInput (text, limit, start, sorting)
     */
    lazyLoading: async (_: Object, args: { input: loadingInput }) => {
      try {
        let searchCondition = {};

        const sortCondition: SearchCondition =
          args.input.sorting === "year"
            ? { releaseYear: 1, title: 1 }
            : { seqNr: 1, title: 1 };

        //If empty string = all movies, else:
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

        return movies;
      } catch (err) {
        throw err;
      }
    },
  },

  /**
   * Mutation: sets rating of ovie, updates this in database.
   */
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
