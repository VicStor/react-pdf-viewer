import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';

import App from './components/app';
import Demo from './components/demo';
import Api from './components/api';

import store from './store';

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path='/' component={App}>
        <IndexRoute component={Demo} />
        <Route path='demo' component={Demo} />
        <Route path='api' component={Api} />
        <Route path='contacts' component={null} />
      </Route>
    </Router>
  </Provider>
  , global.document.getElementById('app'));
