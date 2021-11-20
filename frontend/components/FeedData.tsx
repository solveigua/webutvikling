import { useQuery } from "@apollo/client";
import React, { Component, useState } from "react";
import { LAZY_LOADING } from "../util/queries";
import { Movie } from "../types";
import MovieItem from "../components/MovieItem";
import { FlatList, View } from "react-native";

const MovieItemTmp = ({ movie }: any) => {
  return (
    <MovieItem
      key={movie._id}
      _id={movie._id}
      title={movie.title}
      seqNr={movie.seqNr}
      releaseYear={movie.releaseYear}
      rating={movie.rating}
    />
  );
};

function FeedList(data: any) {
  return (
    <View>
      <FlatList
        style={{ flex: 1 }}
        data={data}
        onEndReached={() => {
          // The fetchMore method is used to load new data and add it
          // to the original query we used to populate the list
          data.fetchMore({
            variables: { offset: data.feed.length + 1 },
            updateQuery: (
              previousResult: { feed: string | any[] },
              { fetchMoreResult }: any
            ) => {
              // Don't do anything if there weren't any new items
              if (!fetchMoreResult || fetchMoreResult.feed.length === 0) {
                return previousResult;
              }
              return {
                // Concatenate the new feed results after the old ones
                feed: previousResult.feed.concat(fetchMoreResult.feed),
              };
            },
          });
        }}
        onEndReachedThreshold={0.5}
        keyExtractor={(item, index) => "key" + index}
        renderItem={(item) => <MovieItemTmp movie={item.item} />}
      />
    </View>
  );
}

export default FeedList;
