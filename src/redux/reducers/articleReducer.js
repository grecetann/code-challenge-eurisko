import {
  ARTICLES_SUCCESS,
  ARTICLES_REQUESTED,
  ARTICLES_FAILED,
  SEARCH_ARTICLES,
} from "../constants/action-type";

// searchQuery =>  state.filteredArticles = state.articles.filter(article => articles.abstract.contains(searchQuery))

const initialState = {
  articles: [],
  filteredArticles: [],
  searchInput: "",
  articleStatus: "",
  loading: false,
  articleError: "",
};
const articleReducer = (state = initialState, action) => {
  switch (action.type) {
    case ARTICLES_REQUESTED:
      return {
        ...state,
        loading: true,
      };
    case ARTICLES_SUCCESS:
      return {
        ...state,
        articles: [...state.articles, ...action.articles],
        loading: false,
        articleStatus: "success",
      };
    case ARTICLES_FAILED:
      return {
        ...state,
        loading: false,
        articleStatus: "Failed",
      };
    case SEARCH_ARTICLES:
      return {
        ...state,
        searchInput: action.payload.search,
        filteredArticles: state.articles.filter((article) =>
          article.abstract
            .toString()
            .toLowerCase()
            .match(state.searchInput.toString().toLowerCase())
        ),
      };

    default:
      return state;
  }
};
export default articleReducer;
