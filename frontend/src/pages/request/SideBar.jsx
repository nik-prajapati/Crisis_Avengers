import React from 'react'
import './SideBar.scss'
import GraphicEqIcon from '@mui/icons-material/GraphicEq';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Groups2Icon from '@mui/icons-material/Groups2';

const SideBar = () => {
  return (
    <div className='sidebar-container'>
    <div className="access-btn"><GraphicEqIcon />Activity Records</div>
    <div className="access-btn"><AddShoppingCartIcon />Resource</div>
    <div className="access-btn"><NotificationsIcon />Review Requests</div>
    <div className="access-btn"><Groups2Icon />Collaborate</div>
    </div>
  )
}
export default SideBar
