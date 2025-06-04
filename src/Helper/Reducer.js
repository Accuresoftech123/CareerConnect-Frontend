import { combineReducers } from 'redux';
import { LOGIN_SUCCESS, LOGIN_FAILED, LOGOUT, SET_USER_PROFILE } from './ActionType';
// Initial state for each slice
const loginInitialState = {
  isAuthenticated: false,
  error: null,
};

const userInitialState = {
  profile: null,
};

// Login reducer logic
function loginReducer(state = loginInitialState, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return { ...state, isAuthenticated: true };
    case LOGIN_FAILED:
      return { isAuthenticated: false, error: action.payload };
    case LOGOUT:
      return { ...state, isAuthenticated: false };
    default:
      return state;
  }
}

// User reducer logic
function userReducer(state = userInitialState, action) {
  switch (action.type) {
    case SET_USER_PROFILE:
      return { ...state, profile: action.payload };
    default:
      return state;
  }
}

// Combine them manually using combineReducers


const rootReducer = combineReducers({
  login: loginReducer,
  user: userReducer,
});

export default rootReducer;

