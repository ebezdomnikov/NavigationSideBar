import * as MyProjects from '../actions/actions-all-my-projects';
import { createReducer } from './utils';

const initialState = {
  items: [],
  ids: [],
  version: 0,
  isFetching: false
};

const setFetchingTrue = (state, action) => ({ ...state, isFetching: true });
const setFetchingFalse = (state, action) => ({ ...state, isFetching: false });

const receiveAllMyProjects = (state, action) => {
  const allMyProjects = action.allMyProjects;
  
  return {
    ...state,
    isFetching: false,
    items: action.allMyProjects.data
  };
};

const receiveAllMyProjectsFailed = (state, action) => {
  return {
    ...state,
    isFetching: true
  };
};

const addProject = (state, action) => {
  const { payload } = action;
  
  return {
    ...state,
    items: [...state.items, payload],
    ids: [...state.ids, payload.id],
    version: state.version+1
  };
} 

const allMyProjects = createReducer(initialState, {
  [MyProjects.ADD_PROJECT]: addProject,
  [MyProjects.REQUEST_ALL_MY_PROJECTS]: setFetchingTrue,
  [MyProjects.RECEIVE_ALL_MY_PROJECTS_FAILED]: receiveAllMyProjectsFailed,
  [MyProjects.RECEIVE_ALL_MY_PROJECTS]: receiveAllMyProjects
});
 
export default allMyProjects;