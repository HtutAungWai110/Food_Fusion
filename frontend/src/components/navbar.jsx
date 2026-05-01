
import { useLocation, NavLink, Link } from "react-router-dom"
// eslint-disable-next-line no-unused-vars
import { easeIn, easeInOut, motion, AnimatePresence } from "motion/react"
import { useTheme } from "./theme-provider"
import { Button } from "./ui/button"
import { Moon, Sun, Menu, X } from "lucide-react"
import { useSelector } from "react-redux"
import UserProfileNav from "./userProfileNav"
import { useState, useEffect } from "react"

export default function Navbar(){
    
    const location = useLocation()
    const { theme, setTheme } = useTheme()
    const {data, loading} = useSelector((state) => state.user);
    const [isOpen, setIsOpen] = useState(false)

    // Close sidebar when route changes
    useEffect(() => {
        setIsOpen(false)
    }, [location.pathname])

    // Prevent scrolling when sidebar is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'unset'
        }
    }, [isOpen])

    function currentPath(path){
        return location.pathname === path ? "active": ""
    }

    const navLinks = [
        { path: "/", label: "Home" },
        { path: "/about_us", label: "About us" },
        { path: "/recipe_collection", label: "Recipe Collection", activeMatch: "/recipe_collection/recipe" },
        { path: "/community_cookbook", label: "Community cookbook" },
        { path: "/contact_us", label: "Contact us" },
        { path: "/culinary_resources", label: "Culinary Resources" },
        { path: "/educational_resources", label: "Educational Resources" },
    ]

    const ThemeToggle = () => (
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
    )

    return (
        <>
        <motion.nav 
            className="border-b-2 in-dark:border-gray-600 rounded-b-2xl p-2 sticky top-0 bg-background/80 backdrop-blur-md z-40"
            initial={{ y: -70 }}
            animate={{ y: 0 }}
            transition={{ duration: 1.5, ease: easeIn }}
        >
            <div className="flex justify-between items-center px-4 h-14">
                {/* Logo */}
                <motion.h1 
                    className="text-2xl font-extrabold italic text-orange-500 cursor-pointer"
                    animate={{ rotate: [-1, 1, -1], transition: {duration: 1, repeat: Infinity, ease: easeInOut} } }
                    whileHover={{rotate: 0, scale: 1.1}}
                >
                    <Link to="/">Food Fusion</Link>
                </motion.h1>

                {/* Desktop Navigation */}
                <div className="hidden xl:flex items-center gap-6">
                    <ul className="flex items-center gap-4">
                        {navLinks.map((link) => (
                            <li key={link.path} className={`nav_items ${currentPath(link.path)} ${link.activeMatch && location.pathname.startsWith(link.activeMatch) ? "active" : ""}`}>
                                <NavLink to={link.path}>{link.label}</NavLink>
                            </li>
                        ))}
                        <li className="flex items-center">
                            <ThemeToggle />
                        </li>
                    </ul>
                </div>

                {/* Mobile Menu Button */}
                <div className="xl:hidden flex items-center gap-4">
                    <ThemeToggle />
                    <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => setIsOpen(true)}
                        className="text-orange-500"
                    >
                        <Menu size={28} />
                    </Button>
                </div>
            </div>

            {/* Bottom Row - Profile & Auth Links */}
            <div className="px-4 pb-2">
                {!loading && !data && (
                    <ul className="flex justify-end gap-2">
                        <li className={`nav_items border rounded-xl ${currentPath("/login")}`}><NavLink to="/login">Login</NavLink></li>
                        <li className={`nav_items border rounded-xl ${currentPath("/signup")}`}><NavLink to="/signup">Sign up</NavLink></li>
                    </ul>
                )}

                {data && !loading && <UserProfileNav />}
            </div>
        </motion.nav>

        {/* Mobile Sidebar Overlay */}
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsOpen(false)}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 xl:hidden"
                    />

                    {/* Sidebar */}
                    <motion.div 
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed right-0 top-0 bottom-0 w-[280px] bg-card border-l border-orange-500/10 shadow-2xl z-50 xl:hidden overflow-y-auto"
                    >
                        <div className="p-6 flex flex-col h-full">
                            <div className="flex justify-between items-center mb-10">
                                <span className="text-xl font-bold text-orange-500 italic">Menu</span>
                                <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                                    <X size={24} />
                                </Button>
                            </div>

                            <ul className="flex flex-col gap-2 flex-1">
                                {navLinks.map((link) => (
                                    <li key={link.path}>
                                        <NavLink 
                                            to={link.path}
                                            className={({ isActive }) => `
                                                flex items-center px-4 py-3 rounded-xl transition-all font-medium
                                                ${isActive ? "bg-orange-500 text-white" : "hover:bg-orange-500/10 text-foreground/80"}
                                            `}
                                        >
                                            {link.label}
                                        </NavLink>
                                    </li>
                                ))}
                            </ul>

                            {!loading && !data && (
                                <div className="mt-auto pt-6 flex flex-col gap-3 border-t border-orange-500/10">
                                    <NavLink to="/login" className="w-full">
                                        <Button className="w-full h-11 bg-orange-500/10 text-orange-500 hover:bg-orange-500 hover:text-white border-orange-500/20 font-bold rounded-xl">
                                            Login
                                        </Button>
                                    </NavLink>
                                    <NavLink to="/signup" className="w-full">
                                        <Button className="w-full h-11 bg-orange-500 text-white hover:bg-orange-600 font-bold rounded-xl">
                                            Sign Up
                                        </Button>
                                    </NavLink>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
        </>
    )
}
