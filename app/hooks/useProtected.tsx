import { redirect } from "next/navigation";
import UserAuth from "./userAuth";
import React from "react";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";


interface ProtectedProps{
    children: React.ReactNode;
}

export default function Protected({children}: ProtectedProps){
 
    const isAuthenticated = UserAuth();

    // const { isLoading } = useLoadUserQuery({});


    return !isAuthenticated  ? redirect("/auth") : children ;
}