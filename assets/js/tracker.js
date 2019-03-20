import { createStore, combineReducers } from 'redux';
import deepFreeze from 'deep-freeze';

function tasks(state = [], action) {
  switch (action.type) {
    case 'TASK_LIST':
    return action.data;
    case  'TASK_DELETE':
    return _.filter(state, (task) => task.id != action.task_id)
    default:
    return state;
  }
}

function users(state = [], action) {
  switch (action.type) {
    case 'USER_LIST':
    return action.data;
    default:
    return state;
  }
}

function times(state = [], action) {
  switch (action.type) {
    case 'TIME_LIST':
    return action.data;
    case 'TIME_DELETE':
    return _.filter(state, (time) => time.id != action.time_id);
    default:
    return state;
  }
}

function session(state = null, action) {
  switch (action.type) {
    case 'NEW_SESSION':
    return action.data;
    default:
    return state;
  }
}

let login_form0 = {email: "", password: ""};
function login_form(state = login_form0, action) {
  switch (action.type) {
    case 'UPDATE_LOGIN_FORM':
    return Object.assign({}, state, action.data);
    break;
    default:
    return state;
  }
}

function make_time_forms(state = new Map(), action) {
  switch (action.type) {
    case 'UPDATE_ADD_TIME_FORM':
    let state1 = new Map(state);
    state1.set(action.task_id, action.minutes);
    return state1;
    default:
    return state;
  }
}

function root_reducer(state0, action) {
  console.log("reducer", state0, action);

  let reducer = combineReducers({tasks, users, times, session, login_form, make_time_forms});
  let state1 = reducer(state0, action);

  console.log("reducer1", state1);

  return deepFreeze(state1);
}


let tracker = createStore(root_reducer);
export default tracker;
