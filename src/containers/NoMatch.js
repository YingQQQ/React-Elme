import React from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import Head from '../components/Head';
import Footer from '../components/Footer';

const styles = {
  link: {
    marginTop: '3rem',
    color: '#000',
    display: 'block'
  }
};

export default () => (
  <div>
    <Head />
    <Link to="/123/123" style={styles.link}>Not Found 404</Link>
    <Switch>
      <Route path="/123/:id" exact component={Footer} />
    </Switch>
  </div>
);
