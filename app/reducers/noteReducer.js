/* Notes Reducer
 * handles all kind of transactions made on the user notes
 */
import createReducer from 'app/lib/createReducer'
import * as types from 'app/actions/types'

const initialState = {
    notes: [],
    underPWH:false
}

export const noteReducer = createReducer(initialState, {
    [types.NOTES_REQUEST](state, action) {
        return {
            ...state,
        }
    },
    [types.NOTES_RESPONSE](state, action) {
        return {
            ...state,
            notes: action.response,
        }
    },
    [types.NOTES_DELETE](state, action) {
        return {
            ...state,
            note_id: action.note_id
        }
    },
    [types.NOTES_ADD](state, action) {
        return {
            ...state,
            note_id: action.note_id,
            note: action.note,
            start: action.start,
            end: action.end,
        }
    },
    [types.NOTES_EDIT](state, action) {
        return {
            ...state,
            note: action.note,
            start: action.start,
            end: action.end,
        }
    },
    [types.PWH](state, action) {
        return {
            ...state,
            PWH:action.PWH
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
            underPWH : action.pwh
        }
    },
})
