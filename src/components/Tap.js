import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class Tap extends PureComponent {
  handleClick = () => {
    const { index } = this.props;
    this.props.onChangeType(index);
  };
  render() {
    const { name, isActive, index } = this.props;
    return (
      <span
        onTouchTap={this.handleClick}
        className={index === isActive ? 'activeTap' : ''}
      >
        {name}
      </span>
    );
  }
}

Tap.propTypes = {
  index: PropTypes.number.isRequired,
  isActive: PropTypes.number.isRequired,
  onChangeType: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired
};

export default Tap;
