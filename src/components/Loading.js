import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';
import { hot } from 'react-hot-loader';
import loadImage from '../style/images/icon_loading.png';

const Wrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 2.5rem;
  height: 2.5rem;
  z-index: 2;
`;
const load = keyframes`
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-50px)
  }
  100% {
    transform: translateY(0px)
  }
`;

const ImgWrapper = styled.div`
  width: 100%;
  height: 100%;
  background: url(${loadImage}) no-repeat 0 0;
  background-size: 2.5rem auto;
  transform: translateY(0px);
  position: relative;
  z-index: 11;
  background-position-y: ${props => props.positionY}rem;
  animation: ${load} 0.6s infinite ease-in-out;
`;

const ellipse = keyframes`
  0% {transform: scale(1)}
  50% {transform: scale(.3)}
  100% {transform: scale(1)}
`;

const Svg = styled.svg`
  position: absolute;
  width: 2.6rem;
  height: 2.6rem;
  top: 2.2rem;
  left: 0.2rem;
  z-index: 10;
  animation: ${ellipse} 0.6s infinite ease-in-out;
`;

class MyLoadingComponent extends PureComponent {
  state = {
    positionY: 0
  }
  componentDidMount = () => {
    console.log('loading ComponentDidMount');
    this.timer = setInterval(() => {
      this.setState((pre) => {
        const nextPosy = pre.positionY + 1;
        return {
          positionY: nextPosy
        };
      });
    }, 600);
  }

  componentWillUnmount = () => {
    clearInterval(this.timer);
  }
  timer = null;
  render() {
    const { isLoading, error } = this.props;
    return (
      <div>
        {
          !!isLoading &&
            <Wrapper>
              <ImgWrapper positionY={-(this.state.positionY % 7) * 2.5} />
              <Svg xmlns="http://www.w3.org/2000/svg" version="1.1">
                <ellipse cx="26" cy="10" rx="26" ry="10" fill="#ddd " stroke="none" />
              </Svg>
            </Wrapper>
        }
        {
          !!error && <div>Sorry, there was a problem loading the page.</div>
        }
        {
          !!isLoading && !!error && null
        }
      </div>
    );
  }
}

MyLoadingComponent.propTypes = {
  isLoading: PropTypes.bool,
  error: PropTypes.string
};

export default hot(module)(MyLoadingComponent);
