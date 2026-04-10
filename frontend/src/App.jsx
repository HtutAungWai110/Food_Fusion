
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Navbar from "./components/navbar"
import './App.css'
import Home from "./pages/home"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Recipes from "./pages/recipes"
import RecipeDetail from "./pages/recipeDetail"
import ForgotPasswordPage from "./pages/forgotPassword"
import ResetPassword from "./pages/resetPassword"

import { ThemeProvider } from "./components/theme-provider"
import { useEffect } from "react"
import {useDispatch, useSelector} from "react-redux"
import { getUser } from "./states/UserState"
import { Spinner } from "@/components/ui/spinner"
import PublicRoute from "./lib/PublicRoute"
import ProtectedRoute from "./lib/ProtectedRoute"



function App() {
 

  const dispatch = useDispatch();
  const {data, loading} = useSelector((state) => state.user); 

  useEffect(() => {
    dispatch(getUser())
  }, [dispatch])

  

  if(!data && loading){
    return (
    <div className="absolute top-[50%] left-[50%] -translate-[50%]">
      <Spinner className="scale-200"/>
    </div>
    )
  }


  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <BrowserRouter>
        <Navbar/>
        <Routes>
          
          <Route path="/" element={<Home/>} />
          <Route element={<PublicRoute/>}>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Route>
          <Route element={<ProtectedRoute/>}>
            <Route path="/profile" element={<div>Profile</div>}/>
          </Route>
          
          <Route path="/forgot-password" element={<ForgotPasswordPage/>}/>
          <Route path="/reset-password" element={<ResetPassword/>}/>
          
          <Route path="/about_us" element={<h1>About us</h1>} />
          <Route path="/recipe_collection" element={<Recipes/>} />
          <Route path="/recipe_collection/recipe" element={<RecipeDetail/>} />
          <Route path="/community_cookbook" element={<h1>Community Cookbook</h1>} />
          <Route path="/contact_us" element={<h1>Contact us</h1>} />
          <Route path="/curlinary_resources" element={<h1>Curlinary Resources</h1>} />
          <Route path="/educational_resources" element={<h1>Educational Resources</h1>} />
          
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
