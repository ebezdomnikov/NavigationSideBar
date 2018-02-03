import { actionsTypes } from './actionsNavigation';
import { default as uuidv1 } from 'uuid/v1';

const nextId = () => {
  return uuidv1();
}

const initialState = {
  items: [],
  ids: [],
  version: 0,
};
/** 
 * Just convert a tree to flat array
 * 
 * @param {Array} items
 * @param {Numeric|undefined} parentId
 */
const flattenItems = (items, parentId) => {
  let flatten = [];
  items.forEach(i => {
    const children = i.children || []; 

    if (i.children) {
      delete(i.children)  
    }

    i.parentId = parentId;

    // in case if user not specify the id
    if (i.id === undefined) {
      i.id = nextId();
    }

    flatten.push(i); 
    if (children !== undefined) {
      flatten = [
        ...flatten,
        ...flattenItems(children, i.id)
      ]
    }  
  })
 
  return flatten;
}

const findAllChildren = (attr) => {
  const { id, items } = attr;

  const me = items.filter(i=>i.id === id).pop();

  if (!me) {
    return [];
  }

  let allChildren = [];

  items.forEach(c=>{
    if (c.parentId === me.id) {
      allChildren = [
        ...allChildren,
        c,
        ...findAllChildren({ id: c.id, items})
      ]
    }
  })

  return allChildren;
}

/**
 * If you need to set active the leaf on particular level
 * you need also open all parents
 * that function searchs all parents of current leaf 
 * and changes all visibality props
 */
const findAndSetItemAsActive = (attr) => {
   const { items, item } = attr;

   let idToFind = item.id;
   let ids = [];
   const maxLevel = 100;
   let currentLevel = 0;
   while (true) {
     const me = items.filter(i => i.id === idToFind).pop();
     if (!me) {
       break;
     }
     ids.push(me.id);
     idToFind = me.parentId
     currentLevel++;
     // just in case to preven infinite loop
     if (currentLevel > maxLevel) {
       break;
     }
   }

   const newItems = items.map(i => {
     if (ids.includes(i.id)) {
       return {
         ...i,
         isOpen: true,
         isCurrent: item.id === i.id,
       }
     }

     return {
       ...i,
       isOpen: false,
       isCurrent: false,
     }
   })

   return {
     ...attr,
     items: newItems
   };
}

const setItemActive = (state, action) => {

  const { items } = findAndSetItemAsActive({ items: state.items, item: action.item });
  
  return {
    ...state,
    items: [...items],
    version: state.version + 1
  };
}


const addItemToType = (state, action) => {
  const { item, type, options } = action.payload;
  const { ids, items } = state; 

  console.log(action); 
  
  const foundItems = state.items.filter(i=> {
    return i.type === type;
  });

  let updatedItems = items;
  let updatedIds = ids;

  const needToCopy = foundItems.length > 1;

  foundItems.forEach(i=>{

    let items = [item];

    if (needToCopy) {
      items = [{ ...item, id: nextId() }];
    }

    const flatten = flattenItems(items, i.id);
    const newItems = flatten.filter(i => {
      return !updatedIds.includes(i.id)
    });

    updatedIds = [...updatedIds, ...newItems.map(i => i.id)];

    updatedItems = withOptions({
      items: [...updatedItems, ...newItems],
      item, options
    });

  });

  return {
    ...state,
    items: [...updatedItems],
    ids: [...updatedIds],
    version: state.version + 1
  }

}

const addItemTo = (state, action) => {
  const { id, options } = action;
  let { item } = action;
  const { ids } = state;

  if (item.id === undefined) {
    item.id = nextId();
  }
  
  const flatten = flattenItems([item], id);

  const newItems = flatten.filter(i => {
    return !ids.includes(i.id)
  });

  const newIds = newItems.map(i => i.id);

  const itemsWithOptions = withOptions({ 
    items: [...state.items, ...newItems],
    item, options 
  });

  return {
    ...state,
    items: [...itemsWithOptions],
    ids: [...state.ids, ...newIds],
    version: state.version + 1
  }
}

const replaceItemsIn = (state, action) => {

  const { items, id, options } = action.payload;
  const { ids } = state;

  const itemsToRemove = findAllChildren({ items: state.items, id }).map(i=>i.id);
  
  const updatedItems = state.items.filter(i => ! itemsToRemove.includes(i.id));

  const flatten = flattenItems(items, id); //id is parent leaf here for children

  const newItems = flatten.filter(i => {
    return !ids.includes(i.id)
  });


  const itemsWithOptions = withOptions({
    items: [...updatedItems, ...newItems],
    item: {}, options
  });

  const newIds = itemsWithOptions.map(i => i.id);

  return {
    ...state,
    items: [...itemsWithOptions],
    ids: [...newIds],
    version: state.version+1
  };
}

const addItemsTo = (state, action) => {
  const { items, id, options } = action;
  const { ids } = state;

  const flatten = flattenItems(items, id); //id is parent leaf here for children

  const newItems = flatten.filter(i => {
    return !ids.includes(i.id)
  });

  const newIds = newItems.map(i => i.id);

  const itemsWithOptions = withOptions({
    items: [...state.items, ...newItems],
    item: {}, options
  });

  return {
    ...state,
    items: [...itemsWithOptions],
    ids: [...state.ids, ...newIds],
    version: state.version + 1
  }
}

