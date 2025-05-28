import React from "react";
import { useNavigate } from 'react-router-dom';
import { useEffect } from "react";

import { FaSignOutAlt } from 'react-icons/fa';
import './Thankyou.css';

const ThankYou = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    sessionStorage.removeItem("username");
    navigate("/");
  };
  useEffect(() => {
    window.history.pushState(null, "", window.location.href);
    const blockBack = () => {
      window.history.pushState(null, "", window.location.href);

    };
    window.addEventListener("popstate", blockBack);

    const preventRefresh = (e) => {
      if (e.key == "F5" || (e.ctrlKey && e.key.toLowerCase() === "r")) {
        e.preventDefault();
      }
    };
    window.addEventListener("keydown", preventRefresh);
    const timer = setTimeout(() => {
      handleLogout();
    }, 2000);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("popstate", blockBack);
      window.removeEventListener("keydown", preventRefresh);
    };
  }, []);
  return (
    <div className="thankyou-wrapper">
      <h2 className="thankyou-title">Thank You!</h2>
      <p className="thankyou-text">Your responses have been submitted successfully.</p>

      <button
        className="logout-btn"
        onClick={handleLogout}
        style={{
          backgroundColor: '#ff4757',
          color: 'white',
          padding: '10px 20px',
          fontSize: '16px',
          borderRadius: '5px',
          cursor: 'pointer',
          marginTop: '20px',
        }}
      >
        <FaSignOutAlt /> Logout
      </button>

    </div>
  );
};

export default ThankYou;