/* Notes Reducer
 * handles all kind of transactions made on the user notes
 */
import createReducer from 'app/lib/createReducer';
import * as types from 'app/actions/types';

const initialState = {
  notes : []
};

export const noteReducer = createReducer(initialState, {
  [types.NOTES_REQUEST](state, action) {
    return {
      ...state,
    };
  },
  [types.NOTES_RESPONSE](state, action) {
    return {
      ...state,
      notes: action.response,
    };
  },
  [types.NOTES_DELETE](state, action) {
    return {
      ...state,
      note_id : action.note_id
    };
  },
});
