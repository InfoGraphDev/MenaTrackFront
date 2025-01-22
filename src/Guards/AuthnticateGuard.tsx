import ComponentLoading from "@/Components/Loading/ComponentLoading";
import React from "react"
import { Outlet } from 'react-router-dom';

export function AuthnticateGuard({ children }: { children: React.ReactNode }) {
  
  return children ? children : <Outlet/>;
}
