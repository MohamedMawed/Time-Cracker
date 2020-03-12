/* Notes Reducer
 * handles all kind of transactions made on the user notes
 */
import createReducer from 'app/lib/createReducer'
import * as types from 'app/actions/types'

const initialState = {
    users: []
}

export const userReducer = createReducer(initialState, {
    [types.USERS_REQUEST](state, action) {
        return {
            ...state,
        }
    },
    [types.USERS_REQUEST_RESPONSE](state, action) {
        return {
            ...state,
            users: action.response,
        }
    },
    [types.USERS_DELETE](state, action) {
        return {
            ...state,
            note_id: action.note_id
        }
    },
    [types.USERS_ADD](state, action) {
        return {
            ...state,
            note_id: action.note_id,
            note: action.note,
            start: action.start,
            end: action.end,
        }
    },
    [types.USERS_EDIT](state, action) {
        return {
            ...state,
            note: action.note,
            start: action.start,
            end: action.end,
        }
    },
})
