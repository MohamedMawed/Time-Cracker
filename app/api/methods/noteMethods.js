import Api from 'app/api';
import ApiConstants from '../ApiConstants';

export function noteList(token) {
    return Api(
        ApiConstants.NOTE_CRUD,
        null,
        'get',
        token,
    );
}

export function delNote(id,token) {
    return Api(
        ApiConstants.NOTE_CRUD+id+'/',
        null,
        'delete',
        token,
    );
}


export function addNote(note, start, end, token) {
    return Api(
        ApiConstants.NOTE_CRUD,
        {
             "note": note ,
             "start": start ,
             "end": end 
        },
        'post',
        token,
    );
}


export function editNote(id, note, start, end, token) {
    return Api(
        ApiConstants.NOTE_CRUD+id+'/',
        {
            ...(note && { "note": note }),
            ...(start && { "start": start }),
            ...(end && { "end": end }) 
        },
        'patch',
        token,
    );
}
