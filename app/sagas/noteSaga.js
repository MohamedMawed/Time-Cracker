
import { put, call, select } from 'redux-saga/effects'

import { noteList, delNote, editNote } from 'app/api/methods/noteMethods'
import * as noteActions from 'app/actions/noteActions'
import * as loginActions from 'app/actions/loginActions'
import * as navigationActions from 'app/actions/navigationActions'


getToken = (state) => state.loginReducer.userData.token;

// Our worker Saga that logins the user
export function* noteListSaga(action) {
    yield put(loginActions.enableLoader());
    let token = yield select(getToken);
    //how to call api
    const response = yield call(noteList,token);
    //mock response
  //   const response = { success: true, data: { id: 1 } };
      
    if (response) {
      yield put(noteActions.onlistNotesResponse(response));
      yield put(loginActions.disableLoader({}));
      yield call(navigationActions.navigateToHome);
    } else {
      yield put(noteActions.listNotesFailed());
      yield put(loginActions.disableLoader({}));
    }
  }


  export function* noteDelSaga(action) {
    yield put(loginActions.enableLoader());
    let token = yield select(getToken);
    //how to call api
    const response = yield call(delNote,action.note_id,token);
    //mock response
  //   const response = { success: true, data: { id: 1 } };
    if (response) {
      yield put(noteActions.listNotes());
      yield put(loginActions.disableLoader({}));
    } else {
      yield put(loginActions.disableLoader({}));

    }
  }

  export function* noteAddSaga(action) {
    yield put(loginActions.enableLoader());
    let token = yield select(getToken);
    // how to call api
    const response = yield call(addNote, action.note, action.start, action.end, token);
    // mock response
    // const response = { success: true, data: { id: 1 } };
    if (response) {
      yield put(noteActions.listNotes());
      yield put(loginActions.disableLoader({}));
    } else {
      yield put(loginActions.disableLoader({}));
    }
  }

  export function* noteEditSaga(action) {
    yield put(loginActions.enableLoader());
    let token = yield select(getToken);
    //how to call api
    const response = yield call(editNote, action.note_id, action.note, action.start, action.end, token);
    //   mock response
    //   const response = { success: true, data: { id: 1 } };
    if (response) {
      yield put(noteActions.listNotes());
      yield put(loginActions.disableLoader({}));
    } else {
      yield put(loginActions.disableLoader({}));

    }
  }
