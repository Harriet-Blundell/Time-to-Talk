import "./App.css";
import React, { useState, useEffect } from "react";
import { fetchAllTherapists } from "./api";
import TherapistCard from "./TherapistCard";

function App() {
  const [allTherapists, setAllTherapists] = useState();

  useEffect(() => {
    setAllTherapists({
      allTherapists: fetchAllTherapists(1),
    });
  }, []);

  return (
    <div className="container">
      {allTherapists.allTherapists.map((therapist, index) => {
        return (
          <li key={index}>
            <h1>{therapist.firstName}</h1>
          </li>
        );
      })}
    </div>
  );
}

export default App;
