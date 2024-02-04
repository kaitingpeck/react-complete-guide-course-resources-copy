import { useState, useEffect } from "react";
import Places from "./Places.jsx";
import Error from "./Error.jsx";

// const places = localStorage.getItem('places'); // synchronous fetch

export default function AvailablePlaces({ onSelectPlace }) {
  const [isFetching, setIsFetching] = useState(false);
  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [error, setError] = useState();

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
      try {
        const response = await fetch("http://localhost:3000/places");
        const resData = await response.json();

        if (!response.ok) {
          throw new Error("Failed to fetch places");
        }

        setAvailablePlaces(resData.places);
      } catch (error) {
        setError({
          message:
            error.message || "Could not fetch places, please try again later",
        });
      }

      setIsFetching(false);
    }

    fetchPlaces();
  }, []);

  if (error) {
    return <Error title="An error occurred!" message={error.message} />;
  }

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
