import React from 'react';
import { Link } from 'react-router-dom';
import { hot } from 'react-hot-loader';

const Page1 = () => (
  <div>
    <p>Page1</p>
    <Link to="/">To HomePage!</Link>
  </div>
);

export default hot(module)(Page1);
