/* Redux saga class
 * logins the user into the app
 * requires username and password.
 * un - username
 * pwd - password
 */
import { put, call, select } from 'redux-saga/effects';
import { delay } from 'redux-saga';

import { Alert } from 'react-native';
import loginUser from 'app/api/methods/loginUser';
import * as loginActions from 'app/actions/loginActions';
import * as navigationActions from 'app/actions/navigationActions';

// Our worker Saga that logins the user
export function* loginSaga(action) {
  yield put(loginActions.enableLoader());

  //how to call api
  const response = yield call(loginUser, action.username, action.password);
  //mock response
//   const response = { success: true, data: { id: 1 } };
    
  if (response.token) {
    yield put(loginActions.onLoginResponse(response));
    yield put(loginActions.disableLoader({}));
    yield call(navigationActions.navigateToHome);
  } else {
    yield put(loginActions.loginFailed());
    yield put(loginActions.disableLoader({}));
  }
}
