import Api from 'app/api'
import ApiConstants from '../ApiConstants'

export function noteList(token) {
    return Api(
        ApiConstants.NOTE_CRUD,
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


export function addNote(note, date, hours, token) {
    return Api(
        ApiConstants.NOTE_CRUD,
        {
             "note": note ,
             "date": date ,
             "hours": hours 
        },
        'post',
        token,
    )
}


export function editNote(id, note, date, hours, token) {
    return Api(
        ApiConstants.NOTE_CRUD+id+'/',
        {
            ...(note && { "note": note }),
            ...(date && { "date": date }),
            ...(hours && { "hours": hours }) 
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