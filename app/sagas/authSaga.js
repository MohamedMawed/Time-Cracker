import { put, call, select } from 'redux-saga/effects'
import Toast from 'react-native-root-toast'
import { loginUser, registerUser } from 'app/api/methods/authMethods'
import * as authActions from 'app/actions/authActions'
import * as navigationActions from 'app/actions/navigationActions'


export function* loginSaga(action) {
    yield put(authActions.enableLoader())

    const response = yield call(loginUser, action.username, action.password)

    if (response.token) {
        yield put(authActions.onLoginResponse(response))
        yield put(authActions.disableLoader({}))
        navigationActions.navigateToHome(response)
    } else {
        yield put(authActions.loginFailed())
        yield put(authActions.disableLoader({}))
        if (response.error)
            Toast.show(response.error)
        if (response.non_field_errors)
            Toast.show(response.non_field_errors[0])
            
        else Toast.show('Check Internet Connection')
    }
}


// Our worker Saga that registers the user
export function* registerSaga(action) {
    yield put(authActions.enableLoader())

    const response = yield call(registerUser,action.user)

    if (response.token) {
        yield put(authActions.onLoginResponse(response))
        yield put(authActions.disableLoader({}))
        
        navigationActions.navigateToHome(response)
    } else {
        yield put(authActions.loginFailed())
        yield put(authActions.disableLoader({}))
        if (response.error)
            Toast.show(response.error)
        else Toast.show('Check Internet Connection')
    }
}


