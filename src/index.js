import React from 'react';
import { render } from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { ConnectedRouter } from 'react-router-redux';
import { Provider } from 'react-redux';
import createHistory from 'history/createBrowserHistory';
import Routes from './routes';
import configureStore from './store/configuerStore';
import px2rem from './utils/px2rem';

px2rem(document, window);
injectTapEventPlugin();
const rootEl = window.document.getElementById('app');
const store = configureStore();
const history = createHistory();


render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Routes />
    </ConnectedRouter>
  </Provider>,
  rootEl
);
