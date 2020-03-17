/* Notes Reducer
 * handles all kind of transactions made on the user notes
 */
import createReducer from 'app/lib/createReducer'
import * as types from 'app/actions/types'

const initialState = {
    notes: [],
    underPWH: 0
}

export const workingDayReducer = createReducer(initialState, {
    [types.WORKING_DAY_REQUEST](state, action) {
        return {
            ...state,
            from: action.from,
            to: action.to
        }
    },
    [types.WORKING_DAY_RESPONSE](state, action) {
        return {
            ...state,
            notes: action.response,
        }
    },
    [types.WORKING_DAY_DELETE](state, action) {
        return {
            ...state,
            note_id: action.note_id
        }
    },
    [types.WORKING_DAY_ADD](state, action) {
        return {
            ...state,
            workingDay: action.workingDay
        }
    },
    [types.WORKING_DAY_EDIT](state, action) {
        return {
            ...state,
            workingDay_id: action.workingDay_id,
            workingDay: action.workingDay
        }
    },
    [types.PWH](state, action) {
        return {
            ...state,
            pwh: action.pwh
        }
    },
    [types.PWH_GET](state, action) {
        return {
            ...state,
        }
    },
    [types.PWH_RESULT](state, action) {
        return {
            ...state,
            underPWH: action.pwh
        }
    },
})
