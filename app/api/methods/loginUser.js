import Api from 'app/api'
import ApiConstants from '../ApiConstants'

export function loginUser(username, password) {
    return Api(
        ApiConstants.LOGIN,
        {
            "username": username,
            "password": password
        },
        'post',
        null,
    )
}


export function registerUser(user) {
    return Api(
        ApiConstants.REGISTER,
        {
            "username": user.username,
            "password": user.password,
            "email": user.email,
            "is_user_manager": user.is_user_manager
        },
        'post',
        null,
    )
}
