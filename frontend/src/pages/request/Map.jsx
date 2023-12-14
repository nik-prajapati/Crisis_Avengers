import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./mapstyle.css";
import { Icon } from "leaflet";

import icon from '../../image/location-pin.png/'
import MarkerClusterGroup from "react-leaflet-cluster";
import gpsIcon from "../../image/gps.png";
import { useEffect, useState } from "react";
import axios from "axios";
import Request from "../../components/Request/Request";
import socket from "../../helpers/socket";
// import Request from "./Request";
import ReqBlock from "../ReqBlock";
import { Link } from "react-router-dom";

const duser = {
  duser: "Ram Shirke",
  geocode: [19.10295695, 72.83745021706365],
  address: "vile parle west mumbai 400056",
  popup: "Current locations",
};

const customIcon = new Icon({
  iconUrl: icon,
  iconSize: [38, 38],
});

const duserCustomIcon = new Icon({
  iconUrl: gpsIcon,
  iconSize: [30, 30],
});

function Map({ user }) {
  const [agencies, setAgencies] = useState([]);
  const [type, setType] = useState(null);
  const [marker, setMarker] = useState(null);
  const [requestBody, setRequestBody] = useState(null);
  const [RequestBlock, setBlock] = useState();

  const [sentRequest, setSentRequest] = useState([]);
  const [recieveRequest, setRecieveRequest] = useState([]);

  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    console.log(user);
    if (user) socket.emit("join-room", user._id);
  }, []);

  useEffect(() => {
    if (user) {
      socket.on("receive-request", (req_data) => {
        console.log(req_data);
        setRecieveRequest([...recieveRequest, req_data]);
      });

      socket.on("receive-message", (newMessage) => {
        console.log(newMessage);
      });

      return () => {
        socket.off("receive-request");
        socket.off("receive-message");
      };
    }
    console.log(user);
  });

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        const resp = await axios.get(
          `http://localhost:3000/getagencies?latitude=19&longitude=72&radius=200`
        );
        const d = resp.data.agencies;
        // console.log(d)
        const myself = d.filter((agency) => {
          return agency._doc._id == user._id;
        });

        const others = d.filter((agency) => {
          return agency._doc._id != user._id;
        });

        const oth = others.map((agency) => {
          return { ...agency, distance: Math.floor(Math.random() * 50 + 1) };
        });
        // console.log(oth)
        setAgencies(oth);
        setCurrentUser(myself[0]._doc);
      }
    };

    fetchData();
  }, []);

  // console.log(currentUser)
  //setting current user
  // useEffect(() => {
  //   if(agencies){
  //
  //   }

  // }, []);

  //marker handle
  const handleMarker = (agency) => {
    const markerData = {
      id: agency._doc._id,
      name: agency._doc.name,
      address: agency._doc.address,
      description: agency._doc.description,
      distance: agency.distance,
    };
    setMarker(markerData);
  };

  const handleRequest = () => {
    if (user && marker) {
      const requestBody = {
        reqAgency: marker,
        reqduser: user,
      };
      setRequestBody(requestBody);
    }
  };

  // console.log(recieveRequest)
  return (
    <div className="Map-container">

      <MapContainer center={duser.geocode} zoom={12}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url='https://tile.openstreetmap.org/{z}/{x}/{y}.png'
        />

        {currentUser && (
          <Marker
            position={[
              Number(currentUser.location.latitude),
              Number(currentUser.location.longitude),
            ]}
            key={112}
            icon={duserCustomIcon}
          >
            <Popup>
              <h3>{currentUser.name}</h3>
              <h5>{currentUser.address}</h5>
              <h5>{currentUser.description}</h5>
              <h5>{currentUser.type}</h5>
            </Popup>
          </Marker>
        )}

        {
          // currentUser &&
        }

        {agencies.map((agency, idx) => (
          <Marker
            position={[
              Number(agency._doc.location.latitude),
              Number(agency._doc.location.longitude),
            ]}
            key={idx}
            icon={customIcon}
          >
            <Popup>
              <h3>{agency._doc.name}</h3>
              <h5>{agency._doc.address}</h5>
              <h5>{agency._doc.description}</h5>
              <h5>{agency._doc.type}</h5>
              <h4>{agency.distance} km</h4>
              <button
                className='marker-btn'
                onClick={() => handleMarker(agency)}
              >
                Add
              </button>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      <button onClick={() => handleRequest()} className='body-submit-btn'>
        Add To Request Body
      </button>

      {requestBody && (
        <Request
          user={user}
          payload={requestBody}
          socket={socket}
          block={RequestBlock}
        />
      )}

      <div className='cardStyle'>
        {recieveRequest &&
          recieveRequest.map((body, idx) => {
            return (
              <div className='cardbody' key={idx}>
                <div className='card' style={{ width: "18rem" }}>
                  <div className='card-body' style={{ color: "black" }}>
                    <h5 className='card-title' style={{ color: "black" }}>
                      From : {body.rescue_requester_id.name}
                    </h5>
                    <p className='card-text' style={{ color: "black" }}>
                      Address : {body.rescue_requester_id.address}
                    </p>
                    <p className='card-text' style={{ color: "black" }}>
                      Distance : {Math.floor(Math.random() * 50 + 1)}km
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default Map;
