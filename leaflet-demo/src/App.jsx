import { useEffect, useState } from "react";
import "./App.css";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { socket } from "./socket";

const agencies = [
  [19.01875200866824, 73.34030446398447],
  [19.382051579341212, 72.8649518944549],
  [19.186110898288916, 73.56633786930132],
  [19.719493666537403, 73.42045334409084],
  [19.842313759624574, 73.24666149988111],
  [19.544991872501576, 73.62883920424919],
  [19.400690582220474, 73.5621614270033],
  [19.397226542347852, 72.95741795994377],
  [19.58766029567944, 73.11965040411279],
  [19.70044558726017, 72.99469497507643],
];

function ConnectionState({ isConnected }) {
  return <p>State: {"" + isConnected}</p>;
}

function ConnectionManager() {
  function connect() {
    socket.connect();
  }

  function disconnect() {
    socket.disconnect();
  }

  return (
    <>
      <button onClick={connect}>Connect</button>
      <button onClick={disconnect}>Disconnect</button>
    </>
  );
}

function Events({ events }) {
  return (
    <ul>
      {events.map((event, index) => (
        <li key={index}>{event}</li>
      ))}
    </ul>
  );
}

function App() {
  const [location, setLocation] = useState([]);
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [fooEvents, setFooEvents] = useState([]);
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
      console.log(pos.coords.latitude, pos.coords.longitude);
      setLocation([pos.coords.latitude, pos.coords.longitude]);
    });
  }, []);
  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function onFooEvent(value) {
      setFooEvents((previous) => [...previous, value]);
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("foo", onFooEvent);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("foo", onFooEvent);
    };
  }, []);
  if (location.length !== 2) {
    return <></>;
  } else {
    return (
      <div className='App'>
        <ConnectionState isConnected={isConnected} />
        <Events events={fooEvents} />
        <ConnectionManager />

        <MapContainer
          id='map'
          center={location}
          zoom={20}
          // maxZoom={35}
          scrollWheelZoom={1}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          />
          {agencies.map((pos) => {
            return (
              <Marker position={pos}>
                <Popup>
                  {/* make this look good */}
                  Name: {}
                  Name:
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>
      </div>
      // <iframe title='map' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3769.3395962929785!2d72.81109917420278!3d19.13660655006904!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b60f87225701%3A0x7d48b269066ed30a!2sMuntaha%20apartment%2C%20202%2C%20Mangal%20Nagar%2C%20Versova%2C%20Andheri%20West%2C%20Mumbai%2C%20Maharashtra%20400061!5e0!3m2!1sen!2sin!4v1694510629975!5m2!1sen!2sin" width="600" height="450" style={{border: 0}} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
    );
  }
}

export default App;
