/* HistoryList组件 主要功能点击传递数据 */
import React, {
  PureComponent
} from 'react';
import {
  hot
} from 'react-hot-loader';

import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class HistoryList extends PureComponent {
  handleClick = (e) => {
    e.stopPropagation();
    this.props.onHeaderClick(this.props.place);
  }
  render() {
    const { place } = this.props;
    return (
      <li>
        <Link to={`/msite?geohash=${place.geohash}`} onTouchTap={this.handleClick}>
          <h4 className="pois-name">{place.name}</h4>
          <p className="pois-address">{place.address}</p>
        </Link>
      </li >
    );
  }
}

HistoryList.propTypes = {
  onHeaderClick: PropTypes.func.isRequired,
  place: PropTypes.shape({
    name: PropTypes.string,
    geohash: PropTypes.string,
    address: PropTypes.string
  }).isRequired,
};

export default hot(module)(HistoryList);
