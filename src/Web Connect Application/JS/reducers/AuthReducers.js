const initialState = {
    loggedIn: false,
<<<<<<< HEAD
    user: '',
    number: '',
=======
<<<<<<< HEAD:src/Web Connect Application/JS/reducers/AuthReducers.js
    user: ' ',
    number: ' ',
=======
    user: '',
    number: '',
>>>>>>> 7bf7633bfe96ce12f9aa88f9ccb8f194e94952a9:src/ChatApp/JS/reducers/AuthReducers.js
>>>>>>> 06988192b1a171af0fdc797f60253687ded5b0bc
    profile_pic: ' ',
}

const authReducer = (state, action) => {

    if (action.type === "SET_USER") {
        const newstate = { ...state, user: action.payload.user, loggedIn: action.payload.loggedIn, number: action.payload.number, profile_pic: action.payload.profile_pic }
        return newstate
    }

    if (action.type === "UPDATE_USER") {
        const newstate = { ...state, user: action.payload.user, profile_pic: action.payload.profile_pic }
        return newstate
    }
    if (action.type === "LOGOUT") {
        const newstate = {
            loggedIn: false,
            user: null,
            number: null,
            profile_pic: null,
        }
        return newstate
    }
    return state;
}

export {
    initialState,
    authReducer
}
