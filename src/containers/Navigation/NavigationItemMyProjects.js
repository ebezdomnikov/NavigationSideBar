import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { default as uuidv1 } from 'uuid/v1';

import { default as NavigationItemComponent } from '../../components/Navigation/NavigationItem';
import { actions as navigationActions } from './actionsNavigation';
import { itemTypes } from './itemTypes';

class NavigationItemMyProjects extends React.Component {

  componentWillReceiveProps(nextProps) {
    if (nextProps.allMyProjects.version > this.props.allMyProjects.version) {
      let items = [];
      nextProps.allMyProjects.items.forEach(p => {
        items.push({
            name: p.name,
            type: itemTypes.NAVIGATION_ITEM_TYPE_OPENED_PROJECTS_PROJECT_MENU,
            component: NavigationItemComponent,
            children: [{
              defaultActive: true,
              name: 'people',
              type: itemTypes.NAVIGATION_ITEM_TYPE_MY_PROJECTS_PROJECT_SECTION_MENU,
              component: NavigationItemComponent
            }, {
              name: 'places',
              type: itemTypes.NAVIGATION_ITEM_TYPE_MY_PROJECTS_PROJECT_SECTION_MENU,
              component: NavigationItemComponent
            }]
        });
      });

      this.props.navigationActions.replaceItemsIn({
        items,
        id: this.props.data.id,
        options: { defaultActive: true }
      });
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }

  render() { 
    return (
      <div>
      <NavigationItemComponent {...this.props} />
      </div>
      );
  }
}


function mapStateToProps(state, ownProps) {
  return { 
    navigation: state.navigation,
    allMyProjects: state["all-my-projects"]
  };
}

function mapDispatchToProps(dispatch) {
  return {
    navigationActions: bindActionCreators(navigationActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NavigationItemMyProjects);