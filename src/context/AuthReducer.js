const AuthReducer = (state:Object, action:any) =>{
    switch (action.type){
        case "LOGIN":{
            return {
                currentUser: action.payload,
            }
        }
        case "LOGOUT":{
            return {
                currentUser: null,
            }
        }
        default:
            return state;
    }
}
export default AuthReducer;