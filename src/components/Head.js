/* 头部组件 */
import React, { PureComponent } from 'react';
import { hot } from 'react-hot-loader';
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
    const { title } = this.props;
    const { name } = this.state;
    return (
      <header id="head-top">
        {
          title ?
            <div>
              <section className="head-back" role="button" tabIndex="0" onClick={this.goBack} >
                <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" version="1.1">
                  <polyline points="12,18 4,9 12,0" fill={'none'} stroke={'#fff'} strokeWidth={2} />
                </svg>
              </section>
              <section className="head-title">
                <span className="title-text">
                  {title}
                </span>
              </section>
              <Link to="/home" className="head-login">
                <span className="login-span">切换城市</span>
              </Link>
            </div> :
            <div>
              <span className="head-logo">{name}</span>
              <Link to="/page1" className="head-login">
                <span className="login-span">登录|注册</span>
              </Link>
            </div>
        }
      </header>
    );
  }
}

Head.propTypes = {
  title: PropTypes.string,
  history: PropTypes.shape({
    goBack: PropTypes.func
  }),
};

export default hot(module)(Head);
