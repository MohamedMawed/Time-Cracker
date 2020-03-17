/*
 * combines all th existing reducers
 */
import * as loadingReducer from './loadingReducer'
import * as userReducer from './userReducer'
import * as workingDayReducer from './workingDayReducer'
import * as authReducer from './authReducer'
export default Object.assign(authReducer, loadingReducer, workingDayReducer, userReducer)
