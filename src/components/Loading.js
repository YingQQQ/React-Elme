import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { hot } from 'react-hot-loader';

const Wrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 2.5rem;
  height: 2.5rem;
`;

const MyLoadingComponent = ({ isLoading, error }) => {
  // Handle the loading state
  if (isLoading) {
    return (
      <Wrapper>
        <p>123</p>
      </Wrapper>
    );
  } else if (error) {
    return <div>Sorry, there was a problem loading the page.</div>;
  }
  return null;
};

MyLoadingComponent.propTypes = {
  isLoading: PropTypes.bool,
  error: PropTypes.string
};

export default hot(module)(MyLoadingComponent);
