import {createAction} from 'redux-actions'

 const disabled = createAction('DISABLE');
 const enable = createAction('ENABLE');


export default {disabled, enable};
