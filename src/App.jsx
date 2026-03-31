import React,{ useState } from 'react'
import Navbar from './Components/Navbar/Navbar.jsx'
import { Route ,Routes } from 'react-router-dom'
import Home from './Pages/Home/Home.jsx'
import Video from './Pages/Video/Video.jsx'
import SideBar from './Components/SideBar/SideBar.jsx'

const App = () => {

  const[sidebar,setSidebar]=React.useState(true);

  return (
    <div>
      <Navbar setSidebar={setSidebar} />
      <Routes>
        <Route path="/" element={<Home sidebar={sidebar}/>}/>
        <Route path="/video/:categoryId/:videoId" element={<Video/>}></Route>
      </Routes>
    </div>
  )
}

export default App
