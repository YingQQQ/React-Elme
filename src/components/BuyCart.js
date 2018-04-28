import React, { PureComponent } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
// import Animated from 'animated/lib/targets/react-dom';
// import Easing from 'animated/lib/Easing';

const Wrapper = styled.div`
  position: absolute;
  bottom: -0.32rem;
  right: 0.5rem;
  display: flex;
  .cartButton,
  a,
  span {
    display: inline-flex;
    position: relative;
  }
  .cartNum {
    display: inline-block;
    text-align: center;
    color: #666;
    vertical-align: middle;
    font-size: 0.6rem;
    min-width: 0.6rem;
    max-width: 2rem;
    overflow: hidden;
    line-height: 1rem;
  }
  a {
    padding: 0.1rem;
    z-index:2;
  }
  svg {
    width: 0.9rem;
    height: 0.9rem;
    fill: #3190e8;
  }
`;


class BuyCart extends PureComponent {
  componentDidMount() {
    console.log('buyCart componentDidMount');
  }
  showMoveDot = [];
  handleMinus = (e) => {
    e.preventDefault();
    console.log('cart-minus');
  };
  handlePlus =(e) => {
    e.preventDefault();
    const elLeft = e.target.getBoundingClientRect().left;
    const elBottom = e.target.getBoundingClientRect().bottom;
    this.showMoveDot.push(true);
    this.props.showMoveDotFun(this.showMoveDot, elLeft, elBottom);
  };
  render() {
    return (
      <Wrapper>
        <span className="cartButton">
          <a onTouchTap={this.handleMinus}>
            <svg>
              <use
                xmlnsXlink="http://www.w3.org/1999/xlink"
                xlinkHref="#cart-minus"
              />
            </svg>
          </a>
          <span className="cartNum">1</span>
          <a onTouchTap={this.handlePlus}>
            <svg>
              <use
                xmlnsXlink="http://www.w3.org/1999/xlink"
                xlinkHref="#cart-add"
              />
            </svg>
          </a>
        </span>
      </Wrapper>
    );
  }
}

BuyCart.propTypes = {
  // index: PropTypes.number.isRequired,
  // isActive: PropTypes.number.isRequired,
  showMoveDotFun: PropTypes.func.isRequired
  // name: PropTypes.string.isRequired
};

export default BuyCart;
