const initialState = {
    loggedIn: false,
    user: ' ',
    number: ' ',
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
