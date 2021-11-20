"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
var apollo_server_express_1 = require("apollo-server-express");
var typeDefs = (0, apollo_server_express_1.gql)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  type Movie {\n    _id: ID!\n    title: String\n    seqNr: Int\n    releaseYear: Int\n    rating: Int\n  }\n\n  type Character {\n    _id: ID!\n    name: String\n    actor: String\n    appearencesInMovies: Int\n    movies: [String]\n  }\n  type Query {\n    hello: String\n\n    getAllMovies: [Movie]\n    getMovie(input: movieId): Movie\n\n    getAllCharacters: [Character]\n    getCharacter(input: characterId): Character\n\n    lazyLoading(input: loadingInput): [Movie]\n  }\n\n  type Mutation {\n    setRating(input: ratingInput): Movie\n  }\n\n  input movieId {\n    id: ID\n  }\n  input characterId {\n    id: ID\n  }\n  input ratingInput {\n    movieId: ID!\n    rating: Int\n  }\n\n  input loadingInput {\n    text: String\n    limit: Int\n    start: Int\n    sorting: String\n  }\n"], ["\n  type Movie {\n    _id: ID!\n    title: String\n    seqNr: Int\n    releaseYear: Int\n    rating: Int\n  }\n\n  type Character {\n    _id: ID!\n    name: String\n    actor: String\n    appearencesInMovies: Int\n    movies: [String]\n  }\n  type Query {\n    hello: String\n\n    getAllMovies: [Movie]\n    getMovie(input: movieId): Movie\n\n    getAllCharacters: [Character]\n    getCharacter(input: characterId): Character\n\n    lazyLoading(input: loadingInput): [Movie]\n  }\n\n  type Mutation {\n    setRating(input: ratingInput): Movie\n  }\n\n  input movieId {\n    id: ID\n  }\n  input characterId {\n    id: ID\n  }\n  input ratingInput {\n    movieId: ID!\n    rating: Int\n  }\n\n  input loadingInput {\n    text: String\n    limit: Int\n    start: Int\n    sorting: String\n  }\n"])));
exports.default = typeDefs;
var templateObject_1;
