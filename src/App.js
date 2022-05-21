import "./App.css";
import React, { useEffect, useState } from "react";
import Header from "./Header";
import { fetchAllTherapists } from "./api";
import TherapistCard from "./TherapistCard";

function App() {
  const [allTherapists, setAllTherapists] = useState(null);

  useEffect(() => {
    setAllTherapists({
      allTherapists: fetchAllTherapists(1),
    });
  }, []);

  return (
    <>
      <Header />
      <div className="therapist-container">
        {allTherapists
          ? allTherapists.allTherapists.map((therapist) => {
              return <TherapistCard {...therapist} />;
            })
          : ""}
      </div>
    </>
  );
}

export default App;

/*
- A ternary operator had to be used on 'allTherapists' because the function was being called
  before the DOM was ready therefore the data was not loading and showing an error in the console as "undefined"
- This allows there to be an empty string for the time being until the DOM is ready and then the function is called

*/
