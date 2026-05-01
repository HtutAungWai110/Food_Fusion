import { LogOut } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import apiClient from "../lib/client";
import { useDispatch } from "react-redux";
import { getUser } from "../states/UserState";
import { Button } from "./ui/button";
import { Spinner } from "./ui/spinner";
import { useNavigate } from "react-router-dom";

export default function LogoutBtn() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutMutation = useMutation({
        mutationFn: async () => {
            try {
                const res = await apiClient.post('/auth/logout');
                return res.data;
            } catch (error) {
                throw new Error(error.response?.data?.message || error.message);
            }
        },
        onSuccess: () => {
            dispatch(getUser());
            navigate("/");
        }
    });

    return (
        <button 
            className={"py-1 px-2 rounded-2xl text-[0.7em] sm:text-[1em] flex items-center bg-red-200 text-red-500"}
            onClick={() => logoutMutation.mutate()}
            disabled={logoutMutation.isPending}
        >
            {logoutMutation.isPending ? <Spinner className="w-3 sm:w-5" /> : <LogOut className="w-3 sm:w-5"/>}
            Logout
        </button>
        
    );
}
