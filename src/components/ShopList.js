import React, { Component } from 'react';
import PropTypes from 'prop-types';
import immutable from 'immutable';
import { connect } from 'react-redux';
import RateStar from './RateStar';
import { fetchShopList } from '../actions/action';
import { parseUrl } from '../utils/mutils';

class ShopList extends Component {
  componentWillMount() {
    const { location: { search } } = this.props;
    const paramUrl = parseUrl(search);
    const address = paramUrl.geohash.split(',');
    this.latitude = address[0];
    this.longitude = address[1];
    console.log(address);
  }
  componentDidMount() {
    console.log('shopList componentDidMount');
    this.props.fetchShopList(
      this.latitude,
      this.longitude,
      this.offset,
      this.restaurantCategoryId
    );
  }
  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      const { shopList, location: { search } } = nextProps;
      console.log(shopList);
      console.log(search);
    }
  }
  offset = 0;
  latitude = '';
  longitude = '';
  restaurantCategoryId = '';
  imgBaseUrl = 'http://cangdu.org:8001/img/';
  render() {
    const { shopList } = this.props;
    return (
      <div className="shoplist-container">
        <ul>
          {shopList.size &&
            shopList.toArray().map(shop => (
              <li className="shop-list" key={shop.id}>
                <section>
                  <img src={this.imgBaseUrl + shop.image_path} alt={shop.name} className="shop-img" />
                </section>
                <hgroup className="shop-info">
                  <header className="shop-detail-head">
                    <h4 className="shop-title">{shop.name}</h4>
                    <ul>
                      {
                        shop.supports.map(support => <li key={support.id}>{support.icon_name}</li>)
                      }
                    </ul>
                  </header>
                  <section className="shop-rating">
                    <section className="rate-left">
                      <RateStar active rating={shop.rating} />
                      <RateStar />
                      <span className="rating-num">{shop.rating}</span>
                      <section className="shop-mmouth-order">月售{shop.recent_order_num}单</section>
                    </section>
                    <section className="rate-right">
                      {
                        shop.delivery_mode && <span> {shop.delivery_mode.text }</span>
                      }
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
              </li>
            ))}
        </ul>
      </div>
    );
  }
}

ShopList.propTypes = {
  shopList: PropTypes.instanceOf(immutable.Iterable),
  fetchShopList: PropTypes.func.isRequired,
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
  fetchShopList
})(ShopList);
