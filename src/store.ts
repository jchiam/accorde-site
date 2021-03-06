import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';

import combinedReducer from 'reducers';

const isProduction = process.env.NODE_ENV === 'production';

const generateStore = () => createStore(combinedReducer, applyMiddleware(thunkMiddleware));

const generateDevStore = () => {
  const logger = createLogger();
  return createStore(combinedReducer, applyMiddleware(thunkMiddleware, logger));
};

export default isProduction ? generateStore() : generateDevStore();
