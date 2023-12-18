import React, { useState } from 'react'
import axios from 'axios'
import './ReviewRequest.scss'
import SideBar from '../request/SideBar';
import MapPageHeader from '../request/MapPageHeader';
import { useContext } from "react";
import reviewContext from "../../context/ReviewRequestContext.jsx";
import { useEffect } from 'react';


const ReviewRequest = () => {

    const [sentSection,setSentSection]=useState(true)
    const {reviewData,setReviewData}=useContext(reviewContext)
    const [dummyD,setDummyD]=useState({})

    useEffect(()=>{
        const fetchReviewRequest=async ()=>{
          const [sentResp, receivedResp] = await Promise.all([
            axios.get('http://localhost:3000/getsentrequests', { withCredentials: true }),
            axios.get('http://localhost:3000/getreceivedrequests', { withCredentials: true })
          ]);
          console.log(sentResp, receivedResp)
        // if(sentResp.status==200){
            // setDummyD({ ...dummyD, sentRequests: sentResp.data.requests }) 

            const allData={
              sentRequests: sentResp.data.requests ,
              receivedRequests: receivedResp.data.requests
            }
            setDummyD(allData)
        }

        fetchReviewRequest()

    },[])

    console.log(dummyD)

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
        dummyD.sentRequests && dummyD.sentRequests.map((recieve,idx)=>{
          return <div className="request-card">
          <div className="agency-info">
          <p>Requestee ID: {recieve.requestee_id}</p>
          <p>Rescue Requester ID: {recieve.rescue_requester_id}</p>
          </div>
         { 
          <div className="time-info">

          <p>Created At: {new Date(recieve.createdAt).toLocaleString()}</p>
          {
            recieve.updatedAt!=recieve.createdAt && <p>Updated At: {new Date(recieve.updatedAt).toLocaleString()}</p>
          }
          </div>
        }

        
          <div className="status-info">
          <button className={`status-btn ${recieve.status.toLowerCase()}`}>
          {recieve.status}
          </button>
          
          </div>
          </div>
          })
        
    }
    </ul>
    </div> 

      <div className={sentSection ? 'Recive-section disable-section':'Recive-section active-section'}>
      {
        <ul>
        {
          dummyD.receivedRequests && dummyD.receivedRequests.map((recieve,idx)=>{
            return <div className="request-card">
            
            <p>Status: {recieve.status}</p>
            <p>Created At: {new Date(recieve.createdAt).toLocaleString()}</p>
            <p>Updated At: {new Date(recieve.updatedAt).toLocaleString()}</p>
            <p>Requestee ID: {recieve.requestee_id}</p>
            <p>Rescue Requester ID: {recieve.rescue_requester_id}</p>
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
