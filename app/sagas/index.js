/**
 *  Redux saga class init
 */
import { takeLatest, all } from 'redux-saga/effects'
import * as types from '../actions/types'
import { loginSaga, registerSaga } from './authSaga'
import {
    noteListSaga,
    noteDelSaga,
    noteAddSaga,
    noteEditSaga,
    PWHSaga,
    TodayPWHSaga,
    sendReportSaga
} from './noteSaga'
import { 
    userListSaga,
    userDelSaga,
    userAddSaga,
    userEditSaga
} from './userSaga'

export default function* watch() {
    yield all([
        takeLatest(types.LOGIN_REQUEST, loginSaga),
        takeLatest(types.REGISTER_REQUEST, registerSaga),

        // for sending the report
        takeLatest(types.SEND_REPORT, sendReportSaga),

        // this is for the note CRUD for regular user
        takeLatest(types.NOTES_REQUEST, noteListSaga),
        takeLatest(types.NOTES_DELETE, noteDelSaga),
        takeLatest(types.NOTES_ADD, noteAddSaga),
        takeLatest(types.NOTES_EDIT, noteEditSaga),

        // for changing the PWH
        takeLatest(types.PWH, PWHSaga),
        takeLatest(types.PWH_GET, TodayPWHSaga),
        
        // this is for the user manager type
        takeLatest(types.USERS_REQUEST, userListSaga),
        takeLatest(types.USERS_DELETE, userDelSaga),
        takeLatest(types.USERS_ADD, userAddSaga),
        takeLatest(types.USERS_EDIT, userEditSaga),
    ]);
}
