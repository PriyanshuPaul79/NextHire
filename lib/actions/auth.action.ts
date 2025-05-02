'use server'

import { auth, db } from "@/firebase/admin";
import { cookies } from "next/headers";
// import { use } from "react";

export async function signUp(params:SignUpParams){
    const {uid,name,email} = params;
    try{
        const userRecord = await db.collection('users').doc(uid).get();
        if(userRecord.exists) {
            return {
                success:false,
                message: "user already exists. Just Signin"
            }
        }

        //if user doesnt exist just set it 
        await db.collection('users').doc(uid).set({
            name,
            email
        })
        return {
            success:true,
            message:'Account created successfully just sign-in'
        }



    }catch(error:any){
        console.error('Error creating a user ',error);

        //firebase specific errors
        if(error.code === 'auth/email-already-exists'){
            return {
                success:false,
                message:'This email already exist.'
            }
        }

        return {
            success : false,
            messAGE : "Failed to create a user. "
        }
    }
}


export async function setSessionCookies(idToken:string) {
    const cookieStore = await cookies();
    const sessionCookie = await auth.createSessionCookie(idToken,{
        expiresIn: 60*60*24*1000,
        // 1 day ms 
    })

    cookieStore.set('session',sessionCookie,{
        maxAge:60*60*24,
        httpOnly:true,
        secure:process.env.NODE_ENV ==="production",
        path:'/',
        sameSite:'lax',
    })
}


export async function signIn(params:SignInParams){
    const{email,idToken} = params;
    try{
        const userRecord = await auth.getUserByEmail(email);
        if(!userRecord){
            return {
                success:false,
                message:'User doesnt exist.Create a new account. '
            }
        }

        await setSessionCookies(idToken);
    }catch(error){
        console.error("Error occured during sign-in ", error)

        return {
            success:false,
            message:'Error occured during sign-in.'
        }
    }
}



export async function getCurrentUser():Promise<User|null> {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get('session')?.value;
    if(!sessionCookie) return null;

    try {
        const decodedClaims = await auth.verifySessionCookie(sessionCookie,true);

        const userRecord = await db.collection('users').doc(decodedClaims.uid).get();

        if(!userRecord.exists) return null;
        return {
            ...userRecord.data(),
            id:userRecord.id,
        } as User;
    } catch(e){
        console.log(e)
        return null;
    }

}


export async function isAuthenticated() {
    const user = await getCurrentUser();
    return !!user;
    // we can convert any value to boolean in js using !! here we needed the boolean to check either the user exist or not
}