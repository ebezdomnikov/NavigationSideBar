import { createStore, applyMiddleware, compose } from 'redux';
import reducers from './reducers';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
//import thunk from 'redux-thunk';
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

//
export default function configureStore(initialState) {
  let store = createStore(
    reducers,
    initialState 
    , composeEnhancers(applyMiddleware(
      reduxImmutableStateInvariant()
    ))
  );

  return store;
}
