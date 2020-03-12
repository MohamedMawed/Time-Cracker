
import { put, call, select } from 'redux-saga/effects'

import { userList, delUser, editUser, addUser } from 'app/api/methods/userMethods'
import * as userActions from 'app/actions/userActions'
import * as loginActions from 'app/actions/loginActions'
import * as navigationActions from 'app/actions/navigationActions'


getToken = (state) => state.loginReducer.userData.token;

export function* userListSaga(action) {
    yield put(loginActions.enableLoader());
    let token = yield select(getToken);
    const response = yield call(userList,token);
   
    if (response) {
      yield put(userActions.onlistUsersResponse(response));
      yield put(loginActions.disableLoader({}));
    } else {
      Toast.show("Something Went Worng Please Try Again Later")
      yield put(loginActions.disableLoader({}));
    }
  }


  export function* userDelSaga(action) {
    yield put(loginActions.enableLoader());
    let token = yield select(getToken);
    const response = yield call(delUser,action.user_id,token);
    if (response) {
      yield put(userActions.listUsers());
      yield put(loginActions.disableLoader({}));
    } else {
      yield put(loginActions.disableLoader({}));
      Toast.show("Something Went Worng Please Try Again Later")
    }
  }

  export function* userAddSaga(action) {
    yield put(loginActions.enableLoader());
    let token = yield select(getToken);
    const response = yield call(addUser, action.user, token);
    if (response) {
      yield put(userActions.listUsers());
      yield put(loginActions.disableLoader({}));
    } else {
      yield put(loginActions.disableLoader({}));
    }
  }

  export function* userEditSaga(action) {
    yield put(loginActions.enableLoader());
    let token = yield select(getToken);
    const response = yield call(editNote, action.user_id, action.user.user, action.user.date, action.user.hours, token);
    if (response) {
      yield put(userActions.listUsers());
      yield put(loginActions.disableLoader({}));
    } else {
      yield put(loginActions.disableLoader({}));

    }
  }
