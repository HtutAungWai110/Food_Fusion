import { useEffect } from "react"
import { useLocation, NavLink } from "react-router-dom"
// eslint-disable-next-line no-unused-vars
import { easeIn, easeInOut, motion } from "motion/react"
import { useTheme } from "./theme-provider"
import { Button } from "./ui/button"
import { Moon, Sun } from "lucide-react"
import { useSelector } from "react-redux"
import UserProfileNav from "./userProfileNav"

export default function Navbar(){
    
    const location = useLocation()
    const { theme, setTheme } = useTheme()
    const {data, loading} = useSelector((state) => state.user);

    useEffect(() => {
        console.log(location.pathname)
    }, [location])

    function currentPath(path){
        return location.pathname === path ? "active": ""
    }

    return (
        
        <motion.nav 
            className="border-b-2 in-dark:border-gray-600 rounded-b-2xl p-2"
            initial={{ y: -70 }}
            animate={{ y: 0 }}
            transition={{ duration: 1.5, ease: easeIn }}
        >
        <div className="navbar">
            <motion.h1 
                className="text-2xl font-extrabold italic text-orange-500 cursor-pointer"
                animate={{ rotate: [-1, 1, -1], transition: {duration: 1, repeat: Infinity, ease: easeInOut} } }
                whileHover={{rotate: 0, scale: 1.1}}
            >
                Food Fusion
            </motion.h1>
            <ul className="flex justify-between items-center gap-5">
                <li className={`nav_items ${currentPath("/")}`}><NavLink to="/" >Home</NavLink></li>
                <li className={`nav_items ${currentPath("/about_us")}`}><NavLink to="/about_us" >About us</NavLink></li>
                <li className={`nav_items ${currentPath("/recipe_collection")} ${currentPath("/recipe_collection/recipe")}`}><NavLink to="/recipe_collection" >Recipe Collection</NavLink></li>
                <li className={`nav_items ${currentPath("/community_cookbook")}`}><NavLink to="/community_cookbook" >Community cookbook</NavLink></li>
                <li className={`nav_items ${currentPath("/contact_us")}`}><NavLink to="/contact_us" >Contact us</NavLink></li>
                <li className={`nav_items ${currentPath("/curlinary_resources")}`}><NavLink to="/curlinary_resources" >Curlinary Resources</NavLink></li>
                <li className={`nav_items ${currentPath("/educational_resources")}`}><NavLink to="/educational_resources" >Educational Resources</NavLink></li>
         
                <li className="flex items-center">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                        className="relative"
                    >
                        <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                        <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                        <span className="sr-only">Toggle theme</span>
                    </Button>
                </li>
            </ul>

            
            </div>
            {!loading && !data &&
                <ul className="flex justify-end gap-2">
                    <li className={`nav_items border ${currentPath("/login")}`}><NavLink to="/login" >Login</NavLink></li>
                    <li className={`nav_items border ${currentPath("/signup")}`}><NavLink to="/signup" >Sign up</NavLink></li>
                </ul>
            }

            {data && !loading &&
                <UserProfileNav/>
            }
            
            
        </motion.nav>
    )
}
