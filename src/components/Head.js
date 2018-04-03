/* 头部组件 */
import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';


class Head extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      name: 'eles'
    };
    this.goBack = this.goBack.bind(this);
  }
  goBack() {
    const { history: { goBack } } = this.props;
    goBack();
  }
  render() {
    const { title, search, address } = this.props;
    const { name } = this.state;
    return (
      <header id="head-top">
        {
          title &&
          <section className="head-back" role="button" tabIndex="0" onClick={this.goBack} >
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" version="1.1">
              <polyline points="12,18 4,9 12,0" fill={'none'} stroke={'#fff'} strokeWidth={2} />
            </svg>
          </section>
        }
        {
          search &&
          <section className="head-back head-search" role="button" tabIndex="0" onClick={this.goBack} >
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" version="1.1">
              <circle cx={8} cy={8} r={7} stroke={'rgb(255,255,255)'} strokeWidth={1} fill={'none'} />
              <line x1="14" y1="14" x2="20" y2="20" strokeWidth={2} stroke={'rgb(255,255,255)'} />
            </svg>
          </section>
        }
        {
          !title && !search &&
            <span className="head-logo">{name}</span>
        }
        <Link to={`${title ? '/home' : '/login'}`} className="head-login">
          <span className="login-span">{title ? '切换城市' : '登录|注册'}</span>
        </Link>
        {
          address &&
          <Link to={`${address && '/home'}`} className="head-title">
            <span className="title-text">{address}</span>
          </Link>
        }
      </header>
    );
  }
}

Head.propTypes = {
  title: PropTypes.string,
  address: PropTypes.string,
  search: PropTypes.bool,
  history: PropTypes.shape({
    goBack: PropTypes.func
  }),
};

export default Head;
