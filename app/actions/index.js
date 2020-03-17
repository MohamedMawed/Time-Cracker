// export action creators
import * as authActions from './authActions'
import * as userActions from './userActions'
import * as noteActions from './noteActions'
import * as navigationActions from './navigationActions'

export const ActionCreators = Object.assign(
  {},
  authActions,
  userActions,
  noteActions,
  navigationActions,

);
