
import { put, call, select } from 'redux-saga/effects'

import { noteList, delNote, editNote, addNote } from 'app/api/methods/noteMethods'
import * as noteActions from 'app/actions/noteActions'
import * as loginActions from 'app/actions/loginActions'
import * as navigationActions from 'app/actions/navigationActions'


getToken = (state) => state.loginReducer.userData.token

// Our worker Saga that logins the user
export function* noteListSaga(action) {
    yield put(loginActions.enableLoader())
    let token = yield select(getToken)
    const response = yield call(noteList,token)
 
    if (response) {
      yield put(noteActions.onlistNotesResponse(response))
      yield put(loginActions.disableLoader({}))
    } else {
      yield put(noteActions.listNotesFailed())
      yield put(loginActions.disableLoader({}))
    }
  }


  export function* noteDelSaga(action) {
    yield put(loginActions.enableLoader())
    let token = yield select(getToken)
    //how to call api
    const response = yield call(delNote,action.note_id,token)
    //mock response
  //   const response = { success: true, data: { id: 1 } }
    if (response) {
      yield put(noteActions.listNotes())
      yield put(loginActions.disableLoader({}))
    } else {
      yield put(loginActions.disableLoader({}))

    }
  }

  export function* noteAddSaga(action) {
    yield put(loginActions.enableLoader())
    let token = yield select(getToken)
    // how to call api
    const response = yield call(addNote, action.note.note, action.note.date, action.note.hours, token)
    // mock response
    // const response = { success: true, data: { id: 1 } }
    if (response) {
        console.log('I got here ')
      yield put(noteActions.listNotes())
      yield put(loginActions.disableLoader({}))
    } else {
        console.log('I got here also')
        yield put(loginActions.disableLoader({}))
    }
  }

  export function* noteEditSaga(action) {
    yield put(loginActions.enableLoader())
    let token = yield select(getToken)
    //how to call api
    const response = yield call(editNote, action.note_id, action.note.note, action.note.date, action.note.hours, token)
    console.log(response)
    //   mock response
    //   const response = { success: true, data: { id: 1 } }
    if (response) {
      yield put(noteActions.listNotes())
      yield put(loginActions.disableLoader({}))
    } else {
      yield put(loginActions.disableLoader({}))

    }
  }
