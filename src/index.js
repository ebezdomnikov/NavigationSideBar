import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { bindActionCreators } from 'redux';

import './styles.css';
 
import { default as NavigationSideBarContainer } from './containers/Navigation/NavigationSideBar';
import { default as NavigationItemContainer } from './containers/Navigation/NavigationItem';
import { default as NavigationItemMyProjectsContainer } from './containers/Navigation/NavigationItemMyProjects';
import { default as NavigationItemOtherProjectsContainer } from './containers/Navigation/NavigationItemOtherProjects';

import { itemTypes } from './containers/Navigation/itemTypes';

import { default as uuidv1 } from 'uuid/v1';

import configureStore from './store';

import { actions as allMyProjectsActions } from './actions/actions-all-my-projects';

const styles = {
  fontFamily: 'sans-serif',
  textAlign: 'center',
};


export const store = configureStore();

const nextId = () => {
  return uuidv1();
}


const navigationItems = [
  {
    name: 'Home',
    type: itemTypes.NAVIGATION_ITEM_TYPE_MENU,
    component: NavigationItemContainer,
  },{
    name: 'My Projects',
    type: itemTypes.NAVIGATION_ITEM_TYPE_MY_PROJECTS_PARENT_MENU,
    component: NavigationItemMyProjectsContainer,
  },{
    name: 'Service Delivery Code',
    type: itemTypes.NAVIGATION_ITEM_TYPE_MENU,
    component: NavigationItemContainer,
    children: [
      {
        name: 'Sub item',
        type: itemTypes.NAVIGATION_ITEM_TYPE_MENU,
        component: NavigationItemContainer,      
        children: [{
          name: 'Sub item 2',
          type: itemTypes.NAVIGATION_ITEM_TYPE_MENU,
          component: NavigationItemContainer,
        }]      
      }, {
        name: 'Sub item',
        type: itemTypes.NAVIGATION_ITEM_TYPE_MENU,
        component: NavigationItemContainer,
        children: [{
          name: 'Sub item 2',
          type: itemTypes.NAVIGATION_ITEM_TYPE_MENU,
          component: NavigationItemContainer,
        }]
      }
    ]
  }, {
    name: 'News',
    type: itemTypes.NAVIGATION_ITEM_TYPE_MENU,
    component: NavigationItemContainer,
  }, {
    name: 'Help',
    type: itemTypes.NAVIGATION_ITEM_TYPE_MENU,
    component: NavigationItemContainer,
  }, {
    name: 'Opened Projects',
    type: itemTypes.NAVIGATION_ITEM_TYPE_OPENED_PROJECTS_PARENT_MENU,
    component: NavigationItemOtherProjectsContainer,
  }
]; 

const tree = [];


const onClickAddOtherProject = (event) => {
  const actions = bindActionCreators(allMyProjectsActions, store.dispatch);

  actions.addProject({ id: nextId(), name: "Project Name"});
}

const DummyComponent = () => ( 
  []
);

const AppStore = () => (
  <div>
  
    <button onClick={onClickAddOtherProject}>Add Other Project</button>
    <NavigationSideBarContainer navigationItems={navigationItems} />
  </div>
)



const App = () => (
  <div style={styles}>
    <Provider store={store}>
      <AppStore />
    </Provider>
  </div>
); 

render(<App />, document.getElementById('root'));
