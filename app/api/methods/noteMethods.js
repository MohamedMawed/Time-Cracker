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
