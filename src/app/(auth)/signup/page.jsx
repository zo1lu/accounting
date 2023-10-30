'use client'
import { useRef, useState } from 'react'
import Link from 'next/link'
import {createUserWithEmailAndPassword} from 'firebase/auth'
import { auth } from '../../../firebase/firebase';
import { db } from "../../../firebase/firebase"
import { useRouter } from 'next/navigation'
import { collection, addDoc } from "firebase/firestore"; 

export default function Signup(){
    const router = useRouter()
    const emailRef = useRef(null)
    const passwordRef = useRef(null)
    const [message, setMessage] = useState({"error":true,"content":""})
    let messageColor = message.error?"red":"rgb(85, 230, 63)"

    // async function signupHandler(e){
    //     e.preventDefault();
    //     let email = emailRef.current.value
    //     let password = passwordRef.current.value
    //     let body = {
    //         email: email,
    //         password: password
    //     }
    //     let head = {
    //         'Content-Type': 'application/json'
    //     }
    //     const res = await fetch('/api/signup',{ 
    //         method: 'POST', 
    //         headers: head, 
    //         body: JSON.stringify(body)})
    //     const data = await res.json();
    //     console.log(data)
    //     if(data.data){
    //         console.log(data.data)
    //         setMessage(()=>{
    //             return {
    //                 "error":false,
    //                 "content":data.message
    //             }
    //         })

    //     }else if(data.error){
    //         console.log(data.error)
    //         setMessage(()=>{
    //             return {
    //                 "error":true,
    //                 "content":data.message
    //             }
    //         })
    //     }
    // }
    async function signupHandler(e){
        e.preventDefault();
        let email = emailRef.current.value
        let password = passwordRef.current.value
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            // console.log(user)
            setMessage(()=>{
                return {
                    "error":false,
                    "content":"Successfully Sign Up"
                }
            })
            router.push("/login")
        })
        .catch((error) => {
            const errorMessage = error.message;
            setMessage(()=>{
                return {
                    "error":true,
                    "content":errorMessage
                }
            })
        });
    }

    return(
        <>
            <div className='w-full h-screen flex flex-col items-center'>
                <form className="w-fit h-[400px] p-5 m-auto flex flex-col" onSubmit={signupHandler} method='POST'>
                    <h1 className="text-center mb-4">Signup</h1>
                    <input className="w-48 h-10 p-3 my-1 border-solid border-2 border-sky-950 rounded-md" ref={emailRef} type="email" placeholder="email" required/>
                    <input className="w-48 h-10 p-3 my-1 border-solid border-2 border-sky-950 rounded-md" ref={passwordRef} type="password" placeholder="password" name="password" autoComplete="on" required/>
                    <button className="w-48 h-8 px-3 mt-4 border-solid border-2 border-sky-950" type='submit'>Sign up</button>
                    <p className='w-48 text-sm  mt-3 text-center' style={{color: messageColor}}>{message.content}</p>
                    <p className='text-sm text-red mt-3'>I already have account &rarr;
                    <Link className='underline' href="/login"> Click here</Link></p>
                    <p className='text-sm text-red mt-3'>Not interested &rarr;
                    <Link className='underline' href="/"> Back Home</Link></p>
                </form>
            </div>
        </>
    )
}