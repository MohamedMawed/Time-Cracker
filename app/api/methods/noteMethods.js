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


export function addNote(note, token) {
    return Api(
        ApiConstants.NOTE_CRUD,
        {
             'date': note.date ,
             'hours': note.hours,
             'preferredWorkingHours': note.preferredWorkingHours,
             'dayNotes': note.dayNotes
        },
        'post',
        token,
    )
}


export function editNote(id, note, token) {
    return Api(
        ApiConstants.NOTE_CRUD+id+'/',
        {
            'date': note.date ,
            'hours': note.hours,
            'preferredWorkingHours': note.preferredWorkingHours,
            'dayNotes': note.dayNotes 
        },
        'patch',
        token,
    )
}

export function changePWH(token){
    return Api(
        ApiConstants.PWH,
        {
            'date':new Date().toISOString().split('T')[0]
        },
        'post',
        token,
    )
    
}

export function getPWH(token){
    return Api(
        ApiConstants.PWH_TODAY,
        null,
        'get',
        token,
    )
    
}