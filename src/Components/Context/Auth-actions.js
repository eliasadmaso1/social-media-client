export const LoginStart = ()=>({
    type:"LOGIN_START"
});

export const LoginSuccess = (user)=>({
    type:"LOGIN_SUCCESS",
    payload:user

});

export const LoginFailed = (error)=>({
    type:"LOGIN_FAILURE",
    payload:error

})

export const Follow = (userId)=>({
    type:"FOLLOW",
    payload:userId

});


export const UnFollow = (userId)=>({
    type:"UNFOLLOW",
    payload:userId

});

export const LogOut = ()=>({
    type:"LOOGUOT",
    payload:null
})

export const UpdateUser = (user)=>({
    type:"UPDATE",
    payload:user
})



