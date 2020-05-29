import {createAction} from 'redux-actions'

const add = createAction('ADD');
const edit = createAction('EDIT');
const remove = createAction('REMOVE');
const findUserAsync = createAction('FIND_USER_ASYNC');


export default {add, edit, remove, findUserAsync};
