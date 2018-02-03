
export const NAVIGATION_ITEM_ADD = 'NAVIGATION_ITEM_ADD';
export const NAVIGATION_ITEM_ADD_TO = 'NAVIGATION_ITEM_ADD_TO';
export const NAVIGATION_ITEM_ADD_TO_TYPE = 'NAVIGATION_ITEM_ADD_TO_TYPE';
export const NAVIGATION_ITEMS_ADD_TO_TYPE = 'NAVIGATION_ITEMS_ADD_TO_TYPE';
export const NAVIGATION_ITEMS_ADD_TO = 'NAVIGATION_ITEMS_ADD_TO';
export const NAVIGATION_ITEMS_ADD = 'NAVIGATION_ITEMS_ADD';
export const NAVIGATION_ITEM_REMOVE = 'NAVIGATION_ITEM_REMOVE';
export const NAVIGATION_ITEM_UPDATE = 'NAVIGATION_ITEM_UPDATE';
export const NAVIGATION_ITEMS_UPDATE = 'NAVIGATION_ITEMS_UPDATE';
export const NAVIGATION_ITEM_SET_ACTIVE = 'NAVIGATION_ITEM_SET_ACTIVE';
export const NAVIGATION_ITEM_REPLACE = 'NAVIGATION_ITEM_REPLACE';


export const actionsTypes = {
  NAVIGATION_ITEM_ADD,
  NAVIGATION_ITEM_ADD_TO,
  NAVIGATION_ITEM_ADD_TO_TYPE,
  NAVIGATION_ITEMS_ADD_TO_TYPE,
  NAVIGATION_ITEMS_ADD_TO,
  NAVIGATION_ITEMS_ADD,
  NAVIGATION_ITEM_REMOVE,
  NAVIGATION_ITEM_UPDATE,
  NAVIGATION_ITEMS_UPDATE,
  NAVIGATION_ITEM_SET_ACTIVE,
  NAVIGATION_ITEM_REPLACE
}

export function replaceItemsIn(attr) {
  return {
    type: actionsTypes.NAVIGATION_ITEM_REPLACE,
    payload: attr
  };
}

export function addItemToType(attr) {
  return {
    type: actionsTypes.NAVIGATION_ITEM_ADD_TO_TYPE,
    payload: attr
  };
}

export function addItemsToType(attr) {
  return {
    type: actionsTypes.NAVIGATION_ITEMS_ADD_TO_TYPE,
    payload: attr
  };
}

export function setItemActive(attr) {
  return {
    type: actionsTypes.NAVIGATION_ITEM_SET_ACTIVE,
    item: attr.item,
  };
}


export function addItemTo(attr) {
  return {
    type: actionsTypes.NAVIGATION_ITEM_ADD_TO, 
    item: attr.item, 
    id: attr.id,
    options: attr.options || {}
  };
}

export function addItemsTo(attr) {
  return {
    type: actionsTypes.NAVIGATION_ITEMS_ADD_TO,
    items: attr.items,
    id: attr.id,
    options: attr.options || {}
  };
}

export function addItem(attr) {
  return { 
    type: actionsTypes.NAVIGATION_ITEM_ADD, 
    item: attr.item,
    options: attr.options || {}
  };
}

export function addItems(attr) {
  return {
    type: actionsTypes.NAVIGATION_ITEMS_ADD, 
    items:attr.items,
    options: attr.options || {}
  };
}

export function removeItem(attr) {
  return {
    type: actionsTypes.NAVIGATION_ITEM_REMOVE, 
    item: attr.item,
    options: attr.options || {}
  };
}

export function updateItems(attr) {
  return {
    type: actionsTypes.NAVIGATION_ITEMS_UPDATE, 
    items: attr.items, 
    options: attr.options || {}
  };  
}

export function updateItem(attr) {
  return { 
    type: actionsTypes.NAVIGATION_ITEM_UPDATE, 
    item: attr.item,
    options: attr.options || {}
  };
}

export const actions = {
  addItem,
  addItemTo,
  addItemToType,
  addItemsToType,
  addItemsTo,
  addItems,
  removeItem,
  updateItem,
  updateItems,
  setItemActive,
  replaceItemsIn
}