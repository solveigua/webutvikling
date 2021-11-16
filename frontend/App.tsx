import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import MovieItem from './components/MovieItem';

export default function App() {
  return (
    <ScrollView 
    directionalLockEnabled={true} 
  >
      <MovieItem/>
      <MovieItem/>
      <MovieItem/>
      </ScrollView>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
