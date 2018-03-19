import React from 'react';
import PropTypes from 'prop-types';

const MyLoadingComponent = ({ isLoading, error }) => {
  // Handle the loading state
  if (isLoading) {
    return <div>Loading...</div>;// Handle the error state <div>Loading...</div>;
  } else if (error) {
    return <div>Sorry, there was a problem loading the page.</div>;
  }
  return null;
};

MyLoadingComponent.propTypes = {
  isLoading: PropTypes.bool,
  error: PropTypes.string
};

export default MyLoadingComponent;
