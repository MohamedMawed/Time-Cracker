import Api from 'app/api'
import ApiConstants from '../ApiConstants'

// help adding the query parameters
function filterParams(from, to){
    qParams = ''
    if (from) {
        if (to)
            qParams = '?from=' + from + '&to=' + to
        else qParams = '?from=' + from
    } else {
        if (to)
            qParams = '?to=' + to
    }
    return qParams
}

export function sendReport(from, to, token) {
    return Api(
        ApiConstants.SEND_REPORT + filterParams(from, to),
        null,
        'get',
        token,
    )
}

export function noteList(from, to, token) {
    return Api(
        ApiConstants.NOTE_CRUD + filterParams(from, to),
        null,
        'get',
        token,
    )
}


export function delNote(id,token) {
    return Api(
        ApiConstants.NOTE_CRUD+id+'/',
        null,
        'delete',
        token,
    )
}


export function addNote(workingDay, token) {
    return Api(
        ApiConstants.NOTE_CRUD,
        {
             'date': workingDay.date ,
             'hours': workingDay.hours,
             'preferredWorkingHours': workingDay.preferredWorkingHours,
             'dayNotes': workingDay.dayNotes
        },
        'post',
        token,
    )
}


export function editNote(id, workingDay, token) {
    return Api(
        ApiConstants.NOTE_CRUD+id+'/',
        {
            'date': workingDay.date ,
            'hours': workingDay.hours,
            'preferredWorkingHours': workingDay.preferredWorkingHours,
            'dayNotes': workingDay.dayNotes 
        },
        'patch',
        token,
    )
}

export function changePWH(pwh,token){
    return Api(
        ApiConstants.PWH,
        {
            'prefferedWorkingHours': pwh
        },
        'post',
        token,
    )
    
}


export function getUserWorkingDays(user_id, token){
    return Api(
        ApiConstants.USER_WORKING_DAYS+user_id+'/',
        null,
        'get',
        token,
    )  
}
export function getPWH(token){
    return Api(
        ApiConstants.PWH,
        null,
        'get',
        token,
    )
    
}