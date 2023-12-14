import React from 'react'
import Map from './Map'
import SideBar from './SideBar'
import './MapPage.scss'
import icon from '../../image/aapdalogo.jpg'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const MapPage = () => {
  return (
    <div className='map-page-container'>
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
    <span>SDMA</span>
    </div>
    </div>
    <div className='column-container'>
    <SideBar/>
    <Map/>
    </div>
    </div>
    )
}

export default MapPage
