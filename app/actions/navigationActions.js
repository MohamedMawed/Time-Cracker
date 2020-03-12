/*
 * Reducer actions related with navigation
 */
import NavigationService from 'app/navigation/NavigationService'
import { useDispatch, useSelector } from 'react-redux'

function checkUserType(userData){
    console.log(userData)
    if (userData) {
        let userType = userData.user.is_staff || userData.user.is_user_manager
        if (!userType)
            return 'Home'
        else 
            return 'HomeManager' // the only difference between the admin and 
    } else
        return 'Login'
}
export function navigateToHome(params) {
    NavigationService.navigate(checkUserType(params));
}
export function navigateToAddNote(params) {
    NavigationService.navigate('AddNote', params)
}

