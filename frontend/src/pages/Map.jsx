import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "../styles/mapstyle.css";
import { Icon } from "leaflet";
import icon from "../image/location-pin.png";
import MarkerClusterGroup from "react-leaflet-cluster";
import gpsIcon from "../image/gps.png";
import { useEffect, useState } from "react";
import axios from "axios";
import Request from "./Request";
import socket from "../helpers/socket";

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



  //used the socket for communication
  useEffect(() => {
    if (user) socket.emit("join-room", user._id);
  }, []);

  useEffect(() => {
    if (user) {
      socket.on("receive-request", (req_data) => {
        setBlock(req_data)
        console.log(req_data);
      });

      socket.on("receive-message", (newMessage) => {
        console.log(newMessage);
      });

      return () => {
        socket.off("receive-request");
        socket.off("receive-message");
      };
    }
  });



  useEffect(() => {
    const fetchData = async () => {
      // if (user) {
      const resp = await axios.get(
        `http://localhost:3000/getagencies?latitude=19&longitude=72&radius=300`
      );
      const d = resp.data.agencies;
      setAgencies(d);
      // }
    };

    fetchData();
  }, []);

  const [agencies, setAgencies] = useState([]);
  const [type, setType] = useState(null);
  const [marker, setMarker] = useState(null);
  const [requestBody, setRequestBody] = useState(null);
  const [RequestBlock,setBlock]=useState()
  
  const handleMarker = (agency) => {
    const markerData = {
      id: agency._doc._id,
      name: agency._doc.name,
      address: agency._doc.address,
      description: agency._doc.description,
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

  return (
    <div>
        <MapContainer center={duser.geocode} zoom={12}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <MarkerClusterGroup>
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
                    <button className="marker-btn" onClick={() => handleMarker(agency)}>Add</button>
                  
                </Popup>
              </Marker>
            ))}
          </MarkerClusterGroup>
        </MapContainer>

      <button onClick={() => handleRequest()} className="body-submit-btn">
        Add To Request Body
      </button>

      {requestBody && (
        <Request user={user} payload={requestBody} socket={socket} block={RequestBlock} />
      )}
    </div>
  );
}

export default Map;
