import { useState, useEffect } from "react";
import Places from "./Places.jsx";

// const places = localStorage.getItem('places'); // synchronous fetch

export default function AvailablePlaces({ onSelectPlace }) {
  const [availablePlaces, setAvailablePlaces] = useState([]);

  // creates an infinite loop - this code will be executed everytime component function executes - so a new request is sent every time the function executes
  // the state update for availablePlaces causes component function to execute -> fetch execute -> state update -> fetch execute -> ...
  // fetch("http://localhost:3000/places")
  // .then((response) => {
  // return response.json();
  // })
  // .then((resData) => {
  // setAvailablePlaces(resData.places);
  // });

  useEffect(() => {
    fetch("http://localhost:3000/places")
      .then((response) => {
        return response.json();
      })
      .then((resData) => {
        setAvailablePlaces(resData.places);
      });
  }, []);

  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
