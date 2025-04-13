const GET_ARTICLES = 'GET_ARTICLES';
const GET_ARTICLE = 'GET_ARTICLE';
const LOADING = 'LOADING';
const STOP_LOADING = 'STOP_LOADING';
const ERROR = 'ERROR';

const initialState = {
  articles: [],
  article: {},
  articlesCount: 0,
  loading: false,
  error: null,
};

const articlesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ARTICLES:
      return {
        ...state,
        articles: action.payload.articles,
        articlesCount: action.payload.articlesCount,
        error: null,
        article: {},
      };

    case GET_ARTICLE:
      return { ...state, article: action.payload, error: null, articles: [], articlesCount: 0 };

    case LOADING:
      return { ...state, loading: true };

    case STOP_LOADING:
      return { ...state, loading: false };

    case ERROR:
      return { ...state, error: action.payload };

    default:
      return state;
  }
};

export default articlesReducer;
