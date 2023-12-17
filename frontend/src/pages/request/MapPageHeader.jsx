import React from 'react'
import icon from '../../image/aapdalogo.jpg'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import './MapPageHeader.scss'

const MapPageHeader = ({user}) => {
  return (
    <div className='header-section'>
    <div className="header-logo">
    <img src={icon} alt="" className='header-logo-image'/>
    <div className="header-logo-text">
    <div className='header-logo-name'>apdaRelief</div>
    <div className='header-logo-motto'>ONE NETWORK, COUNTLESS HEROES</div>
    </div>
    </div> 
    <div className='Profile-container'>
    <AccountCircleIcon />
    <span>{user && user.email.split('@')[0].toUpperCase()}</span>
    </div>
    </div>
  )
}

export default MapPageHeader
