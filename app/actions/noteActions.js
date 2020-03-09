/*
 * Reducer actions related with login
 */
import * as types from './types';

export function listNotes() {
  return {
    type: types.NOTES_REQUEST,
  };
}

export function listNotesFailed() {
    return {
      type: types.NOTES_FAILED,
    };
  }
  
  export function onlistNotesResponse(response) {
    return {
      type: types.NOTES_RESPONSE,
      response,
    };
  }

  export function delNote(id) {
    return {
      type: types.NOTES_DELETE,
      note_id : id
    };
  }

  export function addNote(note) {
    return {
      type: types.NOTES_ADD,
      note : note
    };
  }

  export function editNote(id , note) {
    return {
      type: types.NOTES_EDIT,
      note_id : id,
      note : note
    };
  }

