import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import PropTypes from 'prop-types';
// import Animated from 'animated/lib/targets/react-dom';
import styled from 'styled-components';
import MyLoadingComponent from '../components/Loading';
import Tap from '../components/Tap';
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
  display: flex;
  justify-content: space-around;
  background-color: #fff;
  border-bottom: 1px solid #eee;
`;
const TapWrapper = styled.div`
  flex: 1;
  text-align: center;
  font-size: 0.573333rem;
  line-height: 2rem;
  .activeTap {
    font-weight: 700;
    color: #333;
    &::after {
      content: '';
      height: 0.08rem;
      background-color: #2395ff;
      display: inline-flex;
    }
  }
  span {
    position: relative;
    display: inline-flex;
    flex-direction: column;
    color: #666;
    font-size: 0.6rem;
  }
`;

const FoodContainer = styled.section`
  display: flex;
  position: relative;
  background-color: #fff;
  margin-bottom: 2rem;
`;

const FoodMenus = styled.section`
  display: flex;
  position: relative;
`;
const Foodsidebar = styled.section`
  width: 3.2rem;
  font-size: 0.5rem;
  .menuCategory {
    background: #f8f8f8;
  }
  .menucategory-Icon {
    width: 0.55rem;
    height: 0.55rem;
    vertical-align: middle;
    margin-right: 0.1rem;
  }
  li {
    padding: 0.7rem 0.3rem;
    border-bottom: 1px solid #e8e8e8;
  }
  span {
    color: #666;
  }
`;

const FoodMain = styled.section`
  background: #fff;
  width: 12.3rem;
  margin-left: 0.5rem;
  .categoryTitle {
    display: flex;
    padding: 0.2rem 0.8rem 0.2rem 0;
    border-bottom: 1px solid #fbfbfb;
    font-size: 0.5rem;
    span {
      transform: scale(0.95);
      color: #999;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    strong {
      color: #666;
    }
  }
`;

const FoodDetail = styled.main`
  position: relative;
  padding: 0.4rem 0;
  min-height: 4rem;
  display: flex;
  align-items: center;
  .categoryMain {
    display: flex;
    img {
      width: 3.25rem;
      height: 3.25rem;
    }
  }
  .categoryDetail {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex: auto;
    padding-right: 1rem;
    margin-left: 0.4rem;
    font-size: 0.5rem;
    p{
      margin: .15rem 0;
      display:inline-flex;
      span{
        transform: scale(.95);
        transform-origin: 0% 0%;
      }
    }
  }
  .foodName{
    font-weight: 700;
    font-size: .65rem;
    word-break: break-word;
    line-height: .8rem;
    overflow: hidden;
  }
  .foodSec{
    small{
      color:#999;
      transform: scale(.8);
      transform-origin: 0% 0%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
`;

class Shop extends Component {
  state = {
    index: 0
  };
  componentDidMount() {
    console.log('shop componentDidMount');
  }
  loading = null;
  handleBack = () => {
    const {
      history: { goBack }
    } = this.props;
    goBack();
  };
  handleChangeType = (index) => {
    this.setState({
      index
    });
  };
  render() {
    const name = ['点餐', '点评', '商家'];
    const { index } = this.state;
    const childen = [];
    for (let i = 0; i < name.length; i += 1) {
      childen.push(
        <TapWrapper key={i}>
          <Tap
            onChangeType={this.handleChangeType}
            index={i}
            name={name[i]}
            isActive={index}
          />
        </TapWrapper>
      );
    }
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
        <ShopTap>{childen}</ShopTap>
        <FoodContainer>
          <FoodMenus>
            <Foodsidebar>
              <ul className="menuCategory">
                <li>
                  <img
                    className="menucategory-Icon"
                    src="https://fuss10.elemecdn.com/0/6a/05b267f338acfeb8bd682d16e836dpng.png?imageMogr/format/webp/thumbnail/26x/"
                    alt="hotSale"
                  />
                  <span>热销</span>
                </li>
                <li>
                  <img
                    className="menucategory-Icon"
                    src="https://fuss10.elemecdn.com/b/91/8cf4f67e0e8223931cd595dc932fepng.png?imageMogr/format/webp/thumbnail/26x/"
                    alt="hotSale"
                  />
                  <span>优惠</span>
                </li>
                <li>
                  <span>鲜果切</span>
                </li>
                <li>
                  <span>缤纷果盘</span>
                </li>
                <li>
                  <span>女王臻品</span>
                </li>
                <li>
                  <span>阳光橙堡</span>
                </li>
                <li>
                  <span>全国严选</span>
                </li>
                <li>
                  <span>全球臻选</span>
                </li>
                <li>
                  <span>能量坚果</span>
                </li>
                <li>
                  <span>零食饮料</span>
                </li>
                <li>
                  <span>售后服务</span>
                </li>
                <li>
                  <span>YES礼盒</span>
                </li>
              </ul>
            </Foodsidebar>
            <FoodMain>
              <header className="categoryTitle">
                <strong>热销</strong>
                <span>大家喜欢吃，才叫真好吃。</span>
              </header>
              <FoodDetail>
                <div className="categoryMain">
                  <section>
                    <img
                      alt="【B级】超甜蕉1份不小于500g"
                      title="【B级】超甜蕉1份不小于500g"
                      src="https://fuss10.elemecdn.com/2/b4/c303f00115ccab4332c060b2a7cabjpeg.jpeg?imageMogr/format/webp/thumbnail/!140x140r/gravity/Center/crop/140x140/"
                    />
                  </section>
                  <section className="categoryDetail">
                    <p className="foodName">【B级】超甜蕉1份不小于500g</p>
                    <p className="foodSec">
                      <small>1斤香蕉大概2-4根</small>
                    </p>
                    <p>
                      <span>月售55份</span>
                      <span>好评率100%</span>
                    </p>
                    <p>
                      <strong>9.99</strong>
                    </p>
                  </section>
                </div>
              </FoodDetail>
            </FoodMain>
          </FoodMenus>
        </FoodContainer>
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
