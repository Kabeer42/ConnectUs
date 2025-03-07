export type Skills={
    skillName:string,
    skillLevel: number
} 

export type User={
    _id:string,
    name: string,
    email:string,
    password:string,
    roleAs :string,
    contact:string,
    firstName:string,
    lastName:string,
    profile:string,
    bio:string,
    university:string,
    registrationNo:string, 
    cgpa:string,
    semester:string,
    skills:Skills[],
    program:string,
    address:string,
    coverPhoto: string,
    userLocation:string,
    isVerified:boolean,
    Website_URL: string,
    companyType:string,

    
}

export type simpleUser ={
    roleAs :string,
    profile:string,
    name: string,
}

export interface Posts{
_id:string,
user_id: string,
description: string,
photo: string,
date:string,
tags:string,
locations:string,
postBy:string,
comments:string,

}
export interface PostProps{
    post: Posts,
    }