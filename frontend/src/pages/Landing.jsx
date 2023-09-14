import React from 'react'
import Map from './Map'
const Landing = ({user}) => {

  console.log(user)
  return (
    <>
    <Map user={user}/>

    </>
  )
}

export default Landing