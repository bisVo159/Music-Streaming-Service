import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import Library from './library'
import Feed from './feed'
import Trendings from './trendings'
import Player from './player'
import Favorites from './favorites'
import './home.css'
import Sidebar from '../components/sidebar'
// import Login from './auth/login'
import  SignUp from './auth/signup'

export default function Home() {

  const [token,setToken]=useState("")
  useEffect(()=>{
    const token=window.localStorage.getItem("token")

    setToken(token)

  },[])
  
  return !token?(<SignUp/>):
    (
    <Router>
          <div className='main-body'>
            <Sidebar/>
            <Routes>
                <Route path='/' element={<Library/>}/>
                <Route path='/feed' element={<Feed/>}/>
                {/* <Route path='/trending' element={<Trendings/>}/> */}
                <Route path='/player' element={<Player/>}/>
                <Route path='/favorities' element={<Favorites/>}/>
            </Routes>
          </div>
    </Router>
  )
}