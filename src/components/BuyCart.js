import React, { PureComponent } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Animated from 'animated/lib/targets/react-dom';
import Easing from 'animated/lib/Easing';

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
    z-index: 2;
  }
  svg {
    width: 0.9rem;
    height: 0.9rem;
    fill: #3190e8;
  }
  .moveDot {
    position: fixed;
    z-index: 1;
  }
`;

class BuyCart extends PureComponent {
  state = {
    anim: new Animated.Value(0),
    left: 0,
    top: 0,
    isDoneMove: false,
  };
  componentDidMount() {
    console.log('buyCart componentDidMount');
    this.windowHeight = window.innerHeight;
  }
  rootNode = null;
  windowHeight = null;
  isDoneMove = false;
  handleMinus = (e) => {
    e.preventDefault();
    console.log('cart-minus');
  };
  handlePlus = (e) => {
    e.preventDefault();
    const elLeft = e.target.getBoundingClientRect().left;
    const elTop = e.target.getBoundingClientRect().top;
    this.setState(() => ({
      left: elLeft,
      top: elTop
    }));
    this.animate();
  };
  animate = () => {
    this.state.anim.setValue(0);
    Animated.sequence([
      Animated.parallel(
        [
          Animated.timing(this.state.anim, {
            toValue: 2,
            duration: 600,
            easing: Easing.linear
          }),
        ]
      ),
      Animated.stagger(
        100,
        [
          Animated.timing(this.state.anim, {
            toValue: 0,
            duration: 10,
            easing: Easing.linear
          }),
        ]
      ),
    ]).start(() => {
      this.isDoneMove = true;
      this.props.showMoveDotFun(this.isDoneMove);
    });
  }
  render() {
    const { top, left } = this.state;
    const endPos = this.windowHeight - 50;
    const styles = {
      opacity: this.state.anim,
      zIndex: 1,
    };
    const innerStyles = {
      position: 'fixed',
      left: Animated.template`${this.state.anim.interpolate({
        inputRange: [0, 0.5, 1, 1.5, 2],
        outputRange: [`${left}px`, '252.5px', '185px', '107.5px', '30px']
      })}`,
      top: Animated.template`${this.state.anim.interpolate({
        inputRange: [0, 0.5, 1, 1.5, 2],
        outputRange: [`${top}px`, `${top - 80 <= 0 ? 10 : top - 80}px`,
          `${top}px`, `${top + ((endPos - top) / 2)}px`, `${endPos}px`]
      })}`,
      zIndex: 1,
    };
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
          <a
            onTouchTap={this.handlePlus}
            ref={(node) => {
              this.rootNode = node;
            }}
          >
            <svg>
              <use
                xmlnsXlink="http://www.w3.org/1999/xlink"
                xlinkHref="#cart-add"
              />
            </svg>
          </a>
        </span>
        <Animated.div style={Object.assign({}, styles)}>
          <Animated.div style={Object.assign({}, innerStyles)}>
            <a
              className="moveDot"
            >
              <svg>
                <use
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  xlinkHref="#cart-add"
                />
              </svg>
            </a>
          </Animated.div>
        </Animated.div>
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
