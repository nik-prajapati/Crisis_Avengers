// SOSDashboard.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './SOSdashboard.css'

const SOSDashboard = () => {
  const [sosRequests, setSOSRequests] = useState([]);

  useEffect(() => {
    const fetchSOSRequests = async () => {
      try {
        const response = await axios.get('http://localhost:3000/getsos',{withCredentials:true});
        setSOSRequests(response.data);
        console.log(response)
      } catch (error) {
        console.error('Error fetching SOS requests:', error);
      }
    };

    fetchSOSRequests();
  }, []); // Empty dependency array ensures the effect runs only once

  return (
    <div className="dashboard-container">
    <div>SOS count : {sosRequests.length}</div>
    <br />

    {
      <h6>last Request { sosRequests[sosRequests.length-1] && new Date(sosRequests[sosRequests.length-1].createdAt).toLocaleString()}</h6>
    }
    {
      sosRequests && sosRequests.map((sos,idx)=>{
        return <div style={{'display':'flex', 'justifyContent':'space-between'}}> 

        <p>{new Date(sos.sos_id.createdAt).toLocaleString()}</p>
        <p>{sos.sos_id.typeOfDisaster}</p>
        <p>{sos.sos_id.location.coordinates[1]}</p>
        <p>{sos.sos_id.location.coordinates[0]}</p>
        </div>
      })
    }
    </div>
  );

};

export default SOSDashboard;
