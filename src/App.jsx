import { useState } from 'react'
import FileUpload from './components/FileUpload'
import Register from './components/Register'
import Login from './components/Login'
import Navbar from './components/Navbar'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import "./App.css"

function App() {

  return (
    <>
      <div>
        <BrowserRouter>
          <Navbar />
          <main className="main-content">
          <Routes>
              <Route path='/' element={<FileUpload />} />
              <Route path='/register' element={<Register />} />
              <Route path='/login' element={<Login />} />
          </Routes>
          </main>
        </BrowserRouter>

      </div>
    </>
  )
}

export default App
