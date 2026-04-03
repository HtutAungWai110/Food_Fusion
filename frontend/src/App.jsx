
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Navbar from "./components/navbar"
import './App.css'
import Home from "./pages/home"
import Login from "./pages/Login"
import Signup from "./pages/Signup"

import { ThemeProvider } from "./components/theme-provider"

function App() {
  

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/about_us" element={<h1>About us</h1>} />
          <Route path="/recipe_collection" element={<h1>Recipe Collection</h1>} />
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
