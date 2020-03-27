/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import React from 'react';
import {Provider} from 'react-redux';
import {name as appName} from './app.json';
import {PersistGate} from 'redux-persist/es/integration/react';
import configureStore from './config/store';

const {persistor, store} = configureStore();

const ReduxApp = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  );
};

AppRegistry.registerComponent(appName, () => ReduxApp);
