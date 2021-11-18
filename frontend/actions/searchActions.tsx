import { ApolloClient } from "@apollo/client";
import { Dispatch } from "react";
import { GET_ALL_MOVIES, LAZY_LOADING } from "../util/queries";
import { SEARCH_MOVIE, FETCH_MOVIES, SORT_MOVIES } from "./types";
import { dispatchType } from "./types";
import { Movie } from "../types";
import { InMemoryCache } from "@apollo/client";

// searchActions er litt misvisende navn siden den inneholder alle actions


// En funksjon for å dispatche en SEARCH_MOVIE action med text som payload
export const searchMovie = (text: string) => (dispatch: Dispatch<dispatchType>) => {
    dispatch({
        type: SEARCH_MOVIE,
        payload: text
    });
};

// En funksjon for å dispatche en SORT_MOVIES action med sort som payload
export const sortMovies = (sort: string) => (dispatch: Dispatch<dispatchType>) => {
    dispatch({
        type: SORT_MOVIES,
        payload: sort
    });
};

// En funksjon for å dispatche en FETCH_MOVIES action med de filtrerte filmene som payload
// Henter data fra databasen
export const fetchMovies = (text: string) => async (dispatch: Dispatch<dispatchType>) => {

    const client = new ApolloClient({
        uri: 'http://it2810-19.idi.ntnu.no:4000/graphql',
        cache: new InMemoryCache()
      })
    

    const res = await client.query({
        query: GET_ALL_MOVIES,
        variables: {},
      })

      const arr = res?.data.getAllMovies
        dispatch({
            type: FETCH_MOVIES,
            payload: arr.filter((movie:Movie) => 
            movie.title.toLowerCase().includes(text.toLowerCase()))
        });
        
}

export const fetchMoviesLazy = (text: string, start: number, limit:number) => async (dispatch: Dispatch<dispatchType>) => {

    const client = new ApolloClient({
        uri: 'http://it2810-19.idi.ntnu.no:4000/graphql',
        cache: new InMemoryCache()
      })
    

    const res = await client.query({
        query: LAZY_LOADING,
        variables: {},
      })

      const arr = res?.data.lazyLoading
        dispatch({
            type: FETCH_MOVIES,
            payload: arr.filter((movie:Movie) => 
            movie.title.toLowerCase().includes(text.toLowerCase()))
        });
        
}
