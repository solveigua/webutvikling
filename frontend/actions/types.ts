/**
 * Exports types defined for actions
 */

export const SEARCH_MOVIE = "SEARCH_MOVIE";
export const FETCH_MOVIES = "FETCH_MOVIES";
export const SORT_MOVIES = "SORT_MOVIES";
export const FETCH_MORE = "FETCH_MORE";

export interface dispatchType {
  type: string;
  payload:
    | {
        _id: string;
        title: string;
        seqNr: number;
        releaseYear: number;
        rating: number;
        __typename: string;
      }[]
    | string;
}

export interface stateType {
  text: string;
  movies: [
    {
      _id: string;
      title: string;
      seqNr: number;
      releaseYear: number;
      rating: number;
      __typename: string;
    }
  ];
  movie: {
    _id: string;
    title: string;
    seqNr: number;
    releaseYear: number;
    rating: number;
    __typename: string;
  };
  sort: string;
}
