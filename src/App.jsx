import React, { useEffect, useState } from "react";
import {
  fetchAllTherapists,
  fetchFilteredTherapistsByMedium,
  fetchNextAvailableAppointmentsByDate,
} from "./api";
import "./App.css";
import Header from "./Components/Header";
import TherapistCard from "./Components/TherapistCard";
import Pagination from "./Components/Pagination";
import BookingContents from "./Components/BookingContents";

function App() {
  const [allTherapists, setAllTherapists] = useState();
  const [nextAppointmentData, setNextAppointmentData] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [checkedState, setCheckedState] = useState({
    "video-call": false,
    "phone-call": false,
  });

  useEffect(() => {
    const keysOfCheckedState = Object.keys(checkedState);

    const filteredAppointmentMedium = keysOfCheckedState.filter((key) => {
      return checkedState[key] ? key : "";
    });

    if (
      (filteredAppointmentMedium.includes("video-call") ||
        filteredAppointmentMedium.includes("phone-call")) &&
      filteredAppointmentMedium.length === 1
    ) {
      setAllTherapists(
        fetchFilteredTherapistsByMedium(
          currentPage,
          filteredAppointmentMedium[0]
        )
      );
    } else if (
      filteredAppointmentMedium.includes("video-call", "phone-call") &&
      filteredAppointmentMedium.length === 2
    ) {
      setAllTherapists(
        fetchFilteredTherapistsByMedium(currentPage, filteredAppointmentMedium)
      );
    } else {
      setAllTherapists(fetchAllTherapists(currentPage));
    }
  }, [currentPage, checkedState]);

  useEffect(() => {
    setNextAppointmentData(fetchNextAvailableAppointmentsByDate());
  }, []);

  const handlePageClick = (number) => {
    window.scrollTo(0, 0);
    setCurrentPage(currentPage + number);
  };

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setCheckedState({ ...checkedState, [name]: checked });
  };

  return (
    <>
      <Header />
      <div class="main-content-container">
        <div class="left-side-container">
          <BookingContents handleCheckboxChange={handleCheckboxChange} />
        </div>
        <div className="therapist-container">
          {allTherapists
            ? allTherapists.map((therapist) => {
                return (
                  <TherapistCard
                    {...therapist}
                    nextAppointmentData={nextAppointmentData}
                  />
                );
              })
            : ""}
        </div>
      </div>
      <Pagination currentPage={currentPage} handlePageClick={handlePageClick} />
    </>
  );
}

export default App;

/*
- A ternary operator had to be used on 'allTherapists' because the function was being called
  before the DOM was ready therefore the data was not loading and showing an error in the console as "undefined"
- This allows there to be an empty string for the time being until the DOM is ready and then the function is called

Pagination:
- The useState Hook helps to preserve the values between function calls.
- The useState Hook will return a pair of values, the first being the variable's state,
  and the second is the function to set the state

useEffect Hook:
- If you'd like to perform any side effects like data fetching, DOM manipulation, or subscribing and unscribing to events
  useEffect Hook will help
*/
