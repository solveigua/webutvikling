import { ApolloClient } from "@apollo/client";
import { Dispatch } from "react";
import { GET_ALL_MOVIES, LAZY_LOADING } from "../util/queries";
import { SEARCH_MOVIE, FETCH_MOVIES, SORT_MOVIES, FETCH_MORE } from "./types";
import { dispatchType } from "./types";
import { Movie } from "../types";
import { InMemoryCache } from "@apollo/client";

// searchActions er litt misvisende navn siden den inneholder alle actions

// En funksjon for å dispatche en SEARCH_MOVIE action med text som payload
export const searchMovie = (text: string) => (
  dispatch: Dispatch<dispatchType>
) => {
  dispatch({
    type: SEARCH_MOVIE,
    payload: text,
  });
};

// En funksjon for å dispatche en SORT_MOVIES action med sort som payload
export const sortMovies = (sort: string) => (
  dispatch: Dispatch<dispatchType>
) => {
  dispatch({
    type: SORT_MOVIES,
    payload: sort,
  });
};
// Oppdatert funksjon for å dispatche en LAZY_LOADING-action med de filtrerte filmene som payload
// Henter data fra databasen, søker etter innhold i tittel
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
