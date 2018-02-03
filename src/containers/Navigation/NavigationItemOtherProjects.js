import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { default as uuidv1 } from 'uuid/v1';

import { default as NavigationItemComponent } from '../../components/Navigation/NavigationItem';
import { actions as navigationActions } from './actionsNavigation';
import { itemTypes } from './itemTypes';

class NavigationItemOtherProjects extends React.Component {

  componentWillReceiveProps(nextProps) {
    //
  }

  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }


  onClickAddMyProject = (event) => {

    const { id } = this.props.data;

    const peopleSectionId = uuidv1();

    this.props.navigationActions.addItemTo({
      item: {
        name: 'Other projects',
        type: itemTypes.NAVIGATION_ITEM_TYPE_MY_PROJECTS_PROJECT_MENU,
        component: NavigationItemComponent,
        children: [{
          id: peopleSectionId,
          name: 'people',
          type: itemTypes.NAVIGATION_ITEM_TYPE_OPENED_PROJECTS_PROJECT_SECTION_MENU,
          component: NavigationItemComponent
        }, {
          name: 'places',
          type: itemTypes.NAVIGATION_ITEM_TYPE_OPENED_PROJECTS_PROJECT_SECTION_MENU,
          component: NavigationItemComponent
        }]
      },
      id,
    });

    this.props.navigationActions.setItemActive({ item: { id: peopleSectionId } });

  };

  render() {
    return (
      <div>
        <button onClick={this.onClickAddMyProject}>Add My Project</button>
        <NavigationItemComponent {...this.props} />
      </div>
    );
  }
}


function mapStateToProps(state, ownProps) {
  return {
    navigation: state.navigation,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    navigationActions: bindActionCreators(navigationActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NavigationItemOtherProjects);