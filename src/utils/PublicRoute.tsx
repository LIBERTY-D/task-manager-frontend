import { FC, ReactNode } from "react";
import { ContextType, useAuth } from '../context/auth/Auth';
import { Navigate } from "react-router-dom";

type PublicRouteType = {
    children: ReactNode;
}

export const PublicRoute: FC<PublicRouteType> = ({ children }) => {
    const { user }: ContextType = useAuth();

    if (user && user.authenticated) {
        return <Navigate to="/" replace={true}/>; 
    }

    return children;
}
