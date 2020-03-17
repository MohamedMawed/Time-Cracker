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

export function delUser(id, token) {
    return Api(
        ApiConstants.USER_CRUD + id + '/',
        null,
        'delete',
        token,
    );
}


export function addUser(user, token) {
    return Api(
        ApiConstants.USER_CRUD,
        {
            "username": user.username,
            "password": user.password,
            "email": user.email,
            "is_user_manager": user.is_user_manager
        },
        'post',
        token,
    );
}


export function editUser(id, user, token) {
    return Api(
        ApiConstants.USER_CRUD + id + '/',
        {
            "username": user.username,
            "email": user.email,
            "is_user_manager": user.is_user_manager,
        },
        'patch',
        token,
    );
}
