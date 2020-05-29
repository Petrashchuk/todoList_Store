import {createReducer} from 'redux-create-reducer';

const users = [{
    first_name: 'Ivan',
    last_name: 'Ivanov',
    id: 1
}, {
    first_name: 'Petro',
    last_name: 'Petriv',
    id: 2
}, {
    first_name: 'Pavlo',
    last_name: 'Pavliv',
    id: 3
}];
const Users = createReducer(users, {
    ADD: (state, action) => {
        return [
            ...state,
            action.payload
        ]
    },
    REMOVE: (state, action) => {
        const filteredArr = state.filter(item => item.id !== action.payload.id);
        return [...filteredArr]
    },
    EDIT: (state, action) => {
        const filteredArr = state.findIndex(item => item.id === action.payload.id);
        state.splice(filteredArr, 1, action.payload);
        return [...state]
    },
    FIND_USER_ASYNC: (state, action) => {
        const user = state.find(item => item.id === action.payload.id);
        console.log(user);
        return [...state]
    }
});

// function User(state = users, action) {
//     debugger
//     switch (action.type) {
//         case'ADD': {
//             return [
//                 ...users,
//                 action.payload
//             ]
//         }
//         case'REMOVE': {
//             return []
//         }
//         case'EDIT': {
//             return []
//         }
//         default:
//             return users;
//     }
// }

export default Users
