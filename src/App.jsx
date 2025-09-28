import { useState } from 'react'
import FileUpload from './components/FileUpload'
import Register from './components/Register'
import Login from './components/Login'
import Navbar from './components/Navbar'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

function App() {

  return (
    <>
      <div>
        <BrowserRouter>
          <Navbar />
          <Routes>
              <Route path='/' element={<FileUpload />} />
              <Route path='/register' element={<Register />} />
              <Route path='/login' element={<Login />} />
          </Routes>
        </BrowserRouter>

      </div>
    </>
  )
}

export default App
