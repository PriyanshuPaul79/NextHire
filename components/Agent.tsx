'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import {cn} from '@/lib/utils'
import { useRouter } from 'next/navigation'
import { vapi } from '@/lib/vapi.sdk'

enum CallStatus {
    INACTIVE = 'INACTIVE',
    CONNECTING = 'CONNECTING',
    ACTIVE = 'ACTIVE',
    FINISHED = 'FINISHED', 
}

interface SavedMessage{
    role:'user'|'system'|'assistant';
    content:string;
}



const Agent = ({userName,userId,type}:AgentProps) => {

    const router = useRouter();
    const[speaking,setSpeaking]= useState(false);
    const[callStatus,setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE);
    const[message,setMessage]= useState<SavedMessage[]>([]);
    // const[lastMessage,setLastMessage]= useState<string>("");

    useEffect(()=>{
        const onCallStart = ()=> setCallStatus(CallStatus.ACTIVE);
        const onCallEnd = ()=> setCallStatus(CallStatus.FINISHED);

        const onMessage = (message:Message) => {
            if(message.type === 'transcript' && message.transcriptType === 'final'){
                const newMessage = {role:message.role,content:message.transcript};
                setMessage((prev)=>[...prev,newMessage]);
            }
        };

        const speechStart = ()=>{
            console.log("speech start");
            setSpeaking(true);
        };

        const speechEnd = ()=>{
            console.log("Speech end");
            setSpeaking(false);
        };

        const onError = (error:Error)=>{
            console.log("Error: ", error);
        };

        // start listners 
        vapi.on('call-start',onCallStart);
        vapi.on('call-end',onCallEnd);
        vapi.on('message',onMessage);
        vapi.on('speech-start',speechStart);
        vapi.on('speech-end',speechEnd);
        vapi.on('error',onError);

        return ()=>{
            vapi.off('call-end',onCallEnd);
            vapi.off('call-start',onCallStart);
            vapi.off('message',onMessage);
            vapi.off('speech-start',speechStart);
            vapi.off('speech-end',speechEnd);
            vapi.off('error',onError);
        };
    },[]);

    // const callStatus = CallStatus.ACTIVE;
    // const transcriptOfInterview = [
    //     'Hello there',
    //     'Hows everything'
    // ];

    // const lastMessage = transcriptOfInterview[transcriptOfInterview.length-1];


        useEffect(()=>{
            // if(message.length>0){
            //     setLastMessage(message[message.length-1].content);
            // }

            // const generateFeedback = async(message:SavedMessage[])=>{
            //     console.log("feedback generated");
                
            // }


            if(callStatus === CallStatus.FINISHED) router.push('/');
        },[message,callStatus,type,userId])



        const handleCall = async ()=>{
            setCallStatus(CallStatus.CONNECTING);
            await vapi.start(process.env.NEXT_PUBLIC_VAPI_WORKFLOW_ID!,{
                variableValues: {
                    username:userName,
                    userid: userId,
                }
            })
        }

        const disconnectCall = async ()=>{
            setCallStatus(CallStatus.FINISHED);
            vapi.stop();
        }

        const latest = message[message.length-1]?.content;
        const callInactiveOrFinished = callStatus === CallStatus.INACTIVE || CallStatus.FINISHED;


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

    {message.length>0 && (
        <div className='transcript-border'>
            <div className='transcript'>
                <p key={latest} className={cn('transition-opacity duration-500 opacity-0', 'animate-fadeIn opacity-100')}>{latest}</p>
            </div>
        </div>
    )} 

    <div className='w-full flex justify-center'>
        {callStatus !== 'ACTIVE' ? (
            <button className='relative btn-call' onClick={handleCall}>
                <span className={cn('absolute animate-ping rounded-full opacity-75', callStatus !== 'CONNECTING' && 'hidden')}/>
                <span>
                {callInactiveOrFinished?'Call':'....'} 
                </span>
            </button>
        ): (
            <button className='btn-disconnect' onClick={disconnectCall}>
                End
            </button>
        )}
    </div>
    </>
  )
}

export default Agent