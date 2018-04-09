/* 页脚组件 */
import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  getGeohash
} from '../actions/action';

const Footer = ({ location, geohash }) => {
  const paths = [
    {
      pathname: 'msite',
      name: '外卖'
    },
    {
      pathname: 'find',
      name: '搜索'
    },
    {
      pathname: 'orders',
      name: '订单'
    },
    {
      pathname: 'profile',
      name: '我的'
    }
  ];
  return (
    <section className="footerContainer">
      {paths.map(child => (
        <section key={child.pathname}>
          <Link
            to={
              child.pathname === 'msite'
                ? child.pathname + geohash
                : child.pathname
            }
            className="footerItem"
          >
            <svg className="iconStyle">
              <use
                xmlnsXlink="http://www.w3.org/1999/xlink"
                xlinkHref={
                  location.pathname.indexOf(child.pathname) > -1
                    ? `#${child.pathname}Active`
                    : `#${child.pathname}`
                }
              />
            </svg>
            <span>{child.name}</span>
          </Link>
        </section>
      ))}
    </section>
  );
};

Footer.propTypes = {
  location: PropTypes.shape({
    hash: PropTypes.string,
    key: PropTypes.string,
    pathname: PropTypes.string,
    search: PropTypes.string
  }).isRequired,
  geohash: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  geohash: state.getIn(['saveGeohash'])
});


export default connect(mapStateToProps, {
  getGeohash
})(Footer);
