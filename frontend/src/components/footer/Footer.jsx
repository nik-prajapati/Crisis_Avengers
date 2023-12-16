import react from "react";
import "./Footer.css";
import {AiFillFacebook, AiFillInstagram, AiFillTwitterCircle} from "react-icons/ai"



export default function Footer() {
  return (
    <>
      <footer className="section bg-footer">
        
          <div className="mainBox">
            <div className="col-lg-3">
              <div className="">
                <h6 className="headingCol">
                  Information
                </h6>
                <ul className="column">
                  <li>
                    <a href="">Pages</a>
                  </li>
                  <li>
                    <a href="">Our Team</a>
                  </li>
                  <li>
                    <a href="">Awareness </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-lg-3">
              <div className="">
                <h6 className="headingCol">
                  Ressources
                </h6>
                <ul className="column">
                  <li>
                    <a href="">Monitoring Grader </a>
                  </li>
                  <li>
                    <a href="">Video Tutorial</a>
                  </li>
                  <li>
                    <a href="">Term &amp; Service</a>
                  </li>
                  
                </ul>
              </div>
            </div>

            <div className="col-lg-2">
              <div className="">
                <h6 className="headingCol">Help</h6>
                <ul className="column">
                  <li>
                    <a href="">Sign Up </a>
                  </li>
                  <li>
                    <a href="">Login</a>
                  </li>
                  <li>
                    <a href="">Terms of Services</a>
                  </li>
                  <li>
                    <a href="">Privacy Policy</a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="lastCol">
              <div className="">
                <h6 className="headingCol">
                  Contact Us
                </h6>
                <p className="contact-info mt-5">
                  Contact us if need help with anything
                </p>
                <p className="contact-info ">+91-11-26701700 (Mon-Fri - 9:30AM-6:00PM)</p>
                <p className="contact-info">Control Room: +91-11-26701728 (Mon-Fri 24X7)</p>
                <div className="mt-5">
                  <ul className="contactIcon">
                  <li>
                  <AiFillTwitterCircle/>
                  </li>
                  <li>
                   <AiFillInstagram/>
                  </li>
                  <li>
                    <AiFillFacebook/>
                  </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        

        <div className="bottomFooter">
          <p className="textfoot">2023 © Crisis Avengers, All Rights Reserved</p>
        </div>
      </footer>
    </>
  );
}
