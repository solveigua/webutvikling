import { Component } from "react";
import { connect } from "react-redux";
import MovieItem from './MovieItem';
import {Movie} from '../types';

interface IMoviesContainerProps {
    movies: Movie[];
    sorting: string
}

// MoviesContainer is used in Movies
export class MoviesContainer extends Component<IMoviesContainerProps> {
    
   

    render() {
        const { movies } = this.props;
        const { sorting } = this.props; 
        let content: Movie[] = [];

        // movies are sorted before it is mapped to content
        sorting === 'year' ? movies.sort(function(a, b) {
            return a.releaseYear - b.releaseYear;
        }) : movies.sort(function(a, b) {
            return a.seqNr - b.seqNr;
        });


        content = movies?.length >-1 ? movies.map((movie: Movie) =>
        // A MovieItem is created for every movie in movies, this is displayed on the web page
            <MovieItem
                key={movie._id}
                _id={movie._id}
                title={movie.title}
                seqNr={movie.seqNr}
                releaseYear={movie.releaseYear}
                rating={movie.rating}
            />) : null as any
    

        return (
            <div>
                <section>
                <div className="movie-deck">{content}</div>
                </section>
            </div>
        )
    }
}

const mapStateToProps = (state: any /* typeof searchReducer gives error :(*/ ) => ({
    movies: state.movies.movies,
    sorting: state.movies.sort
})

export default connect(mapStateToProps)(MoviesContainer)


