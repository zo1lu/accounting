'use client'
import { useRef, useState, useContext, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import { auth } from '../../../firebase/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

export default function Login(){
    const router = useRouter()
    const emailRef = useRef()
    const passwordRef = useRef()
    const [message, setMessage] = useState({"error":true,"content":""})
    let messageColor = message.error?"red":"rgb(85, 230, 63)"

    // async function loginHandler(e){
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
    //     const res = await fetch('/api/login',{ 
    //         method: 'POST', 
    //         headers: head, 
    //         body: JSON.stringify(body)})
    //     const data = await res.json();
    //     console.log(data)
    //     if(data.data){
    //         let user = data.data.user
    //         window.localStorage.setItem("userId",user.uid)
    //         window.localStorage.setItem("userEmail",user.email)
    //         setMessage(()=>{
    //             return {
    //                 "error":false,
    //                 "content":data.message
    //             }
    //         })
    //         router.push("/user/accounting")
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
    async function loginHandler(e){
        e.preventDefault();
        let email = emailRef.current.value
        let password = passwordRef.current.value
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            // console.log(user)
            setMessage(()=>{
                return {
                    "error":false,
                    "content":"Successfully Login!"
                }
            })
            router.push("/user/accounting")
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
        <div className='w-full h-screen flex flex-col items-center'>
            <form className="w-fit h-[400px] p-5 m-auto flex flex-col" onSubmit={loginHandler} method='POST'>
                <h1 className="text-center mb-4">Login</h1>
                <input className="w-48 h-10 p-3 my-1 border-solid border-2 border-sky-950 rounded-md" ref={emailRef} type="email" placeholder="email" required/>
                <input className="w-48 h-10 p-3 my-1 border-solid border-2 border-sky-950 rounded-md" ref={passwordRef} type="password" placeholder="password" autoComplete="on" required/>
                <button className="w-48 h-8 px-3 mt-4 border-solid border-2 border-sky-950" >Login</button>
                <p className='text-sm text-red mt-3'>Not sign up yet?  
                <Link className='underline' href="/signup"> Click here</Link></p>
                <p className='w-48 text-sm text-red mt-3' style={{color: messageColor}}>{message.content}</p>
            </form>
        </div>
    )
}