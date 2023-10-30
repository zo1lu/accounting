import type { NextApiRequest, NextApiResponse } from 'next'

import { getAuth } from "firebase/auth";
import { app } from '../../src/firebase/firebase'
import { createUserWithEmailAndPassword } from "firebase/auth";

interface ResponseData {
    data?: Object;
    error?: Boolean;
    message?: string;
}
const auth = getAuth(app)

export default function signup(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>
) {
    if(req.method==='POST'){
        const {email, password} = req.body
        //signup
        try{
            createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed up 
                const user = userCredential.user;
                console.log(user)
                res.status(200).json({ data: {user: user}, message:"Successfully sign up"})
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