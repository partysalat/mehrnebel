import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './reducer';
import initialState from './initialState';
import mySaga from './saga';

const sagaMiddleware = createSagaMiddleware();
export default function getStore() {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const store = createStore(
    rootReducer,
    initialState,
    composeEnhancers(applyMiddleware(sagaMiddleware)),

  );
  sagaMiddleware.run(mySaga);
  return store;
}

