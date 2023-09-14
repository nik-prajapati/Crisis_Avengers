import React from "react";
import Typewriter from "typewriter-effect";
import "../styles/Landingpage.css";
import Footer from "../Components/Footer";
import {Link} from "react-router-dom"
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';


export default function Landingpage() {
  return (
    <>
      <div className="navbar">
        <div className="logo">
          <div className="logoLeft">
          <img src={require("../images/apadalogo.png")} alt="APADA Logo" />
          </div>
        
          <div className="logoRight">
            <p className="logoName leftText">apadaRelief</p>
            <p className="tagline leftText">ONE NETWORK,COUNTLESS HEROES</p>
          </div>
        </div>
        
        <div className="midnav">
            <p className="navopt "><a href="#cont1" style={{ textDecoration: 'none' }}>Contact Us</a></p>
            <p className="navopt"><a href="#cont2" style={{ textDecoration: 'none' }}>Services</a></p>
          </div>
        <div className="buttons">
        <Link to="/govtLogin">
        <button className="gov-button" href="#">Government Agency</button>
        </Link> 
          
          <Link to="/rescueLogin">
          <button className="rescue-button" href="#">
            Rescue Agency
          </button>
          </Link>
          
        </div>
      </div>

      <div className="heroContainer">
        <div
          className="hero"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)),url(${require("../images/Disaster-Management.jpg")})`,
            backgroundColor: "131418",
          }}
        >
          <div className="heroText">
            <Typewriter
              options={{
                strings: [
                  '<span style="color: white;font-family: Impact, Haettenschweiler, Arial Narrow Bold, sans-serif;">WHEN DISASTER STRIKES, apadaRelief RESPONDS!</span>',
                  '<span style="color: white;font-family: Impact, Haettenschweiler, Arial Narrow Bold, sans-serif;">WHEN DISASTER STRIKES, apadaRelief RESPONDS!</span>',
                ], // Add your strings here
                autoStart: true, // Auto-start the typing animation
                loop: true, // Enable looping
                delay: 500, // Delay between strings (milliseconds)
                deleteSpeed: "natural", // Speed of deleting characters ('natural' provides a realistic typing effect)
              }}
              className="textColor"
            />
          </div>
          <div className="textbottom">"Together we stand united for relief"</div>
        </div>
      </div>

      <div className="aboutUs ">
      <div id="cont2" className="govtcontainer ">
            <div className="leftSide">
              <div className="govTitle">
              <h3>GOVERNMENT AGENCY</h3>
              </div>
              
              <div className="points">
              <ul>
                <li className="listPoint"><CheckCircleOutlineIcon/>Connect with Local Heroes:</li>
                <span className="subpoint">Easily connect with registered rescue agencies through our platform</span>

                <li className="listPoint"><CheckCircleOutlineIcon/>Tailored Requests:</li>
                <span className="subpoint"> Send specific requests based on the calamity's location, required resources, and urgent needs.</span>

                <li className="listPoint"><CheckCircleOutlineIcon/>Map-Based Interface:</li>
                <span className="subpoint">Visualize rescue agency locations on a dynamic map for quick decision-making.</span>
                
                <li className="listPoint"><CheckCircleOutlineIcon/>Resource Collaboration:</li>
                <span className="subpoint">Collaborate with multiple agencies for medical, transport, and other vital resources.</span>

                <li className="listPoint"><CheckCircleOutlineIcon/>Efficient Communication</li>
                <span className="subpoint">Utilize our integrated chat application for real-time communication.</span>
              </ul>
              </div>
              
            </div>
            <div className="rightSide">
             <img src={require("../images/indiamap.png")}></img>
            </div>
         </div>
      </div>

      <div className="aboutUs">
      <div  className="govtcontainer ">
             
            <div className="rightSide">
             <img className="rescueimg" src={require("../images/rescue.png")}></img>
            </div>

            <div className="leftSide">
              <div className="govTitle">
              <h3>RESCUE AGENCY</h3>
              </div>
              
              <div className="points">
              <ul>
                <li className="listPoint"><CheckCircleOutlineIcon/>Register and Showcase: </li>
                <span className="subpoint"> Register your agency with detailed information about your expertise, resources, and contact details.</span>

                <li className="listPoint"><CheckCircleOutlineIcon/>Accept or Reject:</li>
                <span className="subpoint"> Choose to accept or reject government agency requests based on your capacity and availability.</span>

                <li className="listPoint"><CheckCircleOutlineIcon/>Resource Sharing:</li>
                <span className="subpoint">Request resources from other agencies or offer your assistance to fulfill critical needs.</span>
                
                <li className="listPoint"><CheckCircleOutlineIcon/>Operational Updates:</li>
                <span className="subpoint">Share your rescue operations and experiences through blog-style posts.</span>

                <li className="listPoint"><CheckCircleOutlineIcon/>Collaboration Hub:</li>
                <span className="subpoint">Collaborate with other agencies for seamless disaster response.</span>
              </ul>
              </div>
              
            </div>
            
         </div>
      </div>

      
      <div id="cont1">
      <Footer/>
      </div>
     
    </>
  );
}