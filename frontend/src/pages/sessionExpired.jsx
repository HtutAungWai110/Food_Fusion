import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUser } from "../states/UserState";
import { Navigate } from "react-router-dom";
import SessionExpiredAlert from "../components/sessionExpiredAlert";

export default function SessionExpired() {
    
   
    const dispatch = useDispatch();
    const { data: userData, loading, error } = useSelector((state) => state.user);
    

    useEffect(() => {

        if (userData) {
            dispatch(getUser());
        }
    }, [dispatch]); 



    if (!loading && userData && !error) {
        return <Navigate to={"/"} />;
    }

    

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                <span className="ml-2">Verifying session...</span>
            </div>
        );
    }


    return (
        <SessionExpiredAlert />
    );
}
