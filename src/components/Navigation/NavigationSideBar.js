import React, { Component } from 'react';
import PropTypes from 'prop-types';

import InfinityMenu from "../InfinityMenu/InfinityMenu";
//import InfinityMenu from "react-infinity-menu";
 
 
class NavigationSideBar extends Component {


  treeify = (list, idAttr, parentAttr, childrenAttr) => {
    if (!idAttr) idAttr = 'id';
    if (!parentAttr) parentAttr = 'parentId';
    if (!childrenAttr) childrenAttr = 'children';
    var treeList = [];
    var lookup = {};
    list.forEach(function (obj) {
      lookup[obj[idAttr]] = obj;
      obj[childrenAttr] = [];
    });
    list.forEach(function (obj) {
      if (obj[parentAttr] != null) {
        lookup[obj[parentAttr]][childrenAttr].push(obj);
      } else {
        treeList.push(obj);
      }
    });
    return treeList;
  }


  onNodeMouseClick = (event, tree, node, level, keyPath) => {
    this.props.onNodeMouseClick(event, tree, node, level, keyPath);
  };

  onLeafMouseClick = (event, leaf) => {
    this.props.onLeafMouseClick(event, leaf);
  };

  onLeafMouseUp = (event, leaf) => {
    this.props.onLeafMouseUp(event, leaf);
  };

  onLeafMouseDown = (event, leaf) => {
    this.props.onLeafMouseDown(event, leaf);
  };

  render() {

    let tree = this.treeify([...this.props.navigation].map(i => {
      return { ...i, customComponent: i.component }
      })
    );  
 
    return (
      <InfinityMenu
        disableDefaultHeaderContent
        tree={tree}
        onNodeMouseClick={this.props.onNodeMouseClick}
        onLeafMouseClick={this.onLeafMouseClick}/*optional*/
        onLeafMouseDown={this.onLeafMouseDown}/*optional*/
        onLeafMouseUp={this.onLeafMouseUp}/*optional*/
        maxLeaves={5}/*optional*/
      />
    );
  }
}

NavigationSideBar.propTypes = {
  onLeafMouseDown: PropTypes.func,
  onNodeMouseClick: PropTypes.func,
  onLeafMouseClick: PropTypes.func,
  onLeafMouseUp: PropTypes.func,
  tree: PropTypes.array
};

NavigationSideBar.defaultProps = {
  onLeafMouseDown: () => { },
  onNodeMouseClick: () => { },
  onLeafMouseClick: () => { },
  onLeafMouseUp: () => { },
  tree: []
};

export default NavigationSideBar;