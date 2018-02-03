/**
 * Copyright (C) Hemmersbach GmbH & Co. KG - All Rights Reserved
 *
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 *
 * Created   : 11.01.2017
 * Author   : SDoellner <stefan.doellner@hemmersbach.com>
*/

import * as _ from "lodash";

export const createReducer = (initialState, handlers) => {
  return (state = initialState, action) => {
    if (handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action);
    } else {
      return state;
    }
  };
};
 
/**
 * Creates a map from the given array.
 * Each object from the array will be scanned for the keyName property
 * and its value will become a key for the given element in the final map.
 * Example:
 * const arr = [{id: 1, name: 'kamil'}, {id: 2, name: 'ernest'}];
 * const map = toHashMap(arr, 'id');
 * Will return an object like:
 * {
 *      1: {id: 1, name: 'kamil'},
 *      2: {id: 2, name: 'ernest'}
 * }
 * Useful for storing state in redux.
 * @param {Array} arrayOfObj - array of objects to iterate on
 * @param {string} keyName - name of the key you want to have in output object
 * @returns {object} object mapped by the keyName
 */
export const toHashMap = (arrayOfObj, keyName) => {
  return _.keyBy(arrayOfObj, keyName);
};
