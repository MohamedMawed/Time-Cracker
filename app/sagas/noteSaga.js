
import { put, call, select } from 'redux-saga/effects'

import { noteList, delNote, editNote, addNote, changePWH, getPWH, sendReport } from 'app/api/methods/noteMethods'
import * as noteActions from 'app/actions/noteActions'
import * as loginActions from 'app/actions/loginActions'
import NavigationService from '../navigation/NavigationService'
import Toast from 'react-native-root-toast'


getToken = (state) => state.loginReducer.userData.token


//send the report 
export function* sendReportSaga(action) {
    yield put(loginActions.enableLoader())
    let token = yield select(getToken)
    const response = yield call(sendReport, action.from, action.to, token)

    if (response) {
      yield put(loginActions.disableLoader({}))
      Toast.show('Report sent to your mail successfully')
    } else {
      Toast.show('there is a problem sending you the report')
      yield put(loginActions.disableLoader({}))
    }
  }

// Our worker Saga that list the notes
export function* noteListSaga(action) {
    yield put(loginActions.enableLoader())
    let token = yield select(getToken)
    const response = yield call(noteList, action.from, action.to, token)

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
    const response = yield call(delNote,action.note_id,token)

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
    const response = yield call(addNote, action.note.note, action.note.date, action.note.hours, token)
    if (response) {
      yield put(noteActions.listNotes())
      yield put(loginActions.disableLoader({}))
      NavigationService.reset('Home')
    } else {
      yield put(loginActions.disableLoader({}))
    }
  }

  export function* noteEditSaga(action) {
    yield put(loginActions.enableLoader())
    let token = yield select(getToken)
    const response = yield call(editNote, action.note_id, action.note.note, action.note.date, action.note.hours, token)
    
    if (response) {
      yield put(noteActions.listNotes())
      yield put(loginActions.disableLoader({}))
      NavigationService.reset('Home')
    } else {
      yield put(loginActions.disableLoader({}))

    }
  }


  export function* PWHSaga(action) {
    yield put(loginActions.enableLoader())
    let token = yield select(getToken)
    const response = yield call(changePWH, token)
    
    if (response) {
      yield put(noteActions.listNotes())
      yield put(loginActions.disableLoader({}))
    } else {
      yield put(loginActions.disableLoader({}))
      Toast.show('something went wrong')
    }
  }

  export function* TodayPWHSaga(action) {
    yield put(loginActions.enableLoader())
    let token = yield select(getToken)
    const response = yield call(getPWH, token)
    
    if (response) {
      yield put(noteActions.setTodayPWH(response.underPWH))
      yield put(loginActions.disableLoader({}))
    } else {
      yield put(loginActions.disableLoader({}))
      Toast.show('something went wrong')
    }
  }
