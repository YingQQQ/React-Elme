import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
// import PropTypes from 'prop-types';
// import Animated from 'animated/lib/targets/react-dom';
import styled from 'styled-components';
import Head from '../components/Head';
import MyLoadingComponent from '../components/Loading';

// const Button = props => <div {...props} />;

const Wrapper = styled.section`
  margin-top: 2rem;
`;
// const ButtonTap = styled(Button)`
//   justify-content: center;
//   align-items: center;
//   display: flex;
//   cursor: pointer;
//   width: 200px;
//   height: 45px;
//   border: 'none';
//   border-radius: 4;
//   background-color: #ffc107;
// `;

class Shop extends Component {
  componentDidMount() {
    console.log('shop componentDidMount');
  }
  render() {
    return (
      <div>
        <Head title="123" history={history} />
        <Wrapper>
          <MyLoadingComponent isLoading />
        </Wrapper>
      </div>
    );
  }
}

Shop.propTypes = {

};

export default hot(module)(Shop);
