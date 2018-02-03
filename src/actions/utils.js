/**
 * @param {String} type - action type
 * @param {...String} argNames - one or more names for additional action keys
 * @returns {function} a function that accepts action values for the keys
 */
export const makeActionCreator = (type, ...argNames) => (...args) => {
  let action = { type }; // action =  { type: type } e.g. { type: REFRESH_TICKET }
  argNames.forEach((argName, index) => {
    action[argName] = args[index]; // for each argName assign arg value from (...args) e.g. action['ticketId'] = id;
  });
  return action;
};

export const makeAdvancedActionCreator = (type, ...argNames) => (...args) => {
  let action = { type }; // action =  { type: type } e.g. { type: REFRESH_TICKET }
  argNames.forEach((argName, index) => {
    action[argName] = args[index]; // for each argName assign arg value from (...args) e.g. action['ticketId'] = id;
  });
  action['__stateSelector'] = () => { };
  return action;
};

export const chain = (fun) => new Promise((success) => success(fun()));

export const getMoveItemParams = (object) => ([
  object.itemToMove, object.itemType, object.targetArea, object.targetAreaType, object.dropBefore
]);
