import React, { useState } from 'react'
import axios from 'axios'
import './ReviewRequest.scss'
import SideBar from '../request/SideBar';
import MapPageHeader from '../request/MapPageHeader';
const dummyData = {
    sentRequests: [
      {
        requestId: "1",
        status: "Pending",
        rescueAgency: {
          name: "ABC Rescue Services",
          address: "123 Main Street, Cityville",
          description: "A professional rescue agency",
        },
        distance: 5.2, // Example distance in miles
      },
      {
        requestId: "2",
        status: "In Progress",
        rescueAgency: {
          name: "XYZ Emergency Response",
          address: "456 Oak Avenue, Townsville",
          description: "Emergency response and rescue team",
        },
        distance: 8.7, // Example distance in miles
      },
      // Add more sent request entries as needed
    ],
    receivedRequests: [
      {
        requestId: "3",
        status: "Accepted",
        rescueAgency: {
          name: "123 Rescue Team",
          address: "789 Elm Road, Villagetown",
          description: "Dedicated to community safety",
        },
        distance: 3.1, // Example distance in miles
      },
      {
        requestId: "4",
        status: "Completed",
        rescueAgency: {
          name: "Rescue Squad Alpha",
          address: "567 Pine Lane, Hamlet City",
          description: "Swift and efficient rescue services",
        },
        distance: 12.5, // Example distance in miles
      },
      // Add more received request entries as needed
    ],
  };
  
  


const ReviewRequest = () => {

    const [sentSection,setSentSection]=useState(true)
     
    // useEffect(()=>{
    //     const fetchReviewRequest=async ()=>{
    //     const resp=await axios.get('https://localhost:3000')
    //     if(resp.status==200){
    //         setSentRequest(resp.data.sent)
    //         setRecieveRequest(resp.data.recieve)
    //     }
    //     }
    // })


  return (
    <div>
    
    <MapPageHeader />
    <div className="review-request-container">
    <SideBar/>
    <div className="section">
    
      <div className="btn-section">
      <button className={sentSection ? 'review-btn active-btn' : 'review-btn disable-btn'} onClick={()=>setSentSection(true)}>Sent</button>
      <button className={sentSection ? 'review-btn disable-btn' : 'review-btn active-btn'} onClick={()=>setSentSection(false)}>Recived</button>
      </div>

      <div className='review-section'>
      <div className={sentSection ? 'sent-section active-section':'sent-section disable-section'}>
      <ul>
      {
          dummyData.receivedRequests.map((sent)=>{
        return <div>
        <li>TO : {sent.rescueAgency.name}</li>
        <li>Distance : {sent.distance}</li>
        <li>Status : {sent.status}</li>
        </div>
        })
    }
    </ul>
      </div> 

      <div className={sentSection ? 'Recive-section disable-section':'Recive-section active-section'}>
      {
        <ul>
        {
            dummyData.receivedRequests.map((recieve)=>{
          return <div>
          <li>From : {recieve.rescueAgency.name}</li>
          <li>Distance : {recieve.distance}</li>
          <li>Status : {recieve.status}</li>
          </div>
          })
      }
      </ul>
      }
      </div>
    </div>
    </div>
    </div>
    </div>
  )
}

export default ReviewRequest
