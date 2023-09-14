import React, { useEffect, useState } from "react";
// import "../styles/Dashboards.css";
// import socket from "../helpers/socket";

const Request = ({ user, payload, socket}) => {
  
  return (
    <div>
      <div className="contain" >
        <button
          className="request-submit-btn"
          onClick={() => {
            const dummyReq = {
              reqAgency: payload.reqAgency,
              item: { type: "Medical", name: "Bandages", qty: "50" },
              user:user
            };

            socket.emit("send-request", payload.reqAgency.id, dummyReq);
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
