import "../styles/TherapistCard.css";
import React, { useEffect, useState } from "react";
import moment from "moment";

export default function TherapistCard({
  id,
  firstName,
  lastName,
  appointment_mediums,
  appointment_types,
  specialisms,
  nextAppointmentData,
}) {
  const [therapistNextAppointment, setTherapistNextAppointment] = useState([]);

  useEffect(() => {
    for (let i = 0; i < nextAppointmentData.length; i++) {
      if (nextAppointmentData[i].id === id) {
        setTherapistNextAppointment(nextAppointmentData[i].nextAvailableTime);
      }
    }
  }, [nextAppointmentData, id]);

  const sortedAppointmentTypeValues = appointment_types.sort();
  
  const appointmentTypeFirstValue =
    appointment_types[0] === "consultation" ? "consultation" : "one-off";

  const sortedAppointmentMedium = appointment_mediums.sort();

  const appointmentMediumFirstValue =
    appointment_mediums[0] === "phone" ? "call-phone.png" : "video-camera.png";

  // sort the appointment type first and medium array alphabetically to avoid doing the above.
  // sort image medium out

  const therapistNextAppointmentParsed = JSON.parse(
    JSON.stringify(moment(therapistNextAppointment).format("LLLL"))
  );

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
        <line></line>
        <div className="therapist-information">
          <h3 className="therapist-name">
            {firstName} {lastName}
          </h3>
          <p className="occupation">Therapist</p>
          {appointment_types.length > 1 ? (
            <div className="appointment-types">
              <p className="appointment-title">
                Appointment types:{" "}
                <span className="appointment-content">
                  consultation and one-off
                </span>
              </p>
            </div>
          ) : (
            <div className="appointment-types">
              <p className="appointment-title">
                Appointment type:{" "}
                <span className="appointment-content">
                  {appointmentTypeFirstValue}
                </span>
              </p>
            </div>
          )}
          <div className="next-available-container">
            <p className="next-available-text">
              Next available:{" "}
              <span className="next-available-content">
                {therapistNextAppointmentParsed}
              </span>
            </p>
          </div>
          <div className="specialism-container">
            <p className="specialism-title">
              Can help you with:{" "}
              {specialisms.length > 1
                ? specialisms.map((specialism) => {
                  return <span className="specialism-content">{specialism}</span>;
                })
                : "N/A"}
            </p>
          </div>
          <div className="therapist-button">
            <p className="therapist-text">Book Now</p>
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

- if the therapist id matches next appointment id, you know the next appointment time matches that specific therapists


TODO: Loop through specialisms

*/
