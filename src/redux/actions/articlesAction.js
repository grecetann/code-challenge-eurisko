import axios from "axios";

import {
  ARTICLES_SUCCESS,
  ARTICLES_REQUESTED,
  ARTICLES_FAILED,
  SEARCH_ARTICLES,
} from "../constants/action-type";

export const getArticles = (page) => {
  const token = localStorage.getItem("token");

  return async (dispatch) => {
    dispatch({ type: ARTICLES_REQUESTED });
    await axios
      .get("http://34.245.213.76:3000/articles", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          page: page,
        },
      })
      .then((response) => {
        const articles = response.data.response.docs;
        dispatch({ type: ARTICLES_SUCCESS, articles });
      })
      .catch((error) => {
        dispatch({ type: ARTICLES_FAILED, error });
      });
  };
};

export const searchArticles = (searchInput) => ({
  type: SEARCH_ARTICLES,
  payload: {
    search: searchInput,
  },
});
