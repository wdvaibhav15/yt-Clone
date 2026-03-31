import React from 'react'
import './Navbar.css'
import menu_icon from '../../images/menu.png'
import logo from '../../images/logo.png'
import search_icon from '../../images/search.png'
import upload_icon from '../../images/upload.png'
import more_icon from '../../images/more.png'
import notification_icon from '../../images/notification.png'
import profile_icon from '../../images/jack.png'
import { Link } from 'react-router-dom'

const Navbar = ({setSidebar}) => {
  return (
    <nav className='flex-div'>
      <div className="nav-left flex-div">
        <img className='menu-icon' onClick={()=>setSidebar(pre=>pre===false?true:false)} src={menu_icon} alt="" />
        <Link to = '/'><img className='logo' src={logo} alt="" /></Link>
      </div>

      <div className="nav-middle flex-div">
        <input type="text" placeholder='Search' />
        <img src={search_icon} alt="" />
      </div>

      <div className="nav-right flex-div">
        <img src={upload_icon} alt="" />
        <img src={more_icon} alt="" />
        <img src={notification_icon} alt="" />
        <img src={profile_icon} className="user-icon" alt="" />
      </div>
    </nav>
  )
}

export default Navbar