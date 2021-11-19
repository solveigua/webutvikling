import { Component } from "react";
import {FlatList} from 'react-native';
import { fetchMoviesLazy } from "../actions/searchActions";
import {LAZY_LOADING} from '../util/queries';
import { connect } from "react-redux"

interface IAllMoviesProps {
    fetchMoviesLazy: any; /*TYPE? (text: string) => (dispatch: Dispatch<dispatchType>) => Promise<void> gir feil*/
    }
    
interface IMoviesState {
    moviesList: { _id: number, title: string, seqNr: number, releaseYear: number, rating: number, __typename: string }[],
    start: number,
    limit: number;
    }

class LazyLoader extends Component {
    state: IMoviesState = { moviesList: [], start: 0, limit: 2 };
    componentDidMount() {
        this.fetchResult();
    }


    //poenget her er å hente ved hjelp av LazyLoading og ikke vanlig fetch movies
      fetchResult = () => {
          const text:string = " ";
          const { start, limit, moviesList } = this.state;
          fetchMoviesLazy(text, start, limit).then(res => {
          if (!res.moviesList) return;
          this.setState({
              list: moviesList.concat(res.list),
              start: start + 2,
              limit: limit
          });
          });
      };
      render = () => {

        //vi vil fremstille content (filmene) som en FlatList, slik at man kan dynamisk scrolle
          return (
          <FlatList
              style={{ flex: 1 }}
              extraData={this.state}
              onEndReached={this.fetchResult}
              onEndReachedThreshold={0.7}
              data={this.state.list} //movie content
              renderItem={rowData => {}}
              //keyExtractor={item => item.id.toString()}
          />
          );
      };
  }

const mapStateToProps = (state: any) => ({
    text: state.movies.text
})

export default connect (mapStateToProps, {fetchMoviesLazy})(LazyLoader);