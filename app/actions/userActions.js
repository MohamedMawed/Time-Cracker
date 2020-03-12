/*
 * Reducer actions related with login
 */
import * as types from './types';

export function listUsers() {
  return {
    type: types.USERS_REQUEST,
  };
}

export function listUsersFailed() {
    return {
      type: types.USERS_FAILED,
    };
  }
  
  export function onlistUsersResponse(response) {
    return {
      type: types.USERS_REQUEST_RESPONSE,
      response,
    };
  }

  export function delUser(id) {
    return {
      type: types.USERS_DELETE,
      user_id : id
    };
  }

  export function addUser(user) {
    return {
      type: types.USERS_ADD,
      user : user
    };
  }

  export function editUser(id , user) {
    return {
      type: types.USERS_EDIT,
      user_id : id,
      user : user
    };
  }

