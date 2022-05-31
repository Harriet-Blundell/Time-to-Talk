import "./TherapistCard.css";
import React from "react";

export default function TherapistCard({
  id,
  firstName,
  lastName,
  appointment_mediums,
  appointment_types,
  specialisms,
}) {
  return (
    <div className="therapist-card-container">
      <div className="therapist-information-container">
        <div className="therapist-initials">
          <h1>
            {firstName[0]}
            {lastName[0]}
          </h1>
        </div>
        <div className="therapist-information">
          <h3 className="therapist-name">
            {firstName} {lastName}
          </h3>
          <p className="occupation">Therapist</p>
          <div>
            <h3>Appointment types:</h3>
            <p>{appointment_types[0]}</p>
            <p>
              {appointment_types[1] !== "undefined" ? appointment_types[1] : ""}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/*
Button component:
- I would need to pass props down to the component such as id, firstName, lastName, appointment_type, appointment_medium, and availability
- The information would need to be passed to "Confirmation" component screen
<p>Therapist</p>
        <p>
          Appointment types: {appointment_types[0]} and {appointment_types[1]}
        </p>
        <div className="specialism-content">
          <div>
            Can help you with:
            {specialisms.length !== 0
              ? specialisms.map((specialism) => {
                  return <span> {specialism}, </span>;
                })
              : " N/A"}
          </div>
        </div>
      </div>
      <div className="button-container">
        <button>Book Now</button>
      </div>

*/
