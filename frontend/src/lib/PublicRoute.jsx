import { Navigate, Outlet } from "react-router-dom";

export default function PublicRoute(){
    const isGuest = JSON.parse(sessionStorage.getItem("guest"));

    return isGuest ? <Outlet/> : <Navigate to={"/"}/>
    
    
}