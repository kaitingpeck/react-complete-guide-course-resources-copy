import { useState, useEffect } from "react";
import Places from "./Places.jsx";

// const places = localStorage.getItem('places'); // synchronous fetch

export default function AvailablePlaces({ onSelectPlace }) {
  const [isFetching, setIsFetching] = useState(false);
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
    setIsFetching(true);
    async function fetchPlaces() {
      const response = await fetch("http://localhost:3000/places");
      const resData = await response.json();
      setAvailablePlaces(resData.places);
      setIsFetching(false);
    }

    fetchPlaces();
  }, []);

  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      isLoading={isFetching}
      loadingText="Fetching place data..."
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
