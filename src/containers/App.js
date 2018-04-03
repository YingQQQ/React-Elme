import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { hot } from 'react-hot-loader';
import { connect } from 'react-redux';
import immutable, { is } from 'immutable';
import PropTypes from 'prop-types';
import Svg from '../components/Svg';
import Head from '../components/Head';
import {
  fetchGuessCity,
  fetchHotCities,
  fetchGroupCities
} from '../actions/action';

class App extends Component {
  state = {
    name: '',
    id: '',
    hotCity: [],
    groupCities: {}
  };
  componentDidMount() {
    this.props.fetchGuessCity();
    this.props.fetchHotCities();
    this.props.fetchGroupCities();
  }
  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      console.log('componentWillReceiveProps');
      const { guessCity, hotCities, groupCities } = nextProps;
      if (hotCities.size && guessCity.size && groupCities.size) {
        const name = guessCity.getIn(['name']);
        const id = guessCity.getIn(['id']);
        const hotCity = hotCities.pop().toArray();
        const groupCitiesJS = groupCities.toObject();
        this.setState({
          name,
          id,
          hotCity,
          groupCities: groupCitiesJS
        });
      }
    }
  }

  shouldComponentUpdate(nextProps = {}, nextState = {}) {
    const thisProps = this.props || {};
    const thisState = this.state || {};

    if (
      Object.keys(thisProps).length !== Object.keys(nextProps).length ||
      Object.keys(thisState).length !== Object.keys(nextState).length
    ) {
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
    return (
      <div>
        <Svg />
        <Head />
        <nav className="nav-city">
          <div className="city-tip">
            <span>当前定位城市：</span>
            <span>定位不准时，请在城市列表中选择</span>
          </div>
          <Link to={`city/${this.state.id}`} className="city-guess">
            <span>{this.state.name}</span>
            <svg className="arrow-right">
              <use
                xmlnsXlink="http://www.w3.org/1999/xlink"
                xlinkHref="#arrow-right"
              />
            </svg>
          </Link>
        </nav>
        <section className="hot-city-container">
          <h4 className="hot-city">热门城市</h4>
          <ul className="city-list-ul">
            {this.state.hotCity.map(val => (
              <li key={`hotCity-${val.id}`}>
                <Link to={`city/${val.id}`}>{val.name}</Link>
              </li>
            ))}
          </ul>
        </section>
        <section className="group-city-container">
          <ul className="letter-classify">
            {Object.keys(this.state.groupCities).map(letter => (
              <li className="letter-classify-li" key={`groupLetter-${letter}`}>
                <h4 className="hot-city">
                  {letter}
                  {letter === 'A' ? <span>（按字母排序）</span> : null}
                </h4>
                <ul className="city-list-ul groupcity-name-container">
                  {this.state.groupCities[letter].map(val => (
                    <li key={`hotCity-${val.id}`}>
                      <Link to={`city/${val.id}`}>{val.name}</Link>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </section>
      </div>
    );
  }
}

App.propTypes = {
  fetchGuessCity: PropTypes.func.isRequired,
  fetchHotCities: PropTypes.func.isRequired,
  fetchGroupCities: PropTypes.func.isRequired,
  guessCity: PropTypes.instanceOf(immutable.Map),
  hotCities: PropTypes.instanceOf(immutable.Iterable),
  groupCities: PropTypes.instanceOf(immutable.Map)
};

const mapStateToProps = state => ({
  guessCity: state.getIn(['guessCity']),
  hotCities: state.getIn(['hotCities']),
  groupCities: state.getIn(['groupCities'])
});

export default hot(module)(
  connect(mapStateToProps, {
    fetchGuessCity,
    fetchHotCities,
    fetchGroupCities
  })(App)
);
