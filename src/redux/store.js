import { configureStore } from '@reduxjs/toolkit';

import articlesReducer from './reducers/articles-reducer';
import loginReducer from './reducers/login-reducer';

const store = configureStore({ reducer: { loginReducer, articlesReducer } });

export default store;
