import type { NextApiRequest, NextApiResponse } from 'next'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from '../../src/firebase/firebase'
const auth = getAuth(app);

interface ResponseData {
    data?: Object;
    error?: Boolean;
    message?: string;
}

export default function login(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>
) {
    if(req.method==='POST'){
        const {email, password} = req.body
        //signup
        try{
            signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                res.status(200).json({ data: {user: user}, message:"Successfully login"})
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                res.json({ error: true, message: errorMessage })
            });
        }catch(e){
            console.log(e)
            res.status(500).json({ error: true, message: "something went wrong in server" })
        }   
    }
}
