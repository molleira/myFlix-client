// src/actions/actions.js
export const SET_MOVIES = 'SET_MOVIES';
export const SET_FILTER = 'SET_FILTER';
export const SET_USER = 'SET_USER';
export const SET_USERTOKEN = 'SET_USERTOKEN';
export const SET_FAVORITEMOVIES = 'SET_FAVORITEMOVIES';

// initializes the movies
export function setMovies(value) {
  return { type: SET_MOVIES, value };
}

// sets the filter
export function setFilter(value) {
  return { type: SET_FILTER, value };
}

// sets the user
export function setUser(value) {
  return { type: SET_USER, value };
}

// sets user's token
export function setUserToken(value) {
  return { type: SET_USERTOKEN, value };
}

// sets fav movies
export function setFavoriteMovies(value) {
  return { type: SET_FAVORITEMOVIES, value };
}