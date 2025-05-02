import React from 'react'
import Agent from '@/components/Agent' 
const page = () => {
  return (
    <>
    <h3>Let's create your Interview</h3>

    <Agent userName ='You' userId='user1' type= 'generate' /> 
    </>
  )
}

export default page