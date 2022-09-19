import React from "react";
import "../styles/BookingMedium.css";

export default function BookingMedium({ handleVideoCheckboxChange, handlePhoneCheckboxChange }) {
  return (
    <div class="booking-medium-container">
      <div class="video-option-container">
        <input
          type="checkbox"
          id="video-call"
          name="video-call"
          value="Video Call"
          class="video-checkbox"
          onClick={handleVideoCheckboxChange}
        />
        <img
          src="video-camera.png"
          alt="video camera icon"
          class="video-camera-img"
        />
        <label for="video-call" class="video-call-text">
          Video Call
        </label>
      </div>
      <div class="phone-option-container">
        <input
          type="checkbox"
          id="phone-call"
          name="phone-call"
          value="Phone"
          class="phone-checkbox"
          onClick={handlePhoneCheckboxChange}
        />
        <img src="call-phone.png" alt="phone icon" class="phone-img" />
        <label for="phone-call">Phone</label>
      </div>
    </div>
  );
}
