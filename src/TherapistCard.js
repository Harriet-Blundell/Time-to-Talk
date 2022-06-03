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

  const appointmentMediumFirstValue =
    appointment_mediums[0] === "video" ? "video-camera.png" : "call-phone.png";

  return (
    <div className="therapist-card-container">
      <div className="therapist-information-container">
        <div className="therapist-initials">
          <h1>
            {firstName[0]}
            {lastName[0]}
          </h1>
          {appointment_types.length === 2 ? (
            <div className="appointment-medium-icons">
              <img
                src="video-camera.png"
                alt="video camera icon"
                className="video-icon"
              />
              <img src="call-phone.png" alt="phone call icon" />
            </div>
          ) : (
            <div className="appointment-medium-icons">
              <img src={appointmentMediumFirstValue} alt="video camera icon" />
            </div>
          )}
        </div>
        <div className="therapist-information">
          <h3 className="therapist-name">
            {firstName} {lastName}
          </h3>
          <p className="occupation">Therapist</p>
          {appointment_types.length === 2 ? (
            <div className="appointment-types">
              <h4>Appointment types:</h4>
              <p>
                {appointmentTypeFirstValue} and {appointmentTypeSecondValue}
              </p>
            </div>
          ) : (
            <div className="appointment-types">
              <h4>Appointment type:</h4>
              <p>{appointmentTypeFirstValue}</p>
            </div>
          )}
          <div className="specialism-container">
            <span className="specialism-title">Can help you with: </span>
            {specialisms.length > 1
              ? specialisms.map((specialism) => {
                  return <span className="specialism">{specialism}</span>;
                })
              : "N/A"}
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


TODO: Loop through specialisms

*/
