import {combineReducers} from 'redux';

const initState = {
  token: '',
  appUser: null,
};
const newState = (state = initState, action = {}) => {
  switch (action.type) {
    case 'SET_TOKEN':
      return Object.assign({}, state, {token: action.token});
    case 'SET_APPUSER':
      return Object.assign({}, state, {appUser: action.info});
    default:
      return state;
  }
};
//Reducer合并
export default combineReducers({newState});
