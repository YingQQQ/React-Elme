import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Loadable from 'react-loadable';
import MyLoadingComponent from './components/Loading';

const AsyncApp = Loadable({ // eslint-disable-line new-cap
  loader: () => import('./containers/App'),
  loading: MyLoadingComponent,
  delay: 300
});
const AsyncCity = Loadable({ // eslint-disable-line new-cap
  loader: () => import('./containers/City'),
  loading: MyLoadingComponent
});
const AsyncMsite = Loadable({ // eslint-disable-line new-cap
  loader: () => import('./containers/Msite'),
  loading: MyLoadingComponent
});
const AsyncShop = Loadable({ // eslint-disable-line new-cap
  loader: () => import('./containers/Shop'),
  loading: MyLoadingComponent
});

const AsyncNoMatch = Loadable({ // eslint-disable-line new-cap
  loader: () => import('./containers/NoMatch'),
  loading: MyLoadingComponent
});


export default () => (
  <Router>
    <Switch>
      <Route exact path="/home" component={AsyncApp} />
      <Route path="/city/:id" component={AsyncCity} />
      <Route path="/msite" component={AsyncMsite} />
      <Route path="/shop" component={AsyncShop} />
      <Route component={AsyncNoMatch} />
    </Switch>
  </Router>
);