const addItems = (state, action) => {
  
  const { items, options } = action;
  const { ids } = state;

  const flatten = flattenItems(items); //id is parent leaf here for children

  const newItems = flatten.filter(i => {
    return !ids.includes(i.id)
  });

  const newIds = newItems.map(i => i.id);

  const itemsWithOptions = withOptions({
    items: [...state.items, ...newItems],
    item: {}, options
  });

  return {
    ...state,
    items: [...itemsWithOptions],
    ids: [...state.ids, ...newIds],
    version: state.version + 1
  }
} 

const addItem = (state, action) => {
  const { item, options } = action;
  const { ids } = state;
  const children = item.children || [];
  
  const items = [
    item,
    ...children
  ]

  const flatten = flattenItems(items);

  const newItems = flatten.filter(i => {
    return !ids.includes(i.id)
  });

  const newIds = newItems.map(i => i.id);

  const itemsWithOptions = withOptions({ 
    items: [...state.items, ...newItems], 
    item, 
    options 
  });

  return {
    ...state,
    items: [...itemsWithOptions],
    ids: [...state.ids, ...newIds],
    version: state.version + 1
  }
}

const updateItem = (state, action) => {
  const { item, options } = action;
  const { ids } = state;

  if (!ids.includes(item.id)) {
    return state;
  }
  
  const newItems = state.items.map(i => {
  
    if (i.id === item.id) {
      return {
        ...i,
        ...item, 
      };
    }

    return {
      ...i,
    }
  });

  return {
    ...state,
    items: [...withOptions({ items: newItems, item, options })],
    version: state.version+1
  }
};


/**
 * Apply options on result items 
 * before it goes to state
 * so here we have a final changes on items
 * 
 * @param {Object} attr 
 */
const withOptions = (attr) => {
  
  const { items, item, options } = attr;


  if (options === undefined) {
    return items;
  }

  let newItems = items;

  if (options.toggle === true && item.id !== undefined) {
    const data = findAndSetItemAsActive({ items, item });
    newItems = data.items;
  }


  if (options.defaultActive === true) {
    const activeItem = items.filter(i => i.defaultActive === true).pop();
    const data = findAndSetItemAsActive({ items, item: activeItem });
    newItems = data.items;
  }

  // let parentId = undefined;
  // let neighbors = [];

  // if (options.toggle) {
  //   items.forEach(i => {
  //     if (i.id === item.id) {
  //       parentId = i.parentId;
  //     }
  //   });
  //   // just determine the neighbors of current item, because with
  //   // toggle option there are should be active only one leaf, 
  //   // all others should be closed
  //   neighbors = items.filter(i => i.parentId === parentId).map(o => o.id);
  // }
  
  // const newItems = items.map(i => {

  //   //just apply with current values
  //   let isOpen = i.isOpen;
  //   let isCurrent = i.isCurrent || false;

  //   if (i.id === item.id) { // here item is that should be changed
    
  //     // if we have toogle option, 
  //     // leaf shoule be open and all other closed (see below)
  //     if (options.toggle) {      
  //       isOpen = true;
  //     }

  //     if (options.current === false) {
  //       isCurrent = i.isCurrent;
  //     } else {
  //       // default
  //       isCurrent = true;

  //     }

  //     return {
  //       ...i,
  //       isOpen,
  //       isCurrent
  //     };
  //   }

  //   // if toggle, we need to check if current leaf is 
  //   // a neighbor of item from props
  //   // if it is - close it.
  //   if (options.toggle) {
  //     if (neighbors.filter(p => p === i.id).length > 0) {
  //       isOpen = false;
  //     }
  //   }

  //   if (options.current === false) {
  //     isCurrent = i.isCurrent;
  //   } else {
  //     // default
  //     isCurrent = false

  //   }

  //   return {
  //     ...i,
  //     isOpen,
  //     isCurrent
  //   }
  // });

  return newItems;
}

export default function navigationReducer(state = initialState, action) {
  switch (action.type) {
    case actionsTypes.NAVIGATION_ITEM_REPLACE:
      return replaceItemsIn(state, action);
    case actionsTypes.NAVIGATION_ITEM_ADD_TO_TYPE:
      return addItemToType(state, action);
    case actionsTypes.NAVIGATION_ITEM_SET_ACTIVE:
      return setItemActive(state, action);
    case actionsTypes.NAVIGATION_ITEM_UPDATE:
      return updateItem(state, action);
    case actionsTypes.NAVIGATION_ITEM_ADD_TO:
      return addItemTo(state, action);
    case actionsTypes.NAVIGATION_ITEMS_ADD_TO:
      return addItemsTo(state, action);
    case actionsTypes.NAVIGATION_ITEMS_ADD:
      return addItems(state, action);
    case actionsTypes.NAVIGATION_ITEM_ADD: 
      return addItem(state, action);
    default:
      return state;
  }
}