import React, { useState } from "react";
import axios from "axios";
import "./ReviewRequest.scss";
import SideBar from "../request/SideBar";
import MapPageHeader from "../request/MapPageHeader";
import { useContext } from "react";
import reviewContext from "../../context/ReviewRequestContext.jsx";
import { useEffect } from "react";
import socket from "../../helpers/socket.js";
// import chatIcon from "../../image/chat.svg";

const ReviewRequest = () => {
  const [sentSection, setSentSection] = useState(true);
  const { reviewData, setReviewData } = useContext(reviewContext);
  // const [dummyD, setDummyD] = useState({});
  const [sentRequests, setSentRequests] = useState([]);
  const [rcvdRequests, setRcvdRequests] = useState([]);

  useEffect(() => {
    console.log(sentRequests);
    socket.on("responded-to-request", (reqId, newStatus) => {
      console.log("hello");
      setSentRequests((prev) => {
        const newarray = prev.map((item) => {
          if (item._id === reqId) return { ...item, status: newStatus };
          return item;
        });
        console.log(newarray);
        return newarray;
      });
    });

    return () => {
      socket.off("responded-to-request");
    };
  }, []);

  useEffect(() => {
    const fetchReviewRequest = async () => {
      const [sentResp, receivedResp] = await Promise.all([
        axios.get("http://localhost:3000/getsentrequests", {
          withCredentials: true,
        }),
        axios.get("http://localhost:3000/getreceivedrequests", {
          withCredentials: true,
        }),
      ]);
      console.log(sentResp, receivedResp);
      // if(sentResp.status==200){
      // setDummyD({ ...dummyD, sentRequests: sentResp.data.requests })

      // const allData = {
      //   sentRequests: sentResp.data.requests,
      //   rcvdRequests: receivedResp.data.requests,
      // };
      // setDummyD(allData);
      setSentRequests(sentResp.data.requests);
      setRcvdRequests(receivedResp.data.requests);
    };

    fetchReviewRequest();
  }, []);

  const handleStatusChange = (e, reqId, requesterId, status) => {
    try {
      e.preventDefault();
      const ind = rcvdRequests.findIndex((x) => x._id === reqId);
      setRcvdRequests((prev) => {
        const newarray = prev.map((p, i) => {
          if (i === ind) return { ...p, status: status };
          return p;
        });

        return newarray;
      });

      socket.emit("respond-to-request", requesterId, reqId, status);
    } catch (error) {
      console.log(error);
    }
  };

  // const handleReject = (e, reqId, requesterId) => {
  //   try {
  //     e.preventDefault();
  //     const ind = rcvdRequests.findIndex((x) => x._id === reqId);
  //     setRcvdRequests((prev) => {
  //       const newarray = prev.map((p, i) => {
  //         if (i === ind) return { ...p, status: "Rejected" };
  //         return p;
  //       });
  //       console.log(newarray);
  //       return newarray;
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <div>
      <MapPageHeader />
      <div className="review-request-container">
        <SideBar />
        <div className="section">
          <div className="btn-section">
            <button
              className={
                sentSection ? "review-btn active-btn" : "review-btn disable-btn"
              }
              onClick={() => setSentSection(true)}
            >
              Sent
            </button>
            <button
              className={
                sentSection ? "review-btn disable-btn" : "review-btn active-btn"
              }
              onClick={() => setSentSection(false)}
            >
              Recived
            </button>
          </div>

          <div className="review-section">
            <div
              className={
                sentSection
                  ? "sent-section active-section"
                  : "sent-section disable-section"
              }
            >
              <ul>
                {sentRequests &&
                  sentRequests.map((recieve, idx) => {
                    return (
                      <div className="request-card">
                        <div className="agency-info">
                          <p>
                            To:{" "}
                            {recieve.requestee_id && recieve.requestee_id.name}
                          </p>
                          <p>
                            From:{" "}
                            {recieve.rescue_requester_id
                              ? recieve.rescue_requester_id.name
                              : recieve.govt_requester_id.name}
                          </p>
                        </div>
                        {
                          <div className="time-info">
                            <p>
                              On: {new Date(recieve.createdAt).toLocaleString()}
                            </p>
                            {recieve.updatedAt != recieve.createdAt && (
                              <p>
                                Updated At:{" "}
                                {new Date(recieve.updatedAt).toLocaleString()}
                              </p>
                            )}
                          </div>
                        }

                        <div className="status-info">
                          <button
                            className={`status-btn ${recieve.status.toLowerCase()}`}
                          >
                            {recieve.status}
                          </button>
                        </div>
                      </div>
                    );
                  })}
              </ul>
            </div>

            <div
              className={
                sentSection
                  ? "Recive-section disable-section"
                  : "Recive-section active-section"
              }
            >
              {
                <ul>
                  {rcvdRequests &&
                    rcvdRequests.map((recieve, idx) => (
                      <div className="request-card">
                        <p>
                          On: {new Date(recieve.createdAt).toLocaleString()}
                        </p>
                        {/* <p>
          Updated At:{" "}
          {new Date(recieve.updatedAt).toLocaleString()}
        </p> */}
                        <div className="flex flex-col">
                          <p>
                            To:{" "}
                            {recieve.requestee_id.name &&
                              recieve.requestee_id.name}
                          </p>
                          <p>
                            From:{" "}
                            {recieve.rescue_requester_id
                              ? recieve.rescue_requester_id.name
                              : recieve.govt_requester_id.name}
                          </p>
                        </div>
                        {recieve.status !== "Pending" ? (
                          <div className="status-info">
                            <button
                              className={`status-btn ${recieve.status.toLowerCase()}`}
                            >
                              {recieve.status}
                            </button>
                          </div>
                        ) : (
                          <div className="flex gap-4">
                            <button
                              className="status-btn completed"
                              onClick={(e) =>
                                handleStatusChange(
                                  e,
                                  recieve._id,
                                  recieve.rescue_requester_id._id,
                                  "Accepted"
                                )
                              }
                            >
                              Accept
                            </button>
                            <button
                              className="status-btn rejected"
                              onClick={(e) =>
                                handleStatusChange(
                                  e,
                                  recieve._id,
                                  recieve.rescue_requester_id._id,
                                  "Rejected"
                                )
                              }
                            >
                              Reject
                            </button>
                          </div>
                        )}
                      </div>
                    ))}
                </ul>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewRequest;
