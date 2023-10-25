export default function ListRow({id, type, title, cost, deleteHandler}){
    let styleColor = type==="income"?"rgb(61, 242, 109)":"rgb(242, 61, 61)"
    let costNumber = type==="expense"? parseInt(cost)*(-1):parseInt(cost)

    return (
        <div key={id} className='flex w-[650px] my-3 justify-between'>
            <p className='w-20' style={{color: styleColor}}>{costNumber}</p>
            <p className='w-full flex-shrink'>{title}</p>
            <button className='w-30 h-8 px-3 border-solid border-2 border-sky-950' onClick={()=>{deleteHandler(id)}}>Delete</button> 
        </div> 
    )
}