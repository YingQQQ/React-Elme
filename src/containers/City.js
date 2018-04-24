/* 城市Pages */
import React, {
  Component
} from 'react';
import { hot } from 'react-hot-loader';
import immutable from 'immutable';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Head from '../components/Head';
import HistoryList from '../components/HistoryList';
import {
  fetchCurrentCity,
  fetchSearchPlace,
  clearPlace,
} from '../actions/action';
import {
  getLocalStorage,
  setLocalStorage,
  removeLocalStorage
} from '../utils/mutils';
import shallowEqual from '../utils/shallowEqual';

class City extends Component {
  static storage(val) {
    let history = getLocalStorage('placesHistory');
    if (history) {
      history = JSON.parse(history);
      let checkrepeat = false;
      history.forEach((place) => {
        if (place.geohash === val.geohash) {
          checkrepeat = true;
        }
      });
      if (!checkrepeat) {
        history.push(val);
      }
      setLocalStorage('placesHistory', history);
    } else {
      const init = [];
      init.push(val);
      setLocalStorage('placesHistory', init);
    }
  }
  constructor(props) {
    super(props);
    this.state = {
      name: 'eles',
      currentCity: {},
      value: '',
      historytitle: true,
      historyList: getLocalStorage('placesHistory') ? JSON.parse(getLocalStorage('placesHistory')) : [],
      placeNone: false
    };
  }
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.fetchCurrentCity(id);
  }
  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      const { currentCity, searchPlace } = nextProps;
      if (currentCity.size) {
        const currentCityJS = currentCity.toObject();
        this.setState({
          currentCity: currentCityJS,
        });
      }
      if (searchPlace.getIn(['historyList']).size) {
        const historyList = searchPlace.getIn(['historyList']).toArray();
        const historytitle = false;
        this.setState({
          historytitle,
          historyList
        });
      }
    }
  }
  shouldComponentUpdate(nextProps = {}, nextState = {}) {
    const thisProps = this.props || {};
    const thisState = this.state || {};
    // console.log(shallowEqual(thisProps, nextProps, thisState, nextState));
    return shallowEqual(thisProps, nextProps, thisState, nextState);
  }
  componentWillUnmount() {
    this.props.clearPlace();
  }

  handleChange = (event) => {
    const value = event.target.value;
    this.setState(() => ({
      value
    }));
  }
  handleClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
    if (e.codeKey === 13) {
      console.log('enter');
    }
    this.postPios();
  }
  handleSubmit = (e) => {
    e.preventDefault();
    if (e.codeKey === 13) {
      console.log('enter');
      this.postPios();
    }
  }
  postPios() {
    const { currentCity: { id }, value } = this.state;
    if (value) {
      this.props.fetchSearchPlace(id, value);
    }
  }
  clearHistory = (e) => {
    e.preventDefault();
    e.stopPropagation();
    this.clear();
  }
  clear() {
    const historyList = [];
    this.setState(() => ({
      historyList,
      historytitle: true,
    }));
    removeLocalStorage('placesHistory');
  }
  render() {
    const { currentCity: { name }, value } = this.state;
    const { history } = this.props;
    return (
      <div className="container">
        <Head title={name} history={history} needLogin />
        <form className="city-form" onSubmit={this.handleSubmit}>
          <div>
            <input
              type="search"
              name="city"
              placeholder="输入学校、商务楼、地"
              className="city-input input-style"
              value={value}
              onChange={this.handleChange}
              required
            />
          </div>
          <div>
            <input type="submit" name="submit" value="提交" className="city-sumbit input-style" onTouchTap={this.handleClick} />
          </div>
        </form>
        {this.state.historytitle ? <header className="pois-search-history">搜索历史</header> : null}
        <ul className="getpois-ul">
          {
            this.state.historyList.map(val => (
              <HistoryList
                key={`${val.name}`}
                place={val}
                onHeaderClick={City.storage}
              />
            ))
          }
        </ul>
        {(this.state.historyList.length > 0) &&
          <footer className="clear-all-history">
            <button className="button-style" onClick={this.clearHistory}>清空所有</button>
          </footer>
        }

      </div>
    );
  }
}

City.propTypes = {
  fetchSearchPlace: PropTypes.func.isRequired,
  fetchCurrentCity: PropTypes.func.isRequired,
  clearPlace: PropTypes.func.isRequired,
  id: PropTypes.number,
  match: PropTypes.shape({
    params: PropTypes.object
  }),
  history: PropTypes.shape({
    params: PropTypes.object
  }),
  currentCity: PropTypes.instanceOf(immutable.Map),
  searchPlace: PropTypes.instanceOf(immutable.Map)
};


const mapStateToProps = state => ({
  currentCity: state.getIn(['currentCity']),
  searchPlace: state.getIn(['searchPlace'])
});

export default hot(module)(connect(mapStateToProps, {
  fetchCurrentCity,
  fetchSearchPlace,
  clearPlace
})(City));
