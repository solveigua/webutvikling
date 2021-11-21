/**
 * Model for movie
 */
import mongoose from "mongoose";

export const MovieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    seqNr: {
      type: Number,
    },
    releaseYear: {
      type: Number,
    },
    rating: {
      type: Number,
    },
  },
  { collection: "Movie" }
);

export const Movie = mongoose.model("movie", MovieSchema);
