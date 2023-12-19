import React, { useEffect, useState } from "react";
import "../../pages/request/Request.scss";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useContext } from "react";
import reviewContext from "../../context/ReviewRequestContext.jsx";
// import sendMail from "../../pages/request/nodemailer";


const Request = ({ user, payload, socket, setPayLoad }) => {
 
  console.log(payload);
  const [requestSend, setRequestSend] = useState(null);
  const { reviewData, setReviewData } = useContext(reviewContext);


  const handlerequestSend = () => {
    const dummyReq = {
      rescue_requester_id: user._id,
      requestee_id: payload.reqAgency.id,
      distance: payload.reqAgency.distance,
      
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
    // setRequestSend(dummyReq)
    console.log(dummyReq)
    socket.emit("send-request", payload.reqAgency.id, dummyReq);
    toast.success("Request Sent Successfully");
    sendMail(dummyReq.reqAgency.email,"New Request Arrived","Please Review the review Page for further info")

    setReviewData([...reviewData, dummyReq]);
    setTimeout(() => {
      setPayLoad(null);
    }, 5000);
  };

  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      {/* Same as */}
      <ToastContainer />

      {
        // card component
        payload && user && (
          <div className="request-body-card">
            <div className="request-body">
              <div className="request-personal-info">
                <h3>To : {payload.reqAgency.name} </h3>
                <h3>From : {user.email.split("@")[0].toUpperCase()} </h3>
              </div>

              <div className="action-btn">
                <button
                  className="request-submit-btn request-action-btn"
                  onClick={() => handlerequestSend()}
                >
                  Send Request
                </button>

                <button className="request-status-btn request-action-btn">
                  View Status
                </button>
              </div>
            </div>
          </div>
        )
      }

      {
        //   <div className='contain'>
        //   <button
        //     className=' request-submit-btn message-btn'
        //     onClick={() => {
        //       const dummyReq = {
        //         type: "Medical",
        //         name: "Bandages",
        //         qty: "50",
        //       };
        //       socket.emit("send-message", payload.reqAgency.id, {
        //         message: "test message",
        //       });
        //     }}
        //   >
        //     Send Message
        //   </button>
        // </div>
      }
    </div>
  );
};

export default Request;
