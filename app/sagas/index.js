/**
 *  Redux saga class init
 */
import { takeLatest, all } from 'redux-saga/effects'
import * as types from '../actions/types'
import { loginSaga, registerSaga } from './loginSaga'
import {
    noteListSaga,
    noteDelSaga,
    noteAddSaga,
    noteEditSaga
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

        // this is for the note CRUD for regular user
        takeLatest(types.NOTES_REQUEST, noteListSaga),
        takeLatest(types.NOTES_DELETE, noteDelSaga),
        takeLatest(types.NOTES_ADD, noteAddSaga),
        takeLatest(types.NOTES_EDIT, noteEditSaga),
        
        // this is for the user manager type
        takeLatest(types.USERS_REQUEST, userListSaga),
        takeLatest(types.USERS_DELETE, userDelSaga),
        takeLatest(types.USERS_ADD, userAddSaga),
        takeLatest(types.USERS_EDIT, userEditSaga),
    ]);
}
