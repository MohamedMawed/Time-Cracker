
import { put, call, select } from 'redux-saga/effects'

import { userList, delUser, editUser, addUser } from 'app/api/methods/userMethods'
import * as userActions from 'app/actions/userActions'
import * as authActions from 'app/actions/authActions'
import * as navigationActions from 'app/actions/navigationActions'
import NavigationService from '../navigation/NavigationService'
import Toast from 'react-native-root-toast'
// import { NavigationActions } from 'react-navigation'


getToken = (state) => state.authReducer.userData.token

export function* userListSaga(action) {
    yield put(authActions.enableLoader())
    let token = yield select(getToken)
    const response = yield call(userList,token)
   
    if (!response.detail) {
      yield put(userActions.onlistUsersResponse(response))
      yield put(authActions.disableLoader({}))
    } else {
        Toast.show("You no longer have an access")
            yield put(authActions.Logout())
            NavigationService.reset('Login')
      yield put(authActions.disableLoader({}))
    }
  }


  export function* userDelSaga(action) {
    yield put(authActions.enableLoader())
    let token = yield select(getToken)
    const response = yield call(delUser,action.user_id,token)
    if (response) {
      yield put(userActions.listUsers())
      yield put(authActions.disableLoader({}))
    } else {
      yield put(authActions.disableLoader({}))
      Toast.show("Something Went Worng Please Try Again Later")
    }
  }

  export function* userAddSaga(action) {
    yield put(authActions.enableLoader())
    let token = yield select(getToken)
    const response = yield call(addUser, action.user, token)
    if (response) {
      yield put(authActions.disableLoader({}))
      NavigationService.reset('HomeManager')
    } else {
      yield put(authActions.disableLoader({}))
    }
  }

  export function* userEditSaga(action) {
    yield put(authActions.enableLoader())
    let token = yield select(getToken)
    const response = yield call(editUser, action.user_id, action.user, token)
    if (response) {
      yield put(userActions.listUsers())
      yield put(authActions.disableLoader({}))
      NavigationService.reset('HomeManager')
    } else {
      yield put(authActions.disableLoader({}))

    }
  }
