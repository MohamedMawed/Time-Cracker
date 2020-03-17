
import { put, call, select } from 'redux-saga/effects'

import { noteList, delNote, editNote, addNote, changePWH, getPWH, sendReport } from 'app/api/methods/noteMethods'
import * as noteActions from 'app/actions/noteActions'
import * as authActions from 'app/actions/authActions'
import NavigationService from '../navigation/NavigationService'
import Toast from 'react-native-root-toast'


getToken = (state) => state.authReducer.userData.token


//send the report 
export function* sendReportSaga(action) {
    yield put(authActions.enableLoader())
    let token = yield select(getToken)
    const response = yield call(sendReport, action.from, action.to, token)

    if (response.message) {
      yield put(authActions.disableLoader({}))
      Toast.show('Report sent to your mail successfully')
    } else {
        if(response.detail)
            Toast.show(response.detail)
        else  Toast.show('something went wrong')
      yield put(authActions.disableLoader({}))
    }
  }

// Our worker Saga that list the notes
export function* noteListSaga(action) {
    yield put(authActions.enableLoader())
    let token = yield select(getToken)
    const response = yield call(noteList, action.from, action.to, token)

    if (response) {
      yield put(noteActions.onlistNotesResponse(response))
      yield put(authActions.disableLoader({}))
    } else {
      yield put(noteActions.listNotesFailed())
      yield put(authActions.disableLoader({}))
    }
  }


  export function* noteDelSaga(action) {
    yield put(authActions.enableLoader())
    let token = yield select(getToken)
    const response = yield call(delNote,action.note_id,token)

    if (response) {
      yield put(noteActions.listNotes())
      yield put(authActions.disableLoader({}))
    } else {
      yield put(authActions.disableLoader({}))

    }
  }

  export function* noteAddSaga(action) {
    yield put(authActions.enableLoader())
    let token = yield select(getToken)
    const response = yield call(addNote, action.note, token)
    if (response) {
      yield put(noteActions.listNotes())
      yield put(authActions.disableLoader({}))
      NavigationService.reset('Home')
    } else {
      yield put(authActions.disableLoader({}))
    }
  }

  export function* noteEditSaga(action) {
    yield put(authActions.enableLoader())
    let token = yield select(getToken)
    const response = yield call(editNote, action.note_id, action.note, token)
    
    if (response) {
      yield put(noteActions.listNotes())
      yield put(authActions.disableLoader({}))
      NavigationService.reset('Home')
    } else {
      yield put(authActions.disableLoader({}))

    }
  }

