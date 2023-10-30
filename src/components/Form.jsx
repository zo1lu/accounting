'use client'
import { useState, useEffect, useRef } from 'react'
import ListRow from './ListRow'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { doc, getDocs, deleteDoc } from "firebase/firestore"; 
import { collection, addDoc } from "firebase/firestore"; 
import { query, orderBy, where } from "firebase/firestore";  
import { db, auth } from "../firebase/firebase"
import { serverTimestamp } from 'firebase/firestore'
import { logout } from '../firebase/firebase'

// const rawList = [
//     {
//         type:"income",
//         title:"2023 Oct Salary",
//         cost:"3000"
//     },{
//         type:"expense",
//         title:"Grocery",
//         cost:"100"
//     },{
//         type:"expense",
//         title:"Concert",
//         cost:"100"
//     },{
//         type:"income",
//         title:"Lottery",
//         cost:"50"
//     },
// ]
function getSum(list){
    let sum = 0 
    list.forEach((element)=>{
        element.type=="income"?sum+=parseInt(element.cost):sum-=parseInt(element.cost)
    })
    return sum
}

export default function Form({user}){
    let rawList = []
    const [balance, setBalance] = useState(()=>getSum(rawList))
    const [list, setList] = useState([])
    const typeRef = useRef()
    const titleRef = useRef()
    const costRef = useRef()
    const route = useRouter()

    async function getDataFromFirestore(uid){
        //get data
        // const user = auth.currentUser
        // console.log(user)
        try{
            const accountingListRef = collection(db, "accountingList");
            const q = query(accountingListRef, where("userId", "==", uid), orderBy("timeStamp"));
            const querySnapshot = await getDocs(q);
            rawList=[]
            querySnapshot.forEach((doc) => {
                // console.log(doc.data())
                rawList.push({id: doc.id, ...doc.data()})
            });
            setList([...rawList])
        }catch(e){
            console.log(e)
        }
    }
    useEffect(()=>{
        if(user.uid){
            getDataFromFirestore(user.uid)
        }
    },[user])

    useEffect(()=>{
        setBalance(getSum(list))
    },[list])

    async function handleSubmit(e){
        e.preventDefault();
        const type = typeRef.current.value;
        const title = titleRef.current.value;
        const cost = costRef.current.value;
        try{
            const docRef = await addDoc(collection(db, "accountingList"), {
                type: type,
                title: title,
                cost: cost,
                timeStamp: serverTimestamp(),
                userId: user.uid
            });
            // console.log(docRef)
            // console.log("Add")
            getDataFromFirestore(user.uid)
        }catch(e){
            console.error(e)
        }
        //clear input
        titleRef.current.value = null
        costRef.current.value = null
    }

    async function deleteListByKey(key){
        await deleteDoc(doc(db, "accountingList", key))
        getDataFromFirestore(user.uid)
    }
    function logoutHandler(){
        logout()
        route.push("/")
    }

    return (
    <div className='w-full h-full flex flex-col items-center'>
        <p className='w-30 h-10 px-3 absolute top-5 left-5 text-lg'>Hi, {user.email}</p>
        <button className='w-30 h-10 px-3 border-solid border-2 border-sky-950 rounded-md absolute top-5 right-5' onClick={logoutHandler}>Log out</button>
        <form className="w-[700px] h-fit flex flex-row justify-between p-5" onSubmit={handleSubmit}>
            <select className='w-25 h-10 px-3 border-solid border-2 border-sky-950 rounded-md' ref={typeRef}> 
                <option value="income">Income</option>
                <option value="expense">Expense</option>
            </select>
            <input className='min-w-25 h-10 p-3 border-solid border-2 border-sky-950 rounded-md' type='text' placeholder='title' ref={titleRef} required/>
            <input className='min-w-25 h-10 p-3 border-solid border-2 border-sky-950 rounded-md' type='number' placeholder='cost' min={0} ref={costRef} required/>
            <button className='w-fit h-10 px-3 border-solid border-2 border-sky-950 rounded-md'>Submit</button>  
        </form>
        <hr className='w-full border-solid border-1 border-sky-950'/>
        <div className='w-full h-fit m-auto py-10 flex flex-col items-center px-5'>
            {list.map((element, index)=>{
                return <ListRow key={index} id={element.id} type={element.type} title={element.title} cost={element.cost} deleteHandler={deleteListByKey}/>
            })}
        </div>
        <p className='w-full mb-10 text-center'>Balance: {balance}</p>
        <button className='w-30 h-10 px-3 border-solid border-2 border-sky-950 rounded-md'>
            <Link className='block' href="/">Back Home</Link>
        </button>  
    </div>
    )
}