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
    changeSettingSaga,
    getSettingSaga,
    sendReportSaga
} from './workingDaySaga'
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
        takeLatest(types.WORKING_DAY_REQUEST, noteListSaga),
        takeLatest(types.WORKING_DAY_DELETE, noteDelSaga),
        takeLatest(types.WORKING_DAY_ADD, noteAddSaga),
        takeLatest(types.PWH, changeSettingSaga),
        takeLatest(types.PWH_GET, getSettingSaga),
        takeLatest(types.WORKING_DAY_EDIT, noteEditSaga),

        // this is for the user manager type
        takeLatest(types.USERS_REQUEST, userListSaga),
        takeLatest(types.USERS_DELETE, userDelSaga),
        takeLatest(types.USERS_EDIT, userEditSaga),
    ]);
}
