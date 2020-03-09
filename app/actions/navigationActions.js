/*
 * Reducer actions related with navigation
 */
import NavigationService from 'app/navigation/NavigationService'
import { useDispatch, useSelector } from 'react-redux'

export function navigateToHome(params) {
    NavigationService.navigate('Home', params);
}
export function navigateToAddNote(params) {
    NavigationService.navigate('AddNote', params)
}

