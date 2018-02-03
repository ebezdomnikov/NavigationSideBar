import { makeActionCreator } from './utils';

export const REQUEST_ALL_MY_PROJECTS = 'REQUEST_ALL_MY_PROJECTS';
export const RECEIVE_ALL_MY_PROJECTS = 'RECEIVE_ALL_MY_PROJECTS';
export const RECEIVE_ALL_MY_PROJECTS_FAILED = 'RECEIVE_ALL_MY_PROJECTS_FAILED';

export const ADD_PROJECT = 'ADD_PROJECT';

export function addProject(attr) {
  return {
    type: ADD_PROJECT,
    payload: attr
  };
}

export const requestAllMyProjects = makeActionCreator(REQUEST_ALL_MY_PROJECTS);
export const receiveAllMyProjects = makeActionCreator(RECEIVE_ALL_MY_PROJECTS);
export const receiveAllMyProjectsFailed = makeActionCreator(RECEIVE_ALL_MY_PROJECTS_FAILED);

export const actions = {
  addProject,
  requestAllMyProjects,
  receiveAllMyProjects,
  receiveAllMyProjectsFailed,
}