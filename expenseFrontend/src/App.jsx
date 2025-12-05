import { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Auth/Login'
import SignUP from './pages/Auth/SignUp'
import Home from './pages/Dashboard/Home'
import Income from './pages/Dashboard/Income'
import Expense from './pages/Dashboard/Expense'
import UserProvider from './context/userContext.jsx'
import { Toaster } from 'react-hot-toast'

const App = () => {

  return (
    <UserProvider>
      {/* <BrowserRouter> */}
        <Routes>
          <Route path='/' element={<Root />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<SignUP />} />
          <Route path='/dashboard' element={<Home />} />
          <Route path='/income' element={<Income />} />
          <Route path='/expense' element={<Expense />} />
        </Routes>
      {/* </BrowserRouter> */}

      <Toaster toastOptions={{
        className: "",
        style: {
          fontSize: '13px'
        }
      }} />
    </UserProvider>
  )
}

export default App;

const Root = () => {
  const isAuthenticated = !!localStorage.getItem('token')

  return isAuthenticated ? (
    <Navigate to='/dashboard' />
  ) : (
    <Navigate to='/login' />
  );
}
