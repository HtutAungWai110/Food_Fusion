import { useSelector } from "react-redux"
import { UserCircle } from "lucide-react"
import { Link } from "react-router-dom"

export default function UserProfileNav(){

    const {data} = useSelector((state) => state.user)
    const {firstname, lastname} = data

    return (
        <div className="flex justify-end">
            
                <Link to={"/profile"} 
                className="flex items-center justify-center
                 p-2 border rounded-2xl hover:bg-gray-200 in-dark:hover:bg-gray-800 gap-1">
                    <UserCircle/> <span>{firstname} {lastname}</span>
                </Link>
            
        </div>
    )
}