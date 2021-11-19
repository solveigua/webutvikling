import { GET_ALL_MOVIES } from "./queries";
import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";


import {Movie} from '../types'

const AllMovies = () => {
    const [movies, setMovies] = useState([])
    const { loading: movieLoading, error: movieError, data: movieData, refetch: movieRefetch } = useQuery(GET_ALL_MOVIES);

    useEffect(() => {
        setMovies(movieData?.getAllMovies)
        console.log(movieData?.getAllMovies)
    }, [movieData])

    return(
        <div>
            {movies?.map((movie:Movie) => <p>{movie.title}</p>)}
        </div>
    )
}

export default AllMovies;
