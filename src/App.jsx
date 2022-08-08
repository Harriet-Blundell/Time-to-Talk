import React, { useEffect, useState } from "react";
import {
  fetchAllTherapists,
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
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    setAllTherapists(fetchAllTherapists(currentPage));
  }, [currentPage]);

  useEffect(() => {
    setNextAppointmentData(fetchNextAvailableAppointmentsByDate());
  }, []);

  const handlePageClick = (number) => {
    window.scrollTo(0, 0);
    setCurrentPage(currentPage + number);
  };

  const handleVideoCheckboxChange = () => {
    setChecked(!checked);
  };

  return (
    <>
      <Header />
      <div class="main-content-container">
        <div class="left-side-container">
        <BookingContents handleVideoCheckboxChange={handleVideoCheckboxChange} checked={checked}/>
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
