import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { hot } from 'react-hot-loader';

const styles = {
  root: {
    height: 8,
    width: 8,
    cursor: 'pointer',
    border: 0,
    background: 'none',
    padding: 0,
  },
  dot: {
    backgroundColor: '#ccc',
    height: 8,
    width: 8,
    borderRadius: 4,
    margin: 3,
  },
  active: {
    backgroundColor: '#3190e8',
  },
};


class PaginationDot extends Component {
  handleClick = (event) => {
    this.props.onClick(event, this.props.index);
  };
  render() {
    const { active } = this.props;
    let styleDot;

    if (active) {
      styleDot = Object.assign({}, styles.dot, styles.active);
    } else {
      styleDot = styles.dot;
    }
    return (
      <button style={styles.root} onClick={this.handleClick}>
        <div style={styleDot} />
      </button>
    );
  }
}

PaginationDot.propTypes = {
  active: PropTypes.bool.isRequired,
  index: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
};


export default hot(module)(PaginationDot);
