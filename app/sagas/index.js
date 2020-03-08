/**
 *  Redux saga class init
 */
import { takeLatest, all } from 'redux-saga/effects'
import * as types from '../actions/types'
import {loginSaga} from './loginSaga'
import { noteListSaga, noteDelSaga } from './noteSaga'

export default function* watch() {
  yield all([
      takeLatest(types.LOGIN_REQUEST, loginSaga),
      takeLatest(types.NOTES_REQUEST, noteListSaga),
      takeLatest(types.NOTES_DELETE, noteDelSaga),
    ]);
}
