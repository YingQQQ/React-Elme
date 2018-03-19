/* HomePage组件 */
import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import { Link } from 'react-router-dom';

class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'elem'
    };
  }
  render() {
    return (
      <header id="head-top">
        <span className="head-logo">{this.state.name}</span>
        <Link to="/login" className="head-login">
          <span className="login-span">登录|注册</span>
        </Link>
      </header>
    );
  }
}
export default hot(module)(Nav);
