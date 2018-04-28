import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import immutable from 'immutable';
import Animated from 'animated/lib/targets/react-dom';
import Easing from 'animated/lib/Easing';
import styled from 'styled-components';
import MyLoadingComponent from '../components/Loading';
import SVG from '../components/Svg';
import BuyCart from '../components/BuyCart';
import Tap from '../components/Tap';
import svg from '../style/images/shop_back_svg.svg';
import { getParameter, getImgPath } from '../utils/mutils';
import { dispatchGeohash, fetchMsiteAddress, fetchShopDetails, fetchFoodMenu, fetchfoodRatingList, fetchRatingScores, fetchRatingTags } from '../actions/action';

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
    text-overflow: ellipsis;
    overflow: hidden;
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
  flex-direction: column;
  align-items: center;
  .categoryMain {
    display: flex;
    padding-bottom: .6rem;
    img {
      width: 3.25rem;
      height: 3.25rem;
    }
  }
  .categoryDetail {
    position:relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex: auto;
    padding-right: 1rem;
    margin-left: 0.4rem;
    font-size: 0.5rem;
    p {
      padding: 0.1rem 0 0 0;
      display: inline-flex;
      span {
        transform: scale(0.95);
        transform-origin: 0% 0%;
      }
    }
    .foodPrice {
      font-weight: 700;
      color: #f60;
      font-size: 0.68rem;
      &::before {
        content: '\\A5';
        font-weight: 400;
        margin-right: 0.05rem;
        font-size: 0.5rem;
      }
    }
    .foodOldPrice {
      font-size: 0.5rem;
      display: inline-flex;
      transform: scale(0.8);
      transform-origin: 50% 50%;
      align-items: center;
    }
  }
  .foodName {
    font-weight: 700;
    font-size: 0.65rem;
    word-break: break-word;
    line-height: 0.8rem;
    overflow: hidden;
  }
  .foodSec {
    small {
      color: #999;
      transform: scale(0.8);
      transform-origin: 0% 0%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
`;

const ShopFooter = styled.footer`
  position:fixed;
  bottom:0;
  left:0;
  right:0;
  height:2.8rem;
  background-color:rgba(61,61,63,.9);
  color:#fff;
  z-index: 2;
`;
const DiscounTip = styled.section`
  height:.7rem;
  background-color:#fffad6;
  color:#fff;
  font-size:.5rem;
  p{
    text-align: center;
    transform: scale(.9);
  }
`;
const CartFooter = styled.section`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 2.3rem;
  padding-left: 3.5rem;
  color: #fff;
  font-size: 0.5rem;
  .cartContainer {
    display: flex;
    position: absolute;
    left: .5rem;
    top: -.7rem;
    padding: .4rem;
    border-radius:50%;
    background-color: #3190e8;
    border:0.18rem solid #444;
  }
  .cartList{
    position: absolute;
    top: -.15rem;
    right: -.25rem;
    min-width: .65rem;
    background-image: linear-gradient(-90deg,#ff7416,#ff3c15 98%);
    border-radius: 50%;
    color: #fff;
    height: .65rem;
    display: inline-flex;
    justify-content: center;
    align-items: center;
  }
  .cart_icon {
    width: 1rem;
    height: 1rem;
  }
  .cartInfo{
    display:flex;
    flex-direction:column;
  }
  .cartInfo span{
    font-size:.75rem;
    color:#fff;
  }
  .cartInfo small{
    transform:scale(.87);
    transform-origin: 0% 0%;
    color: #999;
  }
  .submitBtn{
    background-color: #4cd964;
    color: #fff;
    height: 100%;
    width: 4.5rem;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: .65rem;
    line-height: 1rem;
    user-select: none;
    span{
      color:#fff;
      font-weight:700;
    }
  }
`;

// const BtnPlus = styled.span`
//   position: fixed;
//   bottom: 30px;
//   left: 30px;
//   svg{
//     width: 0.9rem;
//     height: 0.9rem;
//     fill: #3190e8;
//   }
// `;

class Shop extends Component {
  state = {
    index: 0,
    anim: new Animated.Value(0),
    animChildren: new Animated.Value(0),
  };
  componentWillMount() {
    const { location: { search } } = this.props;
    this.shopId = getParameter(search, 'id');
    this.windowHeight = window.innerHeight;
  }
  componentDidMount() {
    const { location: { search } } = this.props;
    if (!this.props.geohash) {
      console.log('no geohash');
      const geohash = getParameter(search, 'geohash');
      this.props.fetchMsiteAddress(geohash);
    }
    console.log('componentDidMount');
    this.props.fetchFoodMenu(this.shopId);
    this.props.fetchfoodRatingList(this.shopId, this.ratingOffset);
    this.props.fetchRatingScores(this.shopId);
    this.props.fetchRatingTags(this.shopId);
  }
  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      // , shopDetails, foodMenu, foodRatingList
      const { msiteAddress } = nextProps;
      if (msiteAddress.size && !(this.latitude && this.longitude)) {
        this.latitude = msiteAddress.get('latitude');
        this.longitude = msiteAddress.get('longitude');
        console.log(this.latitude, this.longitude);
        this.props.fetchShopDetails(this.shopId, this.latitude, this.longitude);
      }
    }
  }
  loading = null;
  shopId = null;
  latitude = null;
  longitude = null;
  ratingOffset = 0;
  windowHeight = null;
  showMoveDot = [];// 控制下落的小圆点显示隐藏
  elLeft =0; // 当前点击加按钮在网页中的绝对top值
  elBottom = 0; // 当前点击加按钮在网页中的绝对left值
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
  handleMoveDotFun = (showMoveDot, elLeft, elBottom) => {
    this.showMoveDot = [...this.showMoveDot, ...showMoveDot];
    this.elLeft = elLeft;
    this.elBottom = elBottom;
    console.log(`elLfet${elLeft};elbottom${elBottom};`);
    console.log((37 + this.elBottom) - this.windowHeight);
    this.animate();
  }
  animate = () => {
    this.state.anim.setValue(0);
    this.state.animChildren.setValue(0);
    Animated.sequence([
      Animated.parallel(
        [
          Animated.timing(this.state.anim, {
            toValue: 1,
            duration: 1000,
            easing: Easing.elastic(1)
          }),
          Animated.timing(this.state.animChildren, {
            toValue: 1,
            duration: 1000,
            easing: Easing.elastic(1)
          }),
        ]
      ),
      Animated.stagger(
        100,
        [
          Animated.timing(this.state.anim, {
            toValue: 0,
            duration: 10,
            easing: Easing.elastic(1)
          }),
          Animated.timing(this.state.animChildren, {
            toValue: 0,
            duration: 10,
            easing: Easing.elastic(1)
          }),
        ]
      ),
    ]).start();
    // Animated.parallel([
    //   Animated.timing(this.state.anim, {
    //     toValue: 1,
    //     duration: 1000,
    //     easing: Easing.elastic(1)
    //   }),
    //   Animated.timing(this.state.animChildren, {
    //     toValue: 1,
    //     duration: 1000,
    //     easing: Easing.elastic(1)
    //   }),
    // ]).start();
    // Animated.timing(this.state.anim, {
    //   toValue: 1,
    //   duration: 1000,
    //   easing: Easing.elastic(1)
    // }).start();
  }
  render() {
    const name = ['点餐', '点评', '商家'];
    const { index } = this.state;
    const { foodMenu } = this.props;
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
    const styles = {
      opacity: Animated.template`${this.state.anim}`,
      transform: Animated.template`translate3d(0, ${this.state.anim.interpolate({
        inputRange: [0, 1],
        outputRange: ['-700px', '-800px']
      })},0)`
    };
    const innerStyles = {
      position: 'fixed',
      // bottom: '30px',
      // left: '30px',
      transform: Animated.template`translate3d(${this.state.animChildren.interpolate({
        inputRange: [0, 1],
        outputRange: ['100px', '300px']
      })}, 0, 0)`
    };
    return (
      <div>
        <SVG />
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
                {
                  !!foodMenu.size && foodMenu.toArray().map(food => (
                    <li key={food.id}>
                      {
                        food.icon_url &&
                        <img
                          className="menucategory-Icon"
                          src={getImgPath(food.icon_url)}
                          alt="hotSale"
                        />
                      }
                      <span>{food.name}</span>
                    </li>
                  ))
                }
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
                      <strong className="foodPrice">9.99</strong>
                      <del className="foodOldPrice">19.99</del>
                    </p>
                    <BuyCart showMoveDotFun={this.handleMoveDotFun} />
                  </section>
                </div>
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
                      <strong className="foodPrice">9.99</strong>
                      <del className="foodOldPrice">19.99</del>
                    </p>
                    <BuyCart showMoveDotFun={this.handleMoveDotFun} />
                  </section>
                </div>
              </FoodDetail>
            </FoodMain>
          </FoodMenus>
        </FoodContainer>
        <ShopFooter>
          <DiscounTip>
            <p>满49减20，满69减30</p>
          </DiscounTip>
          <CartFooter>
            <div className="cartContainer">
              <span className="cartList">4</span>
              <svg className="cart_icon">
                <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="#cart-icon" />
              </svg>
            </div>
            <div className="cartInfo">
              <p>
                <span>¥20.9</span>
              </p>
              <small>配送费¥2</small>
            </div>
            <a role="button" className="submitBtn">
              <span>去结算</span>
            </a>
          </CartFooter>
        </ShopFooter>
        <Animated.div style={styles}>
          <Animated.div style={Object.assign({}, innerStyles)}>
            <svg width=".9rem" height=".9rem" fill="#3190e8">
              <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="#cart-add" />
            </svg>
          </Animated.div>
        </Animated.div>
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
  }).isRequired,
  geohash: PropTypes.string,
  location: PropTypes.shape({
    hash: PropTypes.string,
    key: PropTypes.string,
    pathname: PropTypes.string,
    search: PropTypes.string
  }).isRequired,
  fetchMsiteAddress: PropTypes.func.isRequired,
  fetchShopDetails: PropTypes.func.isRequired,
  fetchFoodMenu: PropTypes.func.isRequired,
  fetchfoodRatingList: PropTypes.func.isRequired,
  fetchRatingScores: PropTypes.func.isRequired,
  fetchRatingTags: PropTypes.func.isRequired,
  msiteAddress: PropTypes.instanceOf(immutable.Map),
  // shopDetails: PropTypes.instanceOf(immutable.Map),
  foodMenu: PropTypes.instanceOf(immutable.Iterable),
  // foodRatingList: PropTypes.instanceOf(immutable.Iterable),
  // ratingScores: PropTypes.instanceOf(immutable.Iterable),
  // ratingTags: PropTypes.instanceOf(immutable.Iterable),
};

const mapStateToProps = state => ({
  geohash: state.getIn(['saveGeohash']),
  msiteAddress: state.getIn(['msiteAddress']),
  shopDetails: state.getIn(['shopDetails']),
  foodMenu: state.getIn(['foodMenu']),
  foodRatingList: state.getIn(['foodRatingList']),
  ratingScores: state.getIn(['ratingScores']),
  ratingTags: state.getIn(['ratingTags']),
});

export default hot(module)(
  connect(mapStateToProps, {
    dispatchGeohash,
    fetchMsiteAddress,
    fetchShopDetails,
    fetchFoodMenu,
    fetchfoodRatingList,
    fetchRatingScores,
    fetchRatingTags
  })(Shop)
);
