import { createContext, useReducer } from 'react';
import AuthReducer from './AuthReducer';

const init_state = {
    currentUser: null,
    uid: null,
    email: null
}
export const AuthContext = createContext(init_state);

// export const AuthContextProvider = ({children})=>{
//     const [state, dispatch] = useReducer(AuthReducer, init_state);

//     return (
//         <AuthContext.Provider value={{currentUser: state.currentUser, dispatch}}>
//             {children}
//         </AuthContext.Provider>
//     )
// }
