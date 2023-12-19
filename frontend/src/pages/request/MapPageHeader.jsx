import React from 'react'
import icon from '../../image/aapdalogo.jpg'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import './MapPageHeader.scss'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

const MapPageHeader = ({user}) => {

  const handleLogOut=async ()=>{
    // const resp=await axios.post('http://localhost:3000') 
  }
  return (
    <div className='header-section'>
    <div className="header-logo">
    <Link to='/'>
    <img src={icon} alt="" className='header-logo-image'/>
    </Link>
    <div className="header-logo-text">
    
    <div className='header-logo-name'>apdaRelief</div>
    <div className='header-logo-motto'>ONE NETWORK, COUNTLESS HEROES</div>
    </div>
    </div> 
    <div className='Profile-container'>
    
    <div className="profile-name">
    {user && user.agencyDetails.name}
    </div>
    <div className="log-out-btn" onClick={()=>handleLogOut()}>Logout</div>
    </div>
    </div>
  )
}

export default MapPageHeader
