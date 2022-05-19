import "./App.css";
import React, { useEffect, useState } from "react";
import Header from "./Header";
import { fetchAllTherapists } from "./api";
import TherapistCard from "./TherapistCard";

function App() {
  const [allTherapists, setAllTherapists] = useState([]);

  useEffect(() => {
    setAllTherapists({
      allTherapists: fetchAllTherapists(1)
    })
  }, []);

  return (
    <>
      <Header />
      <div className="therapist-container">
      {allTherapists.allTherapists.map((therapist) => {
        return <TherapistCard {...therapist} />
      })}
      </div>
    </>
  );
}

export default App;
