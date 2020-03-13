/*
 * Reducer actions related with navigation
 */
import NavigationService from 'app/navigation/NavigationService'

export function checkUserType(userData){
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
    let screen = checkUserType(params)
    console.log(screen)
    NavigationService.reset(screen)
}
export function replaceToHome() {
    NavigationService.navigate('Home')
}
export function replaceToHomeManager() {
    NavigationService.navigate('Home')
}

