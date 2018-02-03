import { combineReducers } from 'redux';

import navigationReducer from './containers/Navigation/reducerNavigation';
import allMyProjectsReducer from './reducers/reducer-all-my-projects';

const rootReducer = combineReducers({
  navigation: navigationReducer,
  "all-my-projects": allMyProjectsReducer 
});

export default rootReducer;
 