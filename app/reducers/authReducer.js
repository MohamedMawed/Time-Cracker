/* Login Reducer
 * handles login states in the app
 */
import createReducer from 'app/lib/createReducer';
import * as types from 'app/actions/types';

const initialState = {
  isLoggedIn: false,
  id: 0,
  username: '',
  password: '',
  
};

export const authReducer = createReducer(initialState, {
    [types.LOGIN_REQUEST](state, action) {
        return {
          ...state,
          username: action.username,
          password: action.password,
        };
      },
      [types.LOGOUT](state, action) {
        return {
          ...state,
          userData: undefined
        };
      },
      [types.REGISTER_REQUEST](state, action) {
        return {
          ...state,
          username: action.username,
          email: action.email,
          password: action.password,
          is_user_manager: action.is_user_manager
        };
      },
  [types.LOGIN_LOADING_ENDED](state) {
    return { ...state };
  },
  [types.LOGIN_RESPONSE](state, action) {
    return {
      ...state,
      userData: action.response,
    };
  },
  [types.LOGIN_FAILED](state) {
    return {
      ...state,
      isLoggedIn: false,
    };
  },
});
