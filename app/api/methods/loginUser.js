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


export function registerUser(username, email, password, is_user_manager) {
    console.log('fsdhfkjdshk ',email)
    return Api(
        ApiConstants.REGISTER,
        {
            "username": username,
            "password": password,
            "email": email,
            "is_user_manager": is_user_manager
        },
        'post',
        null,
    )
}
