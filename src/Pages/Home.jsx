import React from 'react'
import Nav from '../Components/Nav'
import { Outlet } from 'react-router-dom'

const Home = () => {
  
  return (
    <main>
      <Nav/>
      <div>
        <Outlet/>
      </div>
    </main>
  )
}

export default Home
