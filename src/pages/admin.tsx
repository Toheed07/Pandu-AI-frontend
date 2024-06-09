import React from 'react'
import axios from "axios";
import { getApiDomain, notifyError, notifySuccess } from "../config";
import { CelebrateIcon } from "../assets/images";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AdminView = () => {
  const navigate = useNavigate();


  //this function admin can access
  const deleteAllUser = async () => {
    try {
      let response = await axios.get(getApiDomain() + "/delete_all");
      const res = response.data;
      notifySuccess("Request successful")
      console.log(res);
    } catch (error: any) {
      if (error.response && error.response.status === 403) {
        notifyError('Error 403: Forbidden');
      } else {
        console.error('An error occurred:', error);
      }
    }
  }

  //this function admin cannot access
  const updateUser = async () => {
    try {
      let response = await axios.get(getApiDomain() + "/update_user");
      const res = response.data;
      notifySuccess("Request successful")
      console.log(res);
    } catch (error: any) {
      if (error.response && error.response.status === 403) {
        notifyError('Error 403: Forbidden');
      } else {
        console.error('An error occurred:', error);
      }
    }
  }

  return (
    <div className="fill" id="home-container">
      <div className="main-container">
        <div className="top-band success-title bold-500">
          <img src={CelebrateIcon} alt="Login successful" className="success-icon" /> Admin View
        </div>
        <div className="inner-content">
          <button onClick={deleteAllUser} className="sessionButton">
            Delete all user
          </button>
          <br />
          <button onClick={updateUser} className="sessionButton">
            update user
          </button>
          <br />
          <button onClick={() => navigate("/")} className="sessionButton">
            Home
          </button>
        </div>
      </div>
    </div>
  )
}

export default AdminView
