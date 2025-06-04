import { LOGIN_SUCCESS,LOGIN_FAILED, LOGOUT, SET_USER_PROFILE } from './ActionType';

export const loginSuccess = () => ({
  type: LOGIN_SUCCESS,
});

export const loginFailed = (error) => ({
  type: LOGIN_FAILED,
  payload: error,
});


export const logout = () => ({
  type: LOGOUT,
});

export const setUserProfile = (profile) => ({
  type: SET_USER_PROFILE,
  payload: profile,
});
