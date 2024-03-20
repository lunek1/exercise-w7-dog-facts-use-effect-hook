import React, { useEffect, useState } from "react";
import { DogFact } from "./components/DogFact";
import "./styles.css";

export const App = () => {
  // Initialize state for storing the dog fact
  const [dogFact, setDogFact] = useState(null);

  // Define the API endpoint
  const URL = "https://dogapi.dog/api/v2/facts";

  // Function to fetch the dog fact from the API
  const fetchDogFact = () => {
    fetch(URL)
      .then((res) => res.json())
      .then((data) => {
        if (data && data.data && data.data.length > 0) {
          setDogFact(data.data[0]);
        } else {
          throw new Error("No dog facts found");
        }
      })
      .catch((error) => {
        console.error("Error fetching dog fact:", error);
      });
  };

  // Fetch the dog fact when the component mounts
  useEffect(() => {
    fetchDogFact();
  }, []);

  // BONUS ADD - Function to handle generating a new fact
  const handleNewFact = () => {
    fetchDogFact();
  };

  return (
    <div className="app-container">
      <div className="text">
        {dogFact ? <DogFact fact={dogFact} /> : <p>Loading...</p>}
      </div>
      {/* BONUS ADD - Button to generate a new fact instead of having to click refresh */}
      <button onClick={handleNewFact}>Generate New Fact</button>
    </div>
  );
};
