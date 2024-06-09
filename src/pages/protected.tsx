import React from 'react'
import { CelebrateIcon } from "../assets/images";
import { useNavigate } from "react-router-dom";

const ProtectedView = () => {
    const navigate = useNavigate();

  return (
    <div className="fill" id="home-container">
      <div className="main-container">
        <div className="top-band success-title bold-500">
          <img src={CelebrateIcon} alt="Login successful" className="success-icon" /> Protected View
        </div>
        <div className="inner-content">
         Any authenticated user can access this page
         <br />
         <br />
          <button onClick={() => navigate("/")} className="sessionButton">
            Home
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProtectedView
