/* 城市Pages */
import React, {
  Component
} from 'react';
import {
  hot
} from 'react-hot-loader';
import immutable, {
  is,
} from 'immutable';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Head from '../components/Head';
import {
  fetchCurrentCity
} from '../actions/action';


class City extends Component {
  state = {
    name: 'eles',
    currentCity: {}
  };
  componentDidMount() {
    const { dispatch } = this.props;
    const { id } = this.props.match.params;
    console.log('City componentDidMount');
    dispatch(fetchCurrentCity(id));
  }
  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      const { currentCity } = nextProps;
      if (currentCity && currentCity.getIn(['currentCitiyIsFetch'])) {
        console.log('City componentWillReceiveProps');
        const currentCityJS = currentCity.delete('groupCitiesIsFetch').toObject();
        this.setState({
          currentCity: currentCityJS
        });
      }
    }
  }
  shouldComponentUpdate(nextProps = {}, nextState = {}) {
    const thisProps = this.props || {};
    const thisState = this.state || {};

    if (Object.keys(thisProps).length !== Object.keys(nextProps).length ||
      Object.keys(thisState).length !== Object.keys(nextState).length) {
      return true;
    }

    Object.keys(nextProps).forEach((key) => {
      if (!is(thisProps[key], nextProps[key])) {
        return true;
      }
    });

    // 试过使用Object.keys来比较但是会导致setSate()无法及时更新原因未知
    // eslint-disable-next-line no-restricted-syntax
    for (const key in nextState) {
      if (!is(thisState[key], nextState[key])) {
        return true;
      }
    }
    return false;
  }
  render() {
    const { name } = this.state.currentCity;
    const { history } = this.props;
    return (
      <div className="container">
        <Head title={name} history={history} />
        <form className="city-form">
          <div>
            <input type="search" name="city" placeholder="输入学校、商务楼、地址" className="city-input input-style" required />
          </div>
          <div>
            <input type="submit" name="submit" value="提交" className="city-sumbit input-style" required />
          </div>
        </form>
        <header className="pois-search-history">搜索历史</header>
        <ul className="getpois-ul">
          <li>
            <h4 className="pois-name">黄龙</h4>
            <p className="pois-address">黄龙体育场</p>
          </li>
          <li>
            <h4 className="pois-name">黄龙</h4>
            <p className="pois-address">浙江省杭州市建德市梅城镇城西村</p>
          </li>
          <li>
            <h4 className="pois-name">黄龙</h4>
            <p className="pois-address">浙江省杭州市建德市梅城镇城西村</p>
          </li>
          <li>
            <h4 className="pois-name">黄龙</h4>
            <p className="pois-address">浙江省杭州市建德市梅城镇城西村</p>
          </li>
          <li>
            <h4 className="pois-name">黄龙</h4>
            <p className="pois-address">浙江省杭州市建德市梅城镇城西村</p>
          </li>
          <li>
            <h4 className="pois-name">黄龙</h4>
            <p className="pois-address">浙江省杭州市建德市梅城镇城西村</p>
          </li>
          <li>
            <h4 className="pois-name">黄龙</h4>
            <p className="pois-address">浙江省杭州市建德市梅城镇城西村</p>
          </li>
        </ul>
        <footer className="clear-all-history">清空所有</footer>
      </div>
    );
  }
}

City.propTypes = {
  dispatch: PropTypes.func,
  id: PropTypes.number,
  match: PropTypes.shape({
    params: PropTypes.object
  }),
  history: PropTypes.shape({
    params: PropTypes.object
  }),
  currentCity: PropTypes.instanceOf(immutable.Map)
};

const mapStateToProps = state => ({
  currentCity: state.getIn(['currentCity'])
});

export default hot(module)(connect(mapStateToProps)(City));
