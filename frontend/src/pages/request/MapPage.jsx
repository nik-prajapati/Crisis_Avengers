import React from 'react'
import Map from './Map'
import SideBar from './SideBar'
import './MapPage.scss'
import MapPageHeader from './MapPageHeader'

const MapPage = ({user}) => {
  return (
    <div className='map-page-container'>
    <MapPageHeader user={user}/>
    <div className='column-container'> 
    <SideBar/>
    <Map user={user}/>
    </div>
    </div>
    )
}

export default MapPage
