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

export default function* watch() {
    yield all([
        takeLatest(types.LOGIN_REQUEST, loginSaga),
        takeLatest(types.REGISTER_REQUEST, registerSaga),
        takeLatest(types.NOTES_REQUEST, noteListSaga),
        takeLatest(types.NOTES_DELETE, noteDelSaga),
        takeLatest(types.NOTES_ADD, noteAddSaga),
        takeLatest(types.NOTES_EDIT, noteEditSaga),
    ]);
}
