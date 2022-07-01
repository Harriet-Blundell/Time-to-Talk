import "./App.css";
import React, { useEffect, useState } from "react";
import Header from "./Header";
import {
  fetchAllTherapists,
  fetchNextAvailableAppointmentsByDate,
} from "./api";
import TherapistCard from "./TherapistCard";
import Pagination from "./Pagination";

function App() {
  const [allTherapists, setAllTherapists] = useState();
  const [nextAppointment, setNextAppointment] = useState();
  const [currentPage, setCurrentPage] = useState(1);

  
  useEffect(() => {
    setAllTherapists(fetchAllTherapists(currentPage));
  }, [currentPage]);
  
  console.log(allTherapists, "<<< allTherapists");
  
  useEffect(() => {
    setNextAppointment({
      nextAppointment: fetchNextAvailableAppointmentsByDate(),
    });
  }, []);

  const handlePageClick = (number) => {
    window.scrollTo(0, 0);
    setCurrentPage(currentPage + number);
  };

  console.log(allTherapists, "<<< all therapists");

  return (
    <>
      <Header />
      <div className="therapist-container">
        {allTherapists.map((therapist) => {
              return (
                <TherapistCard
                  {...therapist}
                  nextAppointment={nextAppointment}
                />
              );
            })}
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
