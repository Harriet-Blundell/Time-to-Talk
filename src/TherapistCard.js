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
  const appointmentTypeFirstValue =
    appointment_types[0] === "one_off" ? "one-off" : "consultation";
  const appointmentTypeSecondValue =
    appointment_types[1] === "one_off" ? "one-off" : "consultation";

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
          <div className="appointment-types">
            <h3>Appointment types:</h3>
            {appointment_types.length === 2 ? (
              <p>
                {appointmentTypeFirstValue} and {appointmentTypeSecondValue}
              </p>
            ) : (
              <p>{appointmentTypeFirstValue}</p>
            )}
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


Logic:
- if appointment_types has a length of two, you know it has consultation and one_off
- if appointment_types doesn't then you access the first index
*/
