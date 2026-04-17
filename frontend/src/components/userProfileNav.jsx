import { useSelector } from "react-redux"
import { UserCircle } from "lucide-react"
import { Link } from "react-router-dom"

export default function UserProfileNav(){

    const {data: userData} = useSelector((state) => state.user)
    const {firstname, lastname, image_url} = userData

    return (
        <div className="flex justify-end">
            
                <Link to={"/profile"} 
                className=" flex items-center justify-center
                 p-2 border rounded-2xl hover:bg-gray-200 in-dark:hover:bg-gray-800 gap-1">
                    <div className="w-7 h-7 border-2 border-orange-500 rounded-full overflow-hidden">
                    {
                        image_url ?
                        <img
                        src={image_url}
                        alt="avatar"
                        className="w- object-cover"
                        />
                        : 
                        <UserCircle className="w-full h-full"/>
                    }
                    </div>
                     <span>{firstname} {lastname}</span>
                </Link>
            
        </div>
    )
}