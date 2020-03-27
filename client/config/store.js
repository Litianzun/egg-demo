import {createStore, applyMiddleware} from 'redux';
import {AsyncStorage} from 'react-native';
import thunk from 'redux-thunk';
import reducers from './reducers';
import {persistStore, persistCombineReducers} from 'redux-persist';

const config = {
  key: 'root',
  storage: AsyncStorage,
};
const persistReducers = persistCombineReducers(config, {reducers});
const Store = applyMiddleware(thunk)(createStore)(persistReducers);
const persistor = persistStore(Store);
const configureStore = () => {
  return {persistor, store: Store};
};
export default configureStore;
