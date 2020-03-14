/*
 * Reducer actions related with login
 */
import * as types from './types';

export function listNotes(from, to) {
    return {
        type: types.NOTES_REQUEST,
        from: from,
        to: to
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

  export function changePWH(PWH){
    return {
        type: types.PWH,
        PWH:PWH
    }
}
export function getPWH(){
    return {
        type: types.PWH_GET,
    }
}

export function setTodayPWH(pwh){
    return {
        type: types.PWH_RESULT,
        pwh : pwh
    }
}
  
