/* Redux saga class
 * logins the user into the app
 * requires username and password.
 * un - username
 * pwd - password
 */
import { put, call, select } from 'redux-saga/effects'
import Toast from 'react-native-root-toast'
import { loginUser, registerUser } from 'app/api/methods/loginUser'
import * as loginActions from 'app/actions/loginActions'
import * as navigationActions from 'app/actions/navigationActions'

// Our worker Saga that logins the user
export function* loginSaga(action) {
    yield put(loginActions.enableLoader())

    //how to call api
    const response = yield call(loginUser, action.username, action.password)
    //mock response
    //   const response = { success: true, data: { id: 1 } }
    console.log(response)
    if (response.token) {
        yield put(loginActions.onLoginResponse(response))
        yield put(loginActions.disableLoader({}))
        navigationActions.navigateToHome(response)
    } else {
        yield put(loginActions.loginFailed())
        yield put(loginActions.disableLoader({}))
        if (response.error)
            Toast.show(response.error)
        if (response.error)
            Toast.show(response.non_field_errors[0])
            
        else Toast.show('Check Internet Connection')
    }
}


// Our worker Saga that registers the user
export function* registerSaga(action) {
    yield put(loginActions.enableLoader())

    //how to call api
    const response = yield call(registerUser, action.username, action.email, action.password, action.is_user_manager)
    //mock response
    //   const response = { success: true, data: { id: 1 } }

    if (response.token) {
        yield put(loginActions.onLoginResponse(response))
        yield put(loginActions.disableLoader({}))
        
        navigationActions.navigateToHome(response)
    } else {
        yield put(loginActions.loginFailed())
        yield put(loginActions.disableLoader({}))
        if (response.error)
            Toast.show(response.error)
        else Toast.show('Check Internet Connection')
    }
}


