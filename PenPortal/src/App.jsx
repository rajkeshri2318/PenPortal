import { useEffect, useState } from 'react'
import './App.css'
import { useDispatch } from 'react-redux'
import authService from './appwrite/auth'
import { login, logout } from './store/authslice'
import { Outlet } from 'react-router-dom'
import {Header, Footer} from './components/index'


function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    authService.getCurrentUser()
    .then((userData) => { //agr error aaya toh userData naam kr dena 
      if(userData) {
        dispatch(login({userData}));
      }else{
        dispatch(logout());
      }
    })
    .finally(() => setLoading(false))
  })

  return !loading ? (
    <div className=' min-h-screen content-between bg-gray-800'>
      <div className='w-full block'>
        <Header/>
        <main>
         <Outlet />
        </main>
        <Footer/>
      </div>
    </div>
  ): null
}

export default App