/*
 * Reducer actions related with login
 */
import * as types from './types';


export function sendReport(from, to) {
    return {
        type: types.SEND_REPORT,
        from: from,
        to: to
    };
}
export function listNotes(from, to) {
    return {
        type: types.WORKING_DAY_REQUEST,
        from: from,
        to: to
    };
}

export function changeSetting(pwh) {
    return {
        type: types.PWH,
        pwh: pwh
    }
}

export function getSettings() {
    return {
        type: types.PWH_GET,
    }
}
export function getPwhResponse(pwh) {
    return {
        type: types.PWH_RESULT,
        pwh: pwh
    }
}




export function listNotesFailed() {
    return {
      type: types.WORKING_DAY_FAILED,
    };
  }
  
  export function onlistNotesResponse(response) {
    return {
      type: types.WORKING_DAY_RESPONSE,
      response,
    };
  }

  export function delNote(id) {
    return {
      type: types.WORKING_DAY_DELETE,
      workingDay_id : id
    };
  }

  export function addNote(workingDay) {
    return {
      type: types.WORKING_DAY_ADD,
      workingDay : workingDay
    };
  }

  export function listWorkingDaysForUser(id){
    return {
        type : types.USER_WORKING_DAYS,
        user_id : id
    }
}

export function listWorkingDaysForUserResponse(list){
    return {
        type : types.USER_WORKING_DAYS_RESPONSE,
        userWorkingDays : list
    }
}

  export function editNote(id, workingDay) {
    return {
      type: types.WORKING_DAY_EDIT,
      workingDay_id : id,
      workingDay : workingDay
    };
  }
