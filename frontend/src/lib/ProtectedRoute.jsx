import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute(){
    const userData = JSON.parse(sessionStorage.getItem("user_data"));

    return userData ? <Outlet/> : <Navigate to={"/login"}/>
}