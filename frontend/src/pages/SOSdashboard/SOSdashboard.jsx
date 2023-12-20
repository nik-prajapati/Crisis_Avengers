// SOSDashboard.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SOSDashboard = () => {
  const [sosRequests, setSOSRequests] = useState([]);

  useEffect(() => {
    const fetchSOSRequests = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/sos-requests');
        setSOSRequests(response.data);
      } catch (error) {
        console.error('Error fetching SOS requests:', error);
      }
    };

    fetchSOSRequests();
  }, []); // Empty dependency array ensures the effect runs only once

  return (
    <div>
      <h2>SOS Requests Dashboard</h2>
      <p>
        Latest SOS Request Count: {sosRequests.length}{' '}
        {latestRequest && (
          <span style={{ color: 'blue' }}>
            (Latest Request: {latestRequest.location}, {latestRequest.disasterType},{' '}
            {latestRequest.alertMessage})
          </span>
        )}
      </p>
      {sosRequests.length > 0 ? (
        <ul>
          {sosRequests.map((request, index) => (
            <li key={index} style={{ color: index === 0 ? 'red' : 'black' }}>
              <strong>Location:</strong> {request.location},{' '}
              <strong>Disaster Type:</strong> {request.disasterType},{' '}
              <strong>Message:</strong> {request.alertMessage}
            </li>
          ))}
        </ul>
      ) : (
        <p>No SOS requests available.</p>
      )}
    </div>
  );
};

export default SOSDashboard;
