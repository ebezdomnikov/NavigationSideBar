import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { default as NavigationItemComponent } from '../../components/Navigation/NavigationItem';

class NavigationItem extends React.Component {

  componentWillReceiveProps(nextProps) {
    //
  }

  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }


  render() {
    return <NavigationItemComponent {...this.props} />;
  }
}


function mapStateToProps(state, ownProps) {
  return {
    navigation: state.navigation,
  };
}

function mapDispatchToProps(dispatch) {
  return {
      
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NavigationItem);