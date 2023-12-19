import React, { useState } from "react";
import axios from "axios";
import "./ReviewRequest.scss";
import SideBar from "../request/SideBar";
import MapPageHeader from "../request/MapPageHeader";
import { useContext } from "react";
import reviewContext from "../../context/ReviewRequestContext.jsx";
import { useEffect } from "react";
// import chatIcon from "../../image/chat.svg";

const ReviewRequest = () => {
  const [sentSection, setSentSection] = useState(true);
  const { reviewData, setReviewData } = useContext(reviewContext);
  // const [dummyD, setDummyD] = useState({});
  const [sentRequests, setSentRequests] = useState([]);
  const [rcvdRequests, setRcvdRequests] = useState([]);

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

  const handleAccept = (e, reqId) => {
    try {
      e.preventDefault();
      const ind = rcvdRequests.find((x) => x._id === reqId);
      setRcvdRequests((prev) => {
        console.log(prev);
        prev[ind] = { ...prev[ind], status: "Accepted" };
        return prev;
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleReject = (e, reqId) => {
    try {
      e.preventDefault();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <MapPageHeader />
      <div className="review-request-container">
        <div className="siderectangle">
           <SideBar />
        </div>
        
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
                              onClick={(e) => handleAccept(e, recieve._id)}
                            >
                              Accept
                            </button>
                            <button
                              className="status-btn rejected"
                              onClick={(e) => handleReject(e, recieve._id)}
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
