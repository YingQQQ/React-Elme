import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { hot } from 'react-hot-loader';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import immutable, { List } from 'immutable';
import Head from '../components/Head';
import Svg from '../components/Svg';
import Swiper from '../components/Swiper';
import Pagination from '../components/Pagination';
import ShopList from '../components/ShopList';
import Footer from '../components/Footer';

import { fetchMsiteAddress, fetchFoodTypes, dispatchGeohash } from '../actions/action';

class Msite extends Component {
  static getCategoryId(url) {
    const urlData = decodeURIComponent(
      url.split('=')[1].replace('&target_name', '')
    );
    if (/restaurant_category_id/gi.test(urlData)) {
      return JSON.parse(urlData).restaurant_category_id.id;
    }
    return '';
  }
  state = {
    index: 0
  };
  componentDidMount() {
    const { location: { search } } = this.props;
    this.geohash = search.split('=')[1];
    this.props.dispatchGeohash(this.geohash);
    this.props.fetchMsiteAddress(this.geohash);
    this.props.fetchFoodTypes(this.geohash);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      const { msiteAddress, foodTypes } = nextProps;
      this.RECORD_ADDRESS = msiteAddress.toObject();
      this.msiteTitle = this.RECORD_ADDRESS.name;
      let foodArray = List([]);
      foodArray = foodArray.push(
        foodTypes.slice(0, 8),
        foodTypes.slice(8, foodTypes.size)
      );
      this.foodArray = foodArray;
    }
  }

  handleChangeIndex = (index) => {
    this.setState({
      index
    });
  };

  msiteTitle = null;
  geohash = null;
  RECORD_ADDRESS = null;
  foodArray = null;
  imageUrl = 'https://fuss10.elemecdn.com';
  render() {
    const { index } = this.state;
    const swpieContainer = {
      position: 'relative'
    };
    return (
      <div>
        <Svg />
        <Head search address={this.msiteTitle} needLogin />
        <div style={swpieContainer}>
          <Swiper
            className="msite-container"
            index={index}
            onChangeIndex={this.handleChangeIndex}
          >
            <div className="food-type-container">
              {this.foodArray &&
                this.foodArray
                  .get(0)
                  .toArray()
                  .map(type => (
                    <Link
                      to={{
                        pathname: '/food',
                        query: {
                          geohash: this.geohash,
                          title: type.title,
                          restaurant_category_id: Msite.getCategoryId(
                            type.link
                          )
                        }
                      }}
                      key={`foodtype_${type.title}`}
                      className="link-foodtype"
                    >
                      <figure>
                        <img
                          src={`${this.imageUrl + type.image_url}`}
                          alt={type.title}
                        />
                        <figcaption>{type.title}</figcaption>
                      </figure>
                    </Link>
                  ))}
            </div>
            <div className="food-type-container">
              {this.foodArray &&
                this.foodArray
                  .get(1)
                  .toArray()
                  .map(type => (
                    <Link
                      to="/home"
                      key={`foodtype_${type.title}`}
                      className="link-foodtype"
                    >
                      <figure>
                        <img
                          src={`${this.imageUrl + type.image_url}`}
                          alt={type.title}
                        />
                        <figcaption>{type.title}</figcaption>
                      </figure>
                    </Link>
                  ))}
            </div>
          </Swiper>
          <Pagination
            index={index}
            dots={2}
            onChangeIndex={this.handleChangeIndex}
          />
        </div>
        <div className="shop-list-container">
          <header className="shop-header">
            <svg className="shop-icon">
              <use
                xmlnsXlink="http://www.w3.org/1999/xlink"
                xlinkHref="#shop"
              />
            </svg>
            <span className="shop-header-title">附近商家</span>
          </header>
          <ShopList location={this.props.location} />
        </div>
        <Footer location={this.props.location} geohash={this.props.geohash} />
      </div>
    );
  }
}
Msite.propTypes = {
  location: PropTypes.shape({
    hash: PropTypes.string,
    key: PropTypes.string,
    pathname: PropTypes.string,
    search: PropTypes.string
  }).isRequired,
  fetchMsiteAddress: PropTypes.func.isRequired,
  fetchFoodTypes: PropTypes.func.isRequired,
  msiteAddress: PropTypes.instanceOf(immutable.Map),
  foodTypes: PropTypes.instanceOf(immutable.Iterable),
  dispatchGeohash: PropTypes.func.isRequired,
  geohash: PropTypes.string
};

const mapStateToProps = state => ({
  msiteAddress: state.getIn(['msiteAddress']),
  foodTypes: state.getIn(['foodTypes']),
  geohash: state.getIn(['saveGeohash'])
});

export default hot(module)(
  connect(mapStateToProps, {
    fetchMsiteAddress,
    fetchFoodTypes,
    dispatchGeohash
  })(Msite)
);
