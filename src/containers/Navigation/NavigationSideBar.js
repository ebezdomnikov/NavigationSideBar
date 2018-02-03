import React from 'react';
import PropTypes from 'prop-types';
import { default as uuidv1 } from 'uuid/v1';

import { connect } from 'react-redux'; 
import { bindActionCreators } from 'redux';

import { actions as navigationActions } from './actionsNavigation';
import { itemTypes } from './itemTypes'; 
// import {
//   actions as projectsFormsActions,
//   formTypes as projectsFormsTypes
// } from '../../containers/projects-forms';
  
//import ImageIcon from './components/ImageIcon';

import { default as NavigationSideBarComponent } from '../../components/Navigation/NavigationSideBar';
import { default as NavigationItemContainer } from '../../components/Navigation/NavigationItem';
// import { default as NavigationItemComponent } from '../../components/Navigation/NavigationItem';
// import { default as NavigationProjectItemContainer } from './NavigationProjectItem';
// import { default as NavigationNewProjectItemContainer } from './NavigationNewProjectItem';


// import { withNavigationSideBarRouter } from './';


// import ActionHome from 'material-ui/svg-icons/action/home';
// import NewProject from 'material-ui/svg-icons/action/description';
// import HardwareKeyboardArrowDown from "material-ui/svg-icons/hardware/keyboard-arrow-down";
// import HardwareKeyboardArrowRight from "material-ui/svg-icons/hardware/keyboard-arrow-right";


class NavigationSideBar extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      navigation: props.navigation
    }
  }

  componentDidMount() {  
    this.props.navigationActions.addItems({ items: this.props.navigationItems}); 
  }

  componentWillReceiveProps(nextProps, nextState) {
    const { navigationVersion } = this.props;    
      if (nextProps.navigationVersion > navigationVersion) {    
        this.setState({ 
          navigation: nextProps.navigation
        })
      }
  }

  onNodeMouseClick = (event, tree, node, level, keyPath) => {
    const navigationItem = {
      id: node.id,
      name: node.name,
    };
    this.props.navigationActions.updateItem(
      { item: navigationItem, options: { toggle: true } }
    ); 
    this.props.onNodeMouseClick(event, tree, node, level, keyPath);
  };



  render() {
    return (
      <div>
      <NavigationSideBarComponent navigation={this.state.navigation} onNodeMouseClick={this.onNodeMouseClick} route={this.props.route} />
      <br /><br /><br />
      {this.state.navigation.map(item => {
        return <div>{item.name}</div>;
      })}
      
      </div>
    );
  }
}


NavigationSideBar.propTypes = {
  onLeafMouseDown: PropTypes.func,
  onNodeMouseClick: PropTypes.func,
  onLeafMouseClick: PropTypes.func,
  onLeafMouseUp: PropTypes.func,
  tree: PropTypes.array,
  openedProjects: PropTypes.array,
  lastOpenedFormId: PropTypes.number,
  lastOpenedFormType: PropTypes.string,
  route: PropTypes.string
};

NavigationSideBar.defaultProps = {
  onLeafMouseDown: () => { },
  onNodeMouseClick: () => { },
  onLeafMouseClick: () => { },
  onLeafMouseUp: () => { },
  tree: [],
  openedProjects: [],
  lastOpenedFormId: null,
  lastOpenedFormType: "",
  route: ""
};

function mapStateToProps(state, ownProps) {
  return {
    navigation: state.navigation.items,
    navigationVersion: state.navigation.version 
  };
}

function mapDispatchToProps(dispatch) {
  return {
    navigationActions: bindActionCreators(navigationActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NavigationSideBar);
