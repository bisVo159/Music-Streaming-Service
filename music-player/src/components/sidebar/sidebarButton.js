import React from 'react'
import './sidebarButton.css'
import { Link, useLocation } from 'react-router-dom'
import { IconContext } from 'react-icons'
import { useState } from 'react'

export default function SidebarButton(props) {
  const location=useLocation()
  const [signOutFlag, setSignOutFlag] = useState(false);

  const handleSignOut = () => {
    localStorage.removeItem("token");
    setSignOutFlag(true)
    };

  const isActive=location.pathname===props.to

  const btnClass=isActive?"btn-body active":"btn-body"
  return (
    <Link to={props.to}>
      <div className={btnClass}  onClick={props.title === "Sign Out" ? handleSignOut : undefined}>
          <IconContext.Provider value={{size:"24px",className:"btn-icon"} }>
              {props.icon}
              <p className='btn-title'>{props.title}</p>
          </IconContext.Provider>
      </div>
      </Link>
  )
}
