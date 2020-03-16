
import { put, call, select } from 'redux-saga/effects'

import { userList, delUser, editUser, addUser } from 'app/api/methods/userMethods'
import * as userActions from 'app/actions/userActions'
import * as loginActions from 'app/actions/loginActions'
import * as navigationActions from 'app/actions/navigationActions'
import NavigationService from '../navigation/NavigationService'
import Toast from 'react-native-root-toast'
// import { NavigationActions } from 'react-navigation'


getToken = (state) => state.loginReducer.userData.token

export function* userListSaga(action) {
    yield put(loginActions.enableLoader())
    let token = yield select(getToken)
    const response = yield call(userList,token)
   
    if (!response.detail) {
      yield put(userActions.onlistUsersResponse(response))
      yield put(loginActions.disableLoader({}))
    } else {
        Toast.show("You no longer have an access")
            yield put(loginActions.Logout())
            NavigationService.reset('Login')
      yield put(loginActions.disableLoader({}))
    }
  }


  export function* userDelSaga(action) {
    yield put(loginActions.enableLoader())
    let token = yield select(getToken)
    const response = yield call(delUser,action.user_id,token)
    if (response) {
      yield put(userActions.listUsers())
      yield put(loginActions.disableLoader({}))
    } else {
      yield put(loginActions.disableLoader({}))
      Toast.show("Something Went Worng Please Try Again Later")
    }
  }

  export function* userAddSaga(action) {
    yield put(loginActions.enableLoader())
    let token = yield select(getToken)
    const response = yield call(addUser, action.user, token)
    if (response) {
      yield put(loginActions.disableLoader({}))
      NavigationService.reset('HomeManager')
    } else {
      yield put(loginActions.disableLoader({}))
    }
  }

  export function* userEditSaga(action) {
    yield put(loginActions.enableLoader())
    let token = yield select(getToken)
    const response = yield call(editUser, action.user_id, action.user, token)
    if (response) {
      yield put(userActions.listUsers())
      yield put(loginActions.disableLoader({}))
      NavigationService.reset('HomeManager')
    } else {
      yield put(loginActions.disableLoader({}))

    }
  }
