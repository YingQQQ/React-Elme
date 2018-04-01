import React from 'react';
import PropTypes from 'prop-types';
import { hot } from 'react-hot-loader';


const RateStar = ({ active = false, rating = 5 }) => {
  const children = [];
  const width = (rating * 2) / 5;
  const styles = {
    grey: {
      fill: '#ff9a0d',
    },
    orange: {
      fill: '#d1d1d1',
    },
    rateGrey: {
      width: `${width}rem`,
      height: '.6rem',
    },
    rateOrange: {
      position: 'absolute',
      overflow: 'hidden',
      zIndex: 2,
    }
  };
  for (let i = 0; i < 5; i += 1) {
    children.push(
      <svg style={active ? styles.orange : styles.grey} key={i}>
        <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="#star" />
      </svg>
    );
  }
  const rateContainer = active ?
    styles.orange :
    Object.assign({}, styles.rateGrey, styles.rateOrange)
    ;
  return (
    <section style={rateContainer}>
      { children }
    </section>
  );
};

RateStar.propTypes = {
  active: PropTypes.bool,
  rating: PropTypes.number,
};


export default hot(module)(RateStar);
