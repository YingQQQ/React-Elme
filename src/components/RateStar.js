import React from 'react';
import PropTypes from 'prop-types';
import { hot } from 'react-hot-loader';

const RateStar = ({ rating = 5 }) => {
  const width = (rating * 2.5) / 5;
  const styles = {
    ratingContainer: {
      position: 'relative',
      width: '2.5rem',
      height: '.6rem',
    },
    starContainer: {
      position: 'absolute',
      display: 'flex',
      width: '2.5rem',
    },
    grey: {
      fill: '#ff9a0d'
    },
    orange: {
      fill: '#d1d1d1'
    },
    width: {
      width: `${width}rem`,
      overflow: 'hidden',
      position: 'relative',
      height: '100%',
    },
    zIndex: {
      zIndex: 2
    }
  };
  const children = (className) => {
    const child = [];
    for (let i = 0; i < 5; i += 1) {
      child.push(
        <svg style={className} key={i}>
          <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="#star" />
        </svg>
      );
    }
    return child;
  };
  return (
    <section style={styles.ratingContainer}>
      <section style={styles.starContainer}>
        {children(styles.orange)}
      </section>
      <section style={Object.assign({}, styles.width, styles.zIndex)}>
        <section style={styles.starContainer}>
          {children(styles.grey)}
        </section>
      </section>
    </section>
  );
};

RateStar.propTypes = {
  rating: PropTypes.number
};

export default hot(module)(RateStar);
