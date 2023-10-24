'use client'
import { useState } from 'react'
import ListRow from './ListRow'
import Link from 'next/link'
const rawList = [
    {
        type:"income",
        title:"2023 Oct Salary",
        cost:"3000"
    },{
        type:"expense",
        title:"Grocery",
        cost:"100"
    },{
        type:"expense",
        title:"Concert",
        cost:"100"
    },{
        type:"income",
        title:"Lottery",
        cost:"50"
    },
]
const initForm = {
    type:"income",
    title:"",
    cost:""
}
function getSum(list){
    let sum = 0 
    list.forEach((element)=>{
        element.type=="income"?sum+=parseInt(element.cost):sum-=parseInt(element.cost)
    })
    return sum
}
export default function Form(){
    const [balance, setBalance] = useState(getSum(rawList))
    const [list, setList] = useState(rawList)
    const [form, setForm] = useState(initForm)
    
    function onChangeType(e){
        setForm((currentState)=>{
            return {...currentState, type: e.target.value}
        })
    }
    function onChangeTitle(e){
        setForm((currentState)=>{
            return {...currentState, title: e.target.value}
        })
    }
    function onChangeCost(e){
        setForm((currentState)=>{
            return {...currentState, cost: e.target.value}
        })
    }

    function handleSubmit(e){
        e.preventDefault();
        const {type, title, cost} = form
        setList((prevList)=>{
            let newList = [...prevList,{
                type: type,
                title: title,
                cost: cost
            }]
            setBalance(getSum(newList))
            return newList
        })
        //clear input
        setForm(initForm)
    }

    function deleteListByKey(key){
        setList((prevList)=>{
            let newList = prevList.toSpliced(key,1)
            setBalance(getSum(newList))
            return newList
        })
    }


    return (
    <div className='w-full h-full flex flex-col items-center'>
        <form className="w-2/5 h-fit flex flex-row justify-between p-5" onSubmit={handleSubmit}>
            <select className='w-25 h-10 px-3 border-solid border-2 border-sky-950 rounded-md' value={form.type} onChange={onChangeType}> 
                <option value="income">Income</option>
                <option value="expense">Expense</option>
            </select>
            <input className='min-w-25 h-10 p-3 border-solid border-2 border-sky-950 rounded-md' type='text' placeholder='title' value={form.title} onChange={onChangeTitle} required/>
            <input className='min-w-25 h-10 p-3 border-solid border-2 border-sky-950 rounded-md' type='number' placeholder='cost' min={0} value={form.cost} onChange={onChangeCost} required/>
            <button className='w-fit h-10 px-3 border-solid border-2 border-sky-950 rounded-md'>Submit</button>  
        </form>
        <hr className='w-full border-solid border-1 border-sky-950'/>
        <div className='w-2/5 h-fit m-auto py-10 flex flex-col items-center px-5'>
            {list.map((element,index)=>{
                return <ListRow key={index} id={index} type={element.type} title={element.title} cost={element.cost} deleteHandler={deleteListByKey}/>
            })}
        </div>
        <p className='w-full mb-10 text-center'>Balance: {balance}</p>
        <button className='w-30 h-10 px-3 border-solid border-2 border-sky-950 rounded-md'>
            <Link className='block' href="/">Back Home</Link>
        </button>  
    </div>
    )
}