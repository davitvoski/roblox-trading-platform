import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Login from './pages/auth/Login'


function App() {

  return (
    <div className='w-full h-screen'>
        {/* <Login /> */}

        <Outlet />
    </div>
  )
}

export default App
