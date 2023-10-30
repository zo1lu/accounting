'use client'
import {useEffect, useState} from 'react'
import Form from '../../../components/Form'
import { useRouter } from 'next/navigation'
import { onAuthStateChanged } from 'firebase/auth';
import { auth, onAuthStateChange } from '../../../firebase/firebase'
import { getAuth } from 'firebase/auth';
export default function Accounting(){
    let router = useRouter()
    const [user, setUser] = useState({uid:"",email:""})
    
    useEffect(()=>{
        const listner = onAuthStateChange(setUser)
        return listner
    },[])

    
    return(
        <>
            <div className='w-screen flex justify-center'>
                <Form user={user}/>
            </div>
        </>
    )
}