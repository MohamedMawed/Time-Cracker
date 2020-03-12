import Api from 'app/api';
import ApiConstants from '../ApiConstants';

export function userList(token) {
    return Api(
        ApiConstants.USER_CRUD,
        null,
        'get',
        token,
    );
}

export function delUser(id,token) {
    return Api(
        ApiConstants.USER_CRUD+id+'/',
        null,
        'delete',
        token,
    );
}


export function addUser(username, password, token) {
    return Api(
        ApiConstants.USER_CRUD,
        {
             "username": username ,
             "password": password 
        },
        'post',
        token,
    );
}


export function editUser(id, username, password, token) {
    return Api(
        ApiConstants.NOTE_CRUD+id+'/',
        {
            ...(username && { "username": username }),
            ...(password && { "password": password }),
        },
        'patch',
        token,
    );
}
