let initialCallstate={
    caller:'',
    callerName:'',
    callee:'',
    Media:null,
    Peer:null,
    Signal:null,
    FriendMedia:null,
    Status:''
}

// window.onload=function(){
//     const serializedUser = sessionStorage.getItem('userCall');
//     const user=JSON.parse(serializedUser);
//     if(user){
//          initialCallstate=user;
//     }
// }


const CallReducer=(state,action)=>{
    if(action.type==='SET_CALL'){
        const newstate={...state,caller:action.payload.caller,callee:action.payload.callee,Media:action.payload.Media,Peer:action.payload.Peer,Status:action.payload.Status,Signal:action.payload.Signal,FriendMedia:action.payload.FriendMedia,callerName:action.payload.callerName}
        // const user=JSON.stringify(newstate)
        // //storing call data
        // sessionStorage.setItem('userCall',user)
        return newstate
    }

    if(action.type==='UPDATE_STATUS'){
        const newstate={...state,Status:action.payload.Status}
        // let user=JSON.parse(sessionStorage.getItem('userCall'))
        // user=JSON.stringify(newstate)
        // sessionStorage.setItem('userCall',user)
        return newstate
    }
    if(action.type==='UPDATE_SIGNAL'){
        const newstate={...state,Signal:action.payload.Signal}
        // let user=JSON.parse(sessionStorage.getItem('userCall'))
        // user=JSON.stringify(newstate)
        // sessionStorage.setItem('userCall',user)
        return newstate
    }
    if(action.type==='UPDATE_FMEDIA'){
        const newstate={...state,FriendMedia:action.payload.FriendMedia}
        // let user=JSON.parse(sessionStorage.getItem('userCall'))
        // user=JSON.stringify(newstate)
        // //storing user data
        // sessionStorage.setItem('userCall',user)
        return newstate
    }
    if(action.type==='DISCONNECT'){
        // sessionStorage.removeItem('userCall')
        return initialCallstate
    }
}

export {
    initialCallstate,
    CallReducer
}