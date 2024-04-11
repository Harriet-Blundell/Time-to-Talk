import "../styles/Header.css";
import React from "react";

export default function Header() {
  return (
    <div className="header-container">
      <div className="logo-container">
        <img src="timetotalk.png" alt="time to talk logo" />
      </div>
      <div class="header-title">
        <h3 className="title">time to talk</h3>
      </div>
    </div>
  );
}