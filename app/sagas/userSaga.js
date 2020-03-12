
import { put, call, select } from 'redux-saga/effects'

import { userList, delUser, editUser, addUser } from 'app/api/methods/userMethods'
import * as userActions from 'app/actions/userActions'
import * as loginActions from 'app/actions/loginActions'
import * as navigationActions from 'app/actions/navigationActions'


getToken = (state) => state.loginReducer.userData.token;

// Our worker Saga that list the users
export function* userListSaga(action) {
    yield put(loginActions.enableLoader());
    let token = yield select(getToken);
    //how to call api
    const response = yield call(userList,token);
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
    const response = yield call(addNote, action.note.note, action.note.date, action.note.hours, token);
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
    const response = yield call(editNote, action.note_id, action.note.note, action.note.date, action.note.hours, token);
    console.log(response)
    //   mock response
    //   const response = { success: true, data: { id: 1 } };
    if (response) {
      yield put(noteActions.listNotes());
      yield put(loginActions.disableLoader({}));
    } else {
      yield put(loginActions.disableLoader({}));

    }
  }
