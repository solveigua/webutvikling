/**
 * Contains all actions for functionality related to database
 * (Slightly misguiding name as it contains all, not just SearchActions)
 */
import { ApolloClient } from "@apollo/client";
import { Dispatch } from "react";
import { LAZY_LOADING } from "../util/queries";
import { SEARCH_MOVIE, FETCH_MOVIES, SORT_MOVIES, FETCH_MORE } from "./types";
import { dispatchType } from "./types";
import { InMemoryCache } from "@apollo/client";

/**
 * Function for dispatching a SEARCH_MOVIE action with text as payload
 * @param text String of what is seached for
 */
export const searchMovie = (text: string) => (
  dispatch: Dispatch<dispatchType>
) => {
  dispatch({
    type: SEARCH_MOVIE,
    payload: text,
  });
};

/**
 *  Function for dispatching a SORT_MOVIES action with sort as payload
 * @param sort Specifies what we are sorting on. Either 'chronological' or 'year'
 */
export const sortMovies = (sort: string) => (
  dispatch: Dispatch<dispatchType>
) => {
  dispatch({
    type: SORT_MOVIES,
    payload: sort,
  });
};

/**
 * Function for dispatching a LAZY_LOADING-action with the filtered movies as payload
 * Fetches data from db with Lazy Loading technique for pagination
 * Sorting and searching is done in backend.
 * @param text string, what we are searching for
 * @param start the start (offset) for pagination
 * @param limit number of max movies to fetch from offset
 * @param sorting type of sorting we are doing
 * @param cleanMovies boolean to specify if movieslist should be cleaned
 */
export const fetchMoviesLazy = (
  text: string,
  start: number,
  limit: number,
  sorting: string,
  cleanMovies: boolean = false
) => async (dispatch: Dispatch<dispatchType>) => {
  const client = new ApolloClient({
    uri: "http://it2810-19.idi.ntnu.no:4002/graphql",
    cache: new InMemoryCache(),
  });

  const res = await client.query({
    query: LAZY_LOADING,
    variables: {
      text: text,
      start: start,
      limit: limit,
      sorting: sorting,
    },
  });

  const arr = res?.data.lazyLoading.filter((it: any) => it !== null);

  dispatch({
    type: cleanMovies ? FETCH_MOVIES : FETCH_MORE,
    payload: arr,
  });
};
