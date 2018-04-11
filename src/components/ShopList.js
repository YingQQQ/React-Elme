import React, { Component } from 'react';
import PropTypes from 'prop-types';
import immutable from 'immutable';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import RateStar from './RateStar';
import { fetchShopList, fetchLoadMore } from '../actions/action';
import { parseUrl } from '../utils/mutils';
import imgBaseUrl from '../utils/config';
import { listen } from '../utils/dom-helpers/events';
import { getStyle } from '../utils/mutils';

class ShopList extends Component {
  componentWillMount() {
    const { location: { search } } = this.props;
    const paramUrl = parseUrl(search);
    const address = paramUrl.geohash.split(',');
    this.latitude = address[0];
    this.longitude = address[1];
  }
  componentDidMount() {
    this.props.fetchShopList(
      this.latitude,
      this.longitude,
      this.offset,
      this.restaurantCategoryId
    );
    this.windowHeight = window.screen.height;
    this.paddingBottom = getStyle(this.rootNood, 'paddingBottom');
    this.marginBottom = getStyle(this.rootNood, 'marginBottom');
    this.offsetTop = this.rootNood.offsetTop;
    this.touchMoveListener = listen(this.rootNood, 'touchmove', (event) => {
      this.handleTouchMove(event);
    }, {
      passive: false
    });
  }
  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      const { shopList } = nextProps;
      if (shopList.size % 10 !== 0) {
        this.isEnd = true;
      }
    }
  }
  componentWillUnmount() {
    this.touchMoveListener();
  }
  loadMore() {
    this.offset += 20;
    this.props.fetchLoadMore(
      this.latitude,
      this.longitude,
      this.offset,
      this.restaurantCategoryId
    );
  }
  handleTouchStart = (e) => {
    const touch = e.touches[0];
    this.startX = touch.pageX;
    this.startY = touch.pageY;
    this.heightEl = this.rootNood.clientHeight;
    this.started = true;
  };
  handleTouchMove = (e) => {
    if (!this.started) {
      this.handleTouchStart(e);
      return;
    }
    if (!this.rootNood) {
      return;
    }
    const touch = e.touches[0];
    if (this.isSwiping === undefined) {
      const dx = Math.abs(this.startX - touch.pageX);
      const dy = Math.abs(this.startY - touch.pageY);
      const isSwiping = dy > dx && dy > 3;
      if (dy > dx) {
        e.preventDefault();
      }
      if (isSwiping) {
        this.isSwiping = isSwiping;
        this.startX = touch.pageX;
        return;
      }
    }

    if (this.isSwiping !== true) {
      return;
    }
    if (
      document.documentElement.scrollTop + this.windowHeight >=
      this.heightEl + this.paddingBottom + this.marginBottom + this.offsetTop &&
      !this.preventRepeatReuqest && !this.isEnd
    ) {
      this.preventRepeatReuqest = true;
      this.loadMore();
    }
  };
  handleTouchEnd = () => {
    this.start = false;
    this.preventRepeatReuqest = false;
    this.oldScrollTop = document.documentElement.scrollTop;
    this.moveEnd();
  }
  moveEnd = () => {
    const requestFram = requestAnimationFrame(() => {
      if (document.documentElement.scrollTop !== this.oldScrollTop) {
        this.oldScrollTop = document.documentElement.scrollTop;
        this.moveEnd();
      } else {
        cancelAnimationFrame(requestFram);
      }
    });
  }
  offset = 20;
  latitude = '';
  longitude = '';
  restaurantCategoryId = '';
  start = false;
  startX = null;
  startY = null;
  isSwiping = undefined;
  windowHeight = null;
  heightEl = null;
  offsetTop = null;
  oldScrollTop = null;
  paddingBottom = null;
  marginBottom = null;
  preventRepeatReuqest = false;
  isEnd = false;
  render() {
    const { shopList, location: { search } } = this.props;
    const stylesLink = {
      display: 'flex',
      flex: 'auto'
    };
    const touchEvents = {
      onTouchStart: this.handleTouchStart,
      onTouchEnd: this.handleTouchEnd
    };

    return (
      <div
        className="shoplist-container"
        ref={(node) => {
          this.rootNood = node;
        }}
        {...touchEvents}
      >
        <ul>
          {!!shopList.size &&
            shopList.toArray().map(shop => (
              <li className="shop-list" key={shop.id}>
                <Link
                  to={{
                    pathname: '/shop',
                    search: `${search}&id=${shop.id}`
                  }}
                  style={stylesLink}
                >
                  <section>
                    <img
                      src={imgBaseUrl + shop.image_path}
                      alt={shop.name}
                      className="shop-img"
                    />
                  </section>
                  <hgroup className="shop-info">
                    <header className="shop-detail-head">
                      <h4 className="shop-title">{shop.name}</h4>
                      <ul>
                        {shop.supports.map(support => (
                          <li key={support.id}>{support.icon_name}</li>
                        ))}
                      </ul>
                    </header>
                    <section className="shop-rating">
                      <section className="rate-left">
                        <div className="rate-stars">
                          <RateStar rating={shop.rating} />
                        </div>
                        <span className="rating-num">{shop.rating}</span>
                        <section className="shop-mmouth-order">
                          月售{shop.recent_order_num}单
                        </section>
                      </section>
                      <section className="rate-right">
                        {shop.delivery_mode && (
                          <span> {shop.delivery_mode.text}</span>
                        )}
                        <span>准时达</span>
                      </section>
                    </section>
                    <section className="shop-distance">
                      <section className="distance-left">
                        <span>¥{shop.float_minimum_order_amount}起送</span>
                        <span>/</span>
                        <span>{shop.piecewise_agent_fee.tips}</span>
                      </section>
                      <section className="distance-right">
                        <span>{shop.distance}</span>
                        <span>/</span>
                        <span>{shop.order_lead_time}</span>
                      </section>
                    </section>
                  </hgroup>
                </Link>
              </li>
            ))}
          {
            this.isEnd && <p className="isEnd">没有更多商家</p>
          }
        </ul>
      </div>
    );
  }
}

ShopList.propTypes = {
  shopList: PropTypes.instanceOf(immutable.Iterable),
  fetchShopList: PropTypes.func.isRequired,
  fetchLoadMore: PropTypes.func,
  location: PropTypes.shape({
    hash: PropTypes.string,
    key: PropTypes.string,
    pathname: PropTypes.string,
    search: PropTypes.string
  }).isRequired
};

const mapStateToProps = state => ({
  shopList: state.getIn(['shopList'])
});

export default connect(mapStateToProps, {
  fetchShopList,
  fetchLoadMore
})(ShopList);
