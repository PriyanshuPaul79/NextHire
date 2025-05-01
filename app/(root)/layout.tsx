import React, { ReactNode } from 'react'
import Link from 'next/link'
import Image from 'next/image'
const Rootlayout = ({children}:{children:ReactNode}) => {
  return (
    <div className='root-layout'>
      <nav>
        <Link href='/' className='flex items-center gap-2 '>
        <Image src='/logo5.png' alt='logo' height={50} width={50}/>
        <h2 className='text-primary-100'>NextHire</h2>
        </Link>
      </nav>
      {children}
    </div>
  )
}

export default Rootlayout