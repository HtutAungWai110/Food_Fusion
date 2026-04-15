import { Alert } from "@/components/ui/alert"
import MessageBox from "./messageBox";
import { useNavigate } from "react-router-dom";

export default function SessionExpiredAlert(){

    const navigate = useNavigate();

    return (
        <div className="fixed top-[50%] left-[50%] -translate-[50%] z-50 rounded-2xl w-[500px]">
            <Alert>
                <MessageBox status={"error"} message={"Session expired! Login again."}/>
                <button className="border rounded-xl m-2 bg-orange-500 p-2 text-white" onClick={() => navigate("/login")}>Login</button>
            </Alert>
        </div>
    )
}