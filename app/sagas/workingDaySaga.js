
import { put, call, select } from 'redux-saga/effects'

import { noteList, delNote, editNote, addNote, changePWH, getPWH, sendReport } from 'app/api/methods/workingDayMethods'
import * as workingDayActions from 'app/actions/workingDayActions'
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
      yield put(workingDayActions.onlistNotesResponse(response))
      yield put(authActions.disableLoader({}))
    } else {
      yield put(workingDayActions.listNotesFailed())
      yield put(authActions.disableLoader({}))
    }
  }

  export function* changeSettingSaga(action) {
    yield put(authActions.enableLoader())
    let token = yield select(getToken)
    const response = yield call(changePWH, action.pwh, token)

    if (response.settings) {
      yield put(workingDayActions.listNotes())
      yield put(workingDayActions.getSettings())
      yield put(authActions.disableLoader({}))
    } else {
      yield put(authActions.disableLoader({}))
    }
  }

  export function* getSettingSaga(action) {
    yield put(authActions.enableLoader())
    let token = yield select(getToken)
    const response = yield call(getPWH, token)

    if (response.prefferedWorkingHours) {
      yield put(workingDayActions.getPwhResponse(response.prefferedWorkingHours))
      yield put(authActions.disableLoader({}))
    } else {
      yield put(authActions.disableLoader({}))
    }
  }

  
  export function* noteDelSaga(action) {
    yield put(authActions.enableLoader())
    let token = yield select(getToken)
    const response = yield call(delNote,action.note_id,token)

    if (response) {
      yield put(workingDayActions.listNotes())
      yield put(authActions.disableLoader({}))
    } else {
      yield put(authActions.disableLoader({}))

    }
  }

  export function* noteAddSaga(action) {
    yield put(authActions.enableLoader())
    let token = yield select(getToken)
    const response = yield call(addNote, action.workingDay, token)
    if (!response.details) {
      yield put(workingDayActions.listNotes())
      yield put(authActions.disableLoader({}))
      NavigationService.reset('Home')
    } else {
        if(response.details.non_field_errors)
            Toast.show('you already have this day please edit it from the home page')
      yield put(authActions.disableLoader({}))
    }
  }

  export function* noteEditSaga(action) {
    yield put(authActions.enableLoader())
    let token = yield select(getToken)
    const response = yield call(editNote, action.workingDay_id, action.workingDay, token)
    
    if (response) {
      yield put(workingDayActions.listNotes())
      yield put(authActions.disableLoader({}))
      NavigationService.reset('Home')
    } else {
      yield put(authActions.disableLoader({}))

    }
  }

