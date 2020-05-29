import {combineReducers} from 'redux'
import Users from './users';
import btn_status from './buttons';

const reducers = combineReducers({
    Users,
    btn_status
});

export default reducers
