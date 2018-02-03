import React from 'react';
import PropTypes from 'prop-types';

class NavigationItem extends React.Component {

  getLevel = () => {
    let { level } = this.props.data;
    level = level === undefined ? 0 : level;
    return parseInt(level) + 1;
  };

  getClassForParent = () => {
    const { isParent } = this.props.data;
    return `${isParent > 0 ? 'navigation-item-parent' : ''}`;
  };

  getClassParentDiv = () => {
    const { isCurrent } = this.props;
    const level = this.getLevel();
    const classForParent = this.getClassForParent();
    return `navigation-item ${classForParent} navigation-item-layer-${level} ${isCurrent ? 'navigation-item-selected' : ""}`;
  };

  getClassChildDiv = () => {
    const level = this.getLevel();
    return `navigation-left-icon-container-layer-${level}`;
  };

  getClassLeftIcon = () => {
    const level = this.getLevel();
    return `navigation-left-icon-layer-${level}`;
  };

  getLeftIcon = () => {

    const { leftIconOnOpened, leftIconOnClosed, leftIcon, isOpen } = this.props;

    if (leftIcon !== undefined) {
      return leftIcon;
    }

    if (isOpen && leftIconOnOpened !== undefined) {
      return leftIconOnOpened;
    }

    if (!isOpen && leftIconOnClosed !== undefined) {
      return leftIconOnClosed;
    }

    return () => <div />; //default empty object
  };


  render() {
    const LeftIcon = this.getLeftIcon();
    const classParentDiv = this.getClassParentDiv();
    const classChildDiv = this.getClassChildDiv();
    const classLeftIcon = this.getClassLeftIcon();

    return (
      <div
        className={classParentDiv}
        key={this.props.key}
        onClick={this.props.onClick}
      >
        <div className={classChildDiv}>
          <LeftIcon className={classLeftIcon} />
        </div>
        <div>{this.props.name}</div>
        {this.props.renderRightSide(this.props)}
      </div>
    );
  }
}

NavigationItem.propTypes = {
  data: PropTypes.object,
  onClick: PropTypes.func,
  key: PropTypes.number,
  name: PropTypes.string,
  leftIconOnOpened: PropTypes.func,
  leftIconOnClosed: PropTypes.func,
  leftIcon: PropTypes.func,
  isOpen: PropTypes.bool,
  isCurrent: PropTypes.bool,
  level: PropTypes.number,
  isParent: PropTypes.bool,
  renderRightSide: PropTypes.func
};

NavigationItem.defaultProps = {
  renderRightSide: () => { }
};

export default NavigationItem;