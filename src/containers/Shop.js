import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import PropTypes from 'prop-types';
// import Animated from 'animated/lib/targets/react-dom';
import styled from 'styled-components';
import MyLoadingComponent from '../components/Loading';
import svg from '../style/images/shop_back_svg.svg';
// const Button = props => <div {...props} />;

const Wrapper = styled.section`
  margin-top: 2rem;
`;

const ImgWrapper = styled.section`
  position: fixed;
  width: 100%;
  height: 100%;
  img {
    width: 100%;
    height: 100%;
  }
`;

const ShopHeader = styled.header`
  background-color: #fff;
  color: #333;
  font-size: 0.2932rem;
  padding-bottom: 0.2133rem;
`;

const HeadNav = styled.nav`
  position: relative;
  height: 3rem;
  background-image: url('https://fuss10.elemecdn.com/5/25/354fa2846681f94ab7175ed042203png.png?imageMogr/format/webp/thumbnail/!40p/blur/50x40/');
  background-size: cover;
  background-repeat: no-repeat;
  padding: 0.1rem 0.3rem;
  svg {
    position: absolute;
    width: 1rem;
    height: 36%;
    padding-top: 0.5rem;
  }
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(119, 103, 137, 0.43);
  }
`;

const ShopHeadFigure = styled.figure`
  display: flex;
  justify-content: center
  position: relative;
  padding: 1.5rem .75rem 0;
  img{
    position: absolute;
    left: 50%;
    right: 50%;
    top: -.5rem;
    transform: translate(-50%, -50%);
    height:3rem;
    width:3rem;
  }
  .shopThanks{
    text-align: center;
    font-size: .5rem;
    margin-top:.25rem;
    color:#999;
    overflow:hidden;
    text-overflow: ellipsis;
  }
`;
const ShopTitle = styled.h2`
  display: flex;
  align-items: center;
  position: relative;
  font-size: 0.85rem;
  color: #333;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  span:nth-of-type(1) {
    background-image: linear-gradient(0, #fff100, #ffe339);
    font-size: 0.55rem;
    padding: 0.01rem 0.1rem;
    margin-right: 0.1rem;
    color: #6a3709;
    transform: scale(0.9);
  }
  span {
    font-weight: 700;
  }
  .right-arrow {
    position: relative;
    width: 0.5rem;
    height: 0.35rem;
    margin-left: 0.15rem;
    &::after {
      content: '';
      position: absolute;
      border-style: solid;
      border-width: 0.246667rem;
      border-color: transparent transparent transparent rgba(0, 0, 0, 0.67);
    }
  }
`;

const ShopInfo = styled.div`
  margin-top: 0.25rem;
  font-size: 0.5rem;
  span {
    display: inline-flex;
    margin-left: 0.1rem;
    transform: scale(0.9);
  }
`;
const ShopDiscount = styled.div`
  display: flex;
  justify-content: space-around;
  border: 1px solid #f7f6f6;
  border-radius: 1px;
  margin: 0.45rem 1.5rem 0;
  padding: 1px 0.1rem;
  div {
    display: flex;
    align-items: center;
    transform: scale(0.98);
  }
  span {
    display: inline-flex;
    margin-left: 0.1rem;
    color: #666;
  }
  .newWord {
    position: relative;
    width: auto;
    height: auto;
    background-color: rgb(112, 188, 70);
    color: #fff;
    padding: 0.1rem;
    transform: scale(0.9);
    &::after {
      content: '首';
    }
  }
`;

const ShopTap = styled.section`
  display:flex;
  justify-content: space-around;
  background-color: #fff;
  border-bottom: 1px solid #eee;
`;
const Tap = styled.div`
  flex:1;
  text-align: center;
  font-size: .573333rem;
  line-height:2rem;
  .activeTap{
    &::after{
      content: '';
      height: .08rem;
      background-color: #2395ff;
      display: inline-flex;
    }
  }
  span{
    position: relative;
    display:inline-flex;
    flex-direction:column;
    color:#666;
    font-size: .6rem;
  }
`;

class Shop extends Component {
  componentDidMount() {
    console.log('shop componentDidMount');
  }
  loading = null;
  shopTap = 'food';
  handleBack = () => {
    const {
      history: { goBack }
    } = this.props;
    goBack();
  };
  activeTap = () => {
    console.log('1');
  };
  render() {
    return (
      <div>
        <ShopHeader>
          <HeadNav>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              version="1.1"
              onTouchTap={this.handleBack}
            >
              <polyline
                points="12,18 4,9 12,0"
                fill="none"
                stroke={'#fff'}
                strokeWidth="3"
              />
            </svg>
          </HeadNav>
          <ShopHeadFigure>
            <img
              src="https://fuss10.elemecdn.com/5/25/354fa2846681f94ab7175ed042203png.png?imageMogr/format/webp/thumbnail/!130x130r/gravity/Center/crop/130x130/"
              alt="叶氏水果"
            />
            <figcaption>
              <ShopTitle>
                <span>品牌</span>
                <span>叶氏水果(杭州国货店)</span>
                <i className="right-arrow" />
              </ShopTitle>
              <ShopInfo>
                <span>5</span>
                <span>月销售205单</span>
                <span>蜂鸟转送</span>
                <span>约22分钟</span>
                <span>距离918m</span>
              </ShopInfo>
              <p className="shopThanks">
                欢迎光临，用餐高峰期请提前下单，谢谢。
              </p>
            </figcaption>
          </ShopHeadFigure>
          <ShopDiscount>
            <div>
              <span className="newWord" />
              <span>新用户下单立减元20元(不与其他活动同享)</span>
            </div>
            <div>
              <span>6个优惠</span>
              <span />
            </div>
          </ShopDiscount>
        </ShopHeader>
        <ShopTap>
          <Tap>
            <span onTouchTap={this.activeTap} className={this.shopTap === 'food' && 'activeTap'}>点餐</span>
          </Tap>
          <Tap>
            <span onTouchTap={this.activeTap}>评价</span>
          </Tap>
          <Tap>
            <span onTouchTap={this.activeTap}>商家</span>
          </Tap>
        </ShopTap>
        <Wrapper />
        {this.loading && (
          <div>
            <MyLoadingComponent isLoading />
            <ImgWrapper>
              <img src={svg} alt="svg" />
            </ImgWrapper>
          </div>
        )}
      </div>
    );
  }
}

Shop.propTypes = {
  history: PropTypes.shape({
    goBack: PropTypes.func
  }).isRequired
};

export default hot(module)(Shop);
