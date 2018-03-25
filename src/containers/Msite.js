import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { hot } from 'react-hot-loader';
import Head from '../components/Head';
// import SwipeableViews from '../components/Swp';
import Swiper from '../components/Swiper';

const styles = {
  container: {
    paddingTop: 40
  },
  slide: {
    padding: 15,
    minHeight: 100,
    color: '#fff',
  },
  slide1: {
    backgroundColor: '#FEA900',
  },
  slide2: {
    backgroundColor: '#B3DC4A',
  },
  slide3: {
    backgroundColor: '#6AC0FF',
  },
};


class Msite extends Component {
  state= {
    name: 'elem'
  }
  render() {
    return (
      <div>
        <Head search />
        <Swiper style={Object.assign({}, styles.container)}>
          <div style={Object.assign({}, styles.slide, styles.slide1)}>slide n°1</div>
          <div style={Object.assign({}, styles.slide, styles.slide2)}>slide n°2</div>
          <div style={Object.assign({}, styles.slide, styles.slide3)}>slide n°3</div>
        </Swiper>
      </div>
    );
  }
}
// Msite.propTypes = {
//   isLoading: PropTypes.bool,
//   error: PropTypes.string
// };

export default hot(module)(Msite);
