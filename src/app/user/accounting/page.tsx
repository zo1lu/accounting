'use client'
import {useContext, useEffect, useState} from 'react'
import Form from '../../../components/Form'
import { useRouter } from 'next/navigation'
import { onAuthStateChanged } from 'firebase/auth';
import { auth, onAuthStateChange } from '../../../firebase/firebase'
import { getAuth } from 'firebase/auth';
import { AuthContext } from '@/context/AuthContext';
import { set } from 'firebase/database';

export default function Accounting(){
    let router = useRouter()
    const [user, setUser] = useState({uid:"",email:""})
    
    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser({uid: user.uid, email: user.email})
            } else {
                router.push("../login")
            }
        })
        return unsubscribe
    }, [])

    return(
        <>
            <div className='w-screen flex justify-center'>
                <Form user={user}/>
            </div>
        </>
    )
}