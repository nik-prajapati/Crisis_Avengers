import React, { useEffect, useState } from "react";
// import "../styles/Dashboards.css";
// import socket from "../helpers/socket";

const Request = ({ user, payload, socket}) => {

  const [requestSend,setRequestSend]=useState();

  return (
    <div>
      <div className="contain" >
        <button
          className="request-submit-btn"
          onClick={() => {
            // const dummyReq = {
            //   reqAgency: payload.reqAgency,
            //   item: { type: "Medical", name: "Bandages", qty: "50" },
            //   user:user
            // };

            const dummyReq = {
              // govt_requester_id: "6501f2d76d5b47ed6214311d",
              rescue_requester_id: user._id,
              requestee_id: payload.reqAgency._id,
              requested_items: [
                {
                  type: "Medical",
                  name: "Bandages",
                  qty: 50,
                  unit: "pieces",
                },
                { type: "Basic", name: "Water", qty: 20, unit: "L" },
              ],
              location: {
                latitude: 18.914042,
                longitude: 72.821693,
              },
            };


            socket.emit("send-request", payload.reqAgency.id, dummyReq);
            console.log("Request Sent")
          }}
        >
          Send Request
        </button>

        <button
          className=" request-submit-btn message-btn"
          onClick={() => {
            const dummyReq = {
              type: "Medical",
              name: "Bandages",
              qty: "50",
            };

            socket.emit("send-message", payload.reqAgency.id, {
              message: "test message",
            });
          }}
        >
          Send Message
        </button>
      </div>
    </div>
  );
};

export default Request;
