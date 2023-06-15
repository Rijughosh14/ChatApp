const initialChatState = {
    loggedIn: true,
    user: '',
    id: '',
    phone_number:'',
    set: '',
    profile_pic: '',
    profileState:false
}

const authChatReducer = (state, action) => {
    if (action.type === "SET_USER") {
        const newstate = { ...state, user: action.payload.user, loggedIn: action.payload.loggedIn, id: action.payload.id, set: action.payload.set, profile_pic: action.payload.profile_pic,profileState:false,phone_number:action.payload.phone_number }
        return newstate
    }
    if (action.type === "SET_PROFILE") {
        const newstate = { ...state, profileState: action.payload.profileState }
        return newstate
    }
}

export {
    initialChatState,
    authChatReducer
}