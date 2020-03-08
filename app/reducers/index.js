/*
 * combines all th existing reducers
 */
import * as loadingReducer from './loadingReducer';
import * as noteReducer from './noteReducer';
import * as loginReducer from './loginReducer';
export default Object.assign(loginReducer, loadingReducer, noteReducer);
