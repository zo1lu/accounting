'use client'
import {useEffect, useState} from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { getAuth, signOut } from "firebase/auth";
import { auth, onAuthStateChange } from '../firebase/firebase'


export default function Home() {
  const [user, setUser] = useState({uid:"",email:""})
  const route = useRouter()
  useEffect(()=>{
    const listner = onAuthStateChange(setUser)
    return listner
  },[])

  function logout(){
    signOut(auth).then(() => {
      console.log("click log out button")
    }).catch((error) => {
      console.log(error)
    });
    setUser({uid:"", email:""})
  }

  return (
      <>
        <div className='w-full h-auto bg-sky-950 flex items-center justify-center'>
          <h1 className='w-fit h-auto text-neutral-50 text-lg text-center py-10'>React Practice</h1>
          {user.uid?
          <button className='w-40 h-10 p-auto border-solid border-2 text-neutral-50 border-neutral-50 rounded-md absolute right-5' onClick={logout}>
          Log out
          </button>:
          <button className='w-40 h-10 p-auto border-solid border-2 text-neutral-50 border-neutral-50 rounded-md absolute right-5'>
          <Link className='block' href="/login">SignUp / Login</Link>
          </button> 
          }
        </div>
        <section className='w-full h-80 flex  bg-sky-100'>
          <p className='m-auto text-lg'>Welcome accounting tool</p>
        </section>
        <main className='w-full h-30 p-10 flex'>
          <button className='w-20 h-10 p-auto m-auto border-solid border-2 border-sky-950 rounded-md'>
            <Link className='block' href={user.uid?"/user/accounting":"/login"}>Start</Link>
          </button>
        </main>
      </>
  )
}
