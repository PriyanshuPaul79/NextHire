import React from 'react'
import Image from 'next/image'
import {cn} from '@/lib/utils'

enum CallStatus {
    INACTIVE = 'INACTIVE',
    CONNECTING = 'CONNECTING',
    ACTIVE = 'ACTIVE',
    FINISHED = 'FINISHED', 
}


const Agent = ({userName}:AgentProps) => {
    const callStatus = CallStatus.ACTIVE;
    const speaking = true;
    const transcriptOfInterview = [
        'Hello there',
        'Hows everything'
    ];

    const lastMessage = transcriptOfInterview[transcriptOfInterview.length-1];



  return (
    <>
    <div className='call-view'>
        <div className='card-interviewer'>
            <div className='avatar'>
                <Image src='/lady.png' alt='interviewer' height={100} width={100} className='rounded-full object-cover size-{120px}'/>
                {speaking && <span className='animate-speak'/>}
            </div>
            <h3>Your Interviewer</h3>
        </div>
        <div className='card-border'>
            <div className='card-content'>
                <Image src='/lady2.png' alt='user' height={100} width={100} className='rounded-full object-cover size-{120px}'/>
                <h3>{userName}</h3>
            </div>
        </div>
    </div>

    {transcriptOfInterview.length>0 && (
        <div className='transcript-border'>
            <div className='transcript'>
                <p key={lastMessage} className={cn('transition-opacity duration-500 opacity-0', 'animate-fadeIn opacity-100')}>{lastMessage}</p>
            </div>
        </div>
    )} 

    <div className='w-full flex justify-center'>
        {callStatus !== 'ACTIVE' ? (
            <button className='relative btn-call'>
                <span className={cn('absolute animate-ping rounded-full opacity-75', callStatus !== 'CONNECTING' & 'hidden')}/>
                <span>
                {callStatus === 'INACTIVE' || callStatus === 'FINISHED' ? 'Call' : '.......'} 
                </span>
            </button>
        ): (
            <button className='btn-disconnect'>
                End
            </button>
        )}
    </div>
    </>
  )
}

export default Agent