import {  FC, ReactNode } from "react"
import { ContextType, useAuth } from '../context/auth/Auth';
import { Navigate } from "react-router";


type ProtectedRouteType ={
    children:ReactNode
}


export const ProtectedRoute:FC<ProtectedRouteType>=({children})=> {
    const {user}:ContextType =  useAuth()
    
     if(!user  || !user?.authenticated){
        return <Navigate to="/login"/>
     }
    
   
     return children
}
