export default function ListRow({id,type,title,cost,deleteHandler}){
    return (
        <div key={id} className='flex w-full my-3 justify-between'>
            <p className='w-20' style={{color: type==="income"?"rgb(61, 242, 109)":"rgb(242, 61, 61)"}}>{type=="expense"&&"-"}{cost}</p>
            <p className='w-4/5'>{title}</p>
            <button className='w-30 h-8 px-3 border-solid border-2 border-sky-950' onClick={()=>{deleteHandler(id)}}>Delete</button> 
        </div> 
    )
}