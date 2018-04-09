import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import { listen } from '../utils/dom-helpers/events';

const styles = {
  container: {
    background: '#fff'
  },
  list: {
    borderBottom: '.001rem solid #f1f1f1',
    textAlign: 'center'
  }
};
// const cData = [
//   'http://img1.gtimg.com/15/1580/158031/15803178_1200x1000_0.jpg',
//   'http://img1.gtimg.com/15/1580/158031/15803179_1200x1000_0.jpg',
//   'http://img1.gtimg.com/15/1580/158031/15803181_1200x1000_0.jpg',
//   'http://img1.gtimg.com/15/1580/158031/15803182_1200x1000_0.jpg',
//   'http://img1.gtimg.com/15/1580/158031/15803183_1200x1000_0.jpg'
// ];

class Shop extends Component {
  componentDidMount() {
    console.log('shop componentDidMount');
    this.touchMoveListener = listen(this.rootNood, 'touchmove', (event) => {
      this.handleMove(event);
    });
  }
  componentWillUnmount() {
    this.touchMoveListener();
  }
  handleMove = (e) => {
    console.log(e);
  };
  render() {
    const children = [];
    for (let index = 0; index < 30; index += 1) {
      children.push(
        <li key={index} style={Object.assign({}, styles.list)}>
          {index}
        </li>
      );
    }
    return (
      <section
        style={Object.assign({}, styles.container)}
        ref={(node) => {
          this.rootNood = node;
        }}
      >
        <ul>{children}</ul>
      </section>
    );
  }
}

export default hot(module)(Shop);
