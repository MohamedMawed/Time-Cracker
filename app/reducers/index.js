/*
 * combines all th existing reducers
 */
import * as loadingReducer from './loadingReducer'
import * as userReducer from './userReducer'
import * as noteReducer from './noteReducer'
import * as authReducer from './authReducer'
export default Object.assign(authReducer, loadingReducer, noteReducer, userReducer)
