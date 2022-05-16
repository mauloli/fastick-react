import axios from "../../utils/axios";

export const getMovie = (page, limit, sort) => {
  if (sort !== undefined) {
    return {
      type: "GET_DATA_MOVIE",
      payload: axios.get(`movie?page=${page}&limit=${limit}&sortMovie=${sort} ASC`)
    };
  } else {
    return {
      type: "GET_DATA_MOVIE",
      payload: axios.get(`movie?page=${page}&limit=${limit}`)
    };
  }
};
export const getMovieName = (name) => {
  return {
    type: "GET_DATA_MOVIE",
    payload: axios.get(`movie?searchName=${name}`)
  };
};
export const getMovieId = (id) => {
  return {
    type: "GET_DATA_MOVIE",
    payload: axios.get(`movie/${id}`)
  };
};
export const getMovieMonth = (month) => {
  return {
    type: "GET_DATA_MOVIE",
    payload: axios.get(`movie/?month=${month}`)
  };
};
export const postMovie = (form) => {
  return {
    type: "POST_MOVIE",
    payload: axios.post("movie", form)
  };
};

export const patchMovie = (id, form) => {
  return {
    type: "UPDATE_MOVIE",
    payload: axios.patch(`movie/${id}`, form)
  };
};

export const deleteMovie = (id) => {
  return {
    type: "DELETE_MOVIE",
    payload: axios.delete(`movie/${id}`)
  };
};
