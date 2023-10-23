import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <>
      <h1 className='w-full h-auto  bg-sky-950 text-neutral-50 text-lg text-center py-10'>React Practice</h1>
      <section className='w-full h-80 flex  bg-sky-100'>
        <p className='m-auto text-lg'>Welcome accounting tool</p>
      </section>
      <main className='w-full h-30 p-10 flex'>
        <button className='w-20 h-10 m-auto p-auto border-solid border-2 border-sky-950 rounded-md'>
          <Link className='block' href="/accounting">Start</Link>
        </button>  
      </main>
    </>
  )
}
