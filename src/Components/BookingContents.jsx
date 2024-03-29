import React from "react";
import "../styles/BookingContents.css";
import BookingMedium from "./BookingMedium";

export default function BookingContents({ handleCheckboxChange }) {
  return (
    <div class="book-meeting-container">
      <h1 class="booking-header">Book a meeting</h1>
      <p class="booking-text">Method:</p>
      <BookingMedium handleCheckboxChange={handleCheckboxChange} />
    </div>
  );
}
