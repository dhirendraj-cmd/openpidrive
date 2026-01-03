import "./App.css"
import { useState } from 'react'
import FileUpload from './components/FileUpload'
import Register from './components/Register'
import Login from './components/Login'
import Navbar from './components/Navbar'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AuthProvider } from "./context/AuthContext"
import UserProfile from "./components/UserProfile";
import Home from "./components/Home"


function App() {

  return (
    <>
      <div>
        <AuthProvider>
          <BrowserRouter>
            <Navbar />
            <br/>
            <main className="main-content">
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/upload' element={<FileUpload />} />
                <Route path='/register' element={<Register />} />
                <Route path='/login' element={<Login />} />
                <Route path='/user' element={<UserProfile />} />
            </Routes>
            </main>
          </BrowserRouter>
          </AuthProvider>

      </div>
    </>
  )
}

export default App
