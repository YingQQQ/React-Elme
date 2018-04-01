import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { hot } from 'react-hot-loader';
import activeImg from '../style/images/activity.png';
import RateStar from './RateStar';

class ShopList extends Component {
  componentDidMount() {
    console.log('shopList componentDidMount');
  }
  render() {
    return (
      <div className="shoplist-container">
        <ul>
          <li className="shop-list">
            <section>
              <img src={activeImg} alt="" className="shop-img" />
            </section>
            <hgroup className="shop-info">
              <header className="shop-detail-head">
                <h4 className="shop-title">效果演示</h4>
                <ul>
                  <li>保</li>
                  <li>准</li>
                  <li>票</li>
                </ul>
              </header>
              <section className="shop-rating">
                <section className="rate-left">
                  <RateStar active rating={4.7} />
                  <RateStar />
                  <span className="rating-num">4.7</span>
                  <section className="shop-mmouth-order">
                    月售911单
                  </section>
                </section>
                <section className="rate-right">
                  <span>蜂鸟配送</span>
                  <span>准时达</span>
                </section>
              </section>
              <section className="shop-rating">
                <section className="rate-left">
                  <section className="rate-icon">
                    <svg className="orange-fill">
                      <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="#star" />
                    </svg>
                  </section>
                  <section>
                    月售911单
                  </section>
                </section>
                <section className="rate-right">
                  <span>蜂鸟配送</span>
                  <span>准时达</span>
                </section>
              </section>
            </hgroup>
          </li>
        </ul>
      </div>
    );
  }
}

ShopList.propTypes = {

};


export default hot(module)(ShopList);
