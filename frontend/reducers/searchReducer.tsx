/**
 * Exports all reducers
 * (searchReducer is not a completely appropriate name as it contains all the reducers)
 */
import {
  SEARCH_MOVIE,
  FETCH_MOVIES,
  SORT_MOVIES,
  FETCH_MORE,
} from "../actions/types";

//----- Interfaces to type the variables -----

export interface movieState {
  text: string;
  movies: {
    _id: string;
    title: string;
    seqNr: number;
    releaseYear: number;
    rating: number;
  }[];
  movie: {
    _id: string;
    title: string;
    seqNr: number;
    releaseYear: number;
    rating: number;
  } | null;
  sort: string | null;
}

//--------- Interfaces for Actions ----------

export interface ActionSearch {
  type: "SEARCH_MOVIE";
  payload: string;
}
export interface ActionFetch {
  type: "FETCH_MOVIES";
  payload: string;
}

export interface ActionSort {
  type: "SORT_MOVIES";
  payload: string;
}

export interface ActionMore {
  type: "FETCH_MORE";
  payload: string;
}

export type Action = ActionSearch | ActionFetch | ActionSort | ActionMore;

// An initialState for when starting app. We sort chronologically by default.
const initialState: movieState = {
  text: "",
  movies: [],
  movie: null,
  sort: "chronological",
};

/**
 * Main reducer function
 * @param state initial state
 * @param action action to execute
 */
export default function foo(state = initialState, action: Action) {
  switch (action.type) {
    case SEARCH_MOVIE:
      return {
        ...state,
        text: action.payload,
      };
    case FETCH_MOVIES:
      return {
        ...state,
        movies: action.payload,
      };
    case SORT_MOVIES:
      return {
        ...state,
        sort: action.payload,
      };
    case FETCH_MORE:
      return {
        ...state,
        movies: [...state.movies, ...action.payload],
      };
    default:
      return state;
  }
}
