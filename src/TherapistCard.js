import "./TherapistCard.css";
import React from "react";

export default function TherapistCard({
  id,
  firstName,
  lastName,
  apointment_mediums,
  appointment_types,
  specialisms,
}) {
  return (
    <div className="therapist-card-container">
      <div class="therapist-content">
        <h3>
          {firstName} {lastName}
        </h3>
        <p>Therapist</p>
        <p>
          Appointment types: {appointment_types[0]} and {appointment_types[1]}
        </p>
        <div className="specialism-content">
          <div>
            Can help you with:
            {specialisms.length !== 0 ? specialisms.map((specialism) => {
              return <span> {specialism}, </span>;
            }) : " N/A"}
          </div>
        </div>
      </div>
      <div className="button-container">
        <button>Book Now</button>
      </div>
    </div>
  );
}
