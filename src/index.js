import React from 'react';
import { render } from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { ConnectedRouter } from 'react-router-redux';
import { Provider } from 'react-redux';
import createHistory from 'history/createBrowserHistory';

import Routes from './routes';
import configureStore from './store/configuerStore';
import px2rem from './utils/px2rem';

const document = window.document;
px2rem(document, window);
injectTapEventPlugin();
const rootEl = document.getElementById('app');
const history = createHistory();
const store = configureStore();

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Routes />
    </ConnectedRouter>
  </Provider>,
  rootEl
);
