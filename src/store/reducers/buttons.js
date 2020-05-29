import {createReducer} from 'redux-create-reducer';

const btns = {
    disabled: false
};

const btn = createReducer(btns, {
    DISABLE: (state) => {
        return {...state, disabled: true}
    },
    ENABLE: (state) => {
        return {...state, disabled: false}
    },
});
export default btn

