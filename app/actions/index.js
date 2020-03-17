// export action creators
import * as authActions from './authActions'
import * as userActions from './userActions'
import * as workingDayActions from './workingDayActions'
import * as navigationActions from './navigationActions'

export const ActionCreators = Object.assign(
  {},
  authActions,
  userActions,
  workingDayActions,
  navigationActions,

);
