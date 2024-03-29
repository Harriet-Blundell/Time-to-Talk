import React from "react";
import "../styles/BookingMedium.css";

export default function BookingMedium({ handleCheckboxChange }) {
  return (
    <div class="booking-medium-container">
      <div class="video-option-container">
        <input
          type="checkbox"
          id="video"
          name="video"
          value="Video Call"
          class="video-checkbox"
          onClick={handleCheckboxChange}
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
          id="phone"
          name="phone"
          value="Phone"
          class="phone-checkbox"
          onClick={handleCheckboxChange}
        />
        <img src="call-phone.png" alt="phone icon" class="phone-img" />
        <label for="phone-call">Phone</label>
      </div>
    </div>
  );
}
