import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import history from './browserHistory';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { AuthProvider } from './contexts/AuthContext';
import { AppProvider } from 'contexts/AppContext';
import { HomeProvider } from 'contexts/HomeContext';

require('./utils/polyfill');

ReactDOM.render(
  <Router history={history}>
    <AppProvider>
      <AuthProvider>
        <HomeProvider>
          <App />
        </HomeProvider>
      </AuthProvider>
    </AppProvider>
  </Router>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
