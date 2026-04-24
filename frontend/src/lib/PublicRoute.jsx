import { Navigate, Outlet } from "react-router-dom";
import {useSelector} from 'react-redux';

export default function PublicRoute(){
    
    const {data: userData} = useSelector((state) => state.user); 
    return !userData ? <Outlet/> : <Navigate to={"/"}/>
    
    
}