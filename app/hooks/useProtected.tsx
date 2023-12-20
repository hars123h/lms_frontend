import { redirect } from "next/navigation";
import UserAuth from "./userAuth";
import { isAuth } from "../helper/auth";

import React from "react";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";

interface ProtectedProps {
  children: React.ReactNode;
}

export default function Protected({ children }: ProtectedProps) {
  const isAuthenticated = UserAuth();
  console.log("isAuthaehjearwfkjd",isAuthenticated );
  
  return isAuthenticated ? children : redirect("/");
}
