import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {onError} from '@apollo/client/link/error';

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  useMutation,
  gql,
  HttpLink,
  createHttpLink
} from '@apollo/client';

const link = createHttpLink({
  uri: "http://it2810-19.idi.ntnu.no:4000/graphql",
  credentials: "same-origin",
});

/*const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.array.forEach(( {message:string, locations, path }) =>
     {console.log(
       `[GraphQL error]: Message: ${onmessage}, Location: ${Location}, Path: ${path}`
     )
    });
  }
  if (networkError){
    console.log(`[Network error]: ${networkError}`);
  }
});*/

const client = new ApolloClient({
  link,
  cache: new InMemoryCache()
})


ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
    <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
