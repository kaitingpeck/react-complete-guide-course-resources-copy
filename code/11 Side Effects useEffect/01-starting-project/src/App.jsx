import { useRef, useState, useEffect } from "react";

import Places from "./components/Places.jsx";
import { AVAILABLE_PLACES } from "./data.js";
import Modal from "./components/Modal.jsx";
import DeleteConfirmation from "./components/DeleteConfirmation.jsx";
import logoImg from "./assets/logo.png";
import { sortPlacesByDistance } from "./loc.js";

// only run once in entire app lifecycle when app starts; rather than on every re-render
const storedIds = JSON.parse(localStorage.getItem("selectedPlaces")) || [];
const storedPlaces = storedIds.map((id) =>
  AVAILABLE_PLACES.find((place) => place.id === id)
);

function App() {
  const selectedPlace = useRef();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [pickedPlaces, setPickedPlaces] = useState(storedPlaces);

  // use of useEffect here is redundant, because the code inside runs synchronously, not async
  // app component doesn't finish rendering before this is fully executed; this must execute before app comp is fully rendered
  // useEffect(() => {
  // const storedIds = JSON.parse(localStorage.getItem("selectedPlaces")) || [];
  // const storedPlaces = storedIds.map((id) =>
  //   AVAILABLE_PLACES.find((place) => place.id === id)
  // );
  // setPickedPlaces(storedPlaces); // will lead to infinite loop without useEffect
  // }, []);

  // code inside runs async
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const sortedPlaces = sortPlacesByDistance(
        AVAILABLE_PLACES,
        position.coords.latitude,
        position.coords.longitude
      );
      // console.log("Executing side effect");
      setAvailablePlaces(sortedPlaces);
    });
  }, []);

  // exposed by browser to JS code that runs in browser (not from React)
  // async code, side effect
  // navigator.geolocation.getCurrentPosition((position) => {
  //   // callback after location is fetched
  //   const sortedPlaces = sortPlacesByDistance(
  //     AVAILABLE_PLACES,
  //     position.coords.latitude,
  //     position.coords.longitude
  //   );
  //   console.log("Executing side effect");
  //   setAvailablePlaces(sortedPlaces); // triggers a new render cycle, however this will trigger an infinite loop (on re-render, getCurrentPositionIsCalled, setAvailablePlaces is set) - useEffect fixes this
  // });

  function handleStartRemovePlace(id) {
    setModalIsOpen(true);
    selectedPlace.current = id;
  }

  function handleStopRemovePlace() {
    setModalIsOpen(false);
  }

  function handleSelectPlace(id) {
    setPickedPlaces((prevPickedPlaces) => {
      if (prevPickedPlaces.some((place) => place.id === id)) {
        return prevPickedPlaces;
      }
      const place = AVAILABLE_PLACES.find((place) => place.id === id);
      return [place, ...prevPickedPlaces];
    });

    const storedIds = JSON.parse(localStorage.getItem("selectedPlaces")) || []; // get with fallback to []
    // from browser, will still be avail after reloading or leave the website and return
    if (storedIds.indexOf(id) == -1) {
      localStorage.setItem(
        "selectedPlaces",
        JSON.stringify([id, ...storedIds])
      );
    }
  }

  function handleRemovePlace() {
    setPickedPlaces((prevPickedPlaces) => {
      const ret = prevPickedPlaces.filter(
        (place) => place.id !== selectedPlace.current
      );
      localStorage.setItem(
        "selectedPlaces",
        JSON.stringify(ret.map((place) => place.id))
      );
      return ret;
    });
    setModalIsOpen(false);

    // const storedIds = JSON.parse(localStorage.getItem("selectedPlaces")) || [];
    // localStorage.setItem(
    // "selectedPlaces",
    // JSON.stringify(storedIds.filter((id) => id !== selectedPlace.current))
    // JSON.stringify(pickedPlaces.map((place) => place.id))
    // );
  }

  return (
    <>
      <Modal open={modalIsOpen}>
        <DeleteConfirmation
          onCancel={handleStopRemovePlace}
          onConfirm={handleRemovePlace}
        />
      </Modal>

      <header>
        <img src={logoImg} alt="Stylized globe" />
        <h1>PlacePicker</h1>
        <p>
          Create your personal collection of places you would like to visit or
          you have visited.
        </p>
      </header>
      <main>
        <Places
          title="I'd like to visit ..."
          fallbackText={"Select the places you would like to visit below."}
          places={pickedPlaces}
          onSelectPlace={handleStartRemovePlace}
        />
        <Places
          title="Available Places"
          places={availablePlaces}
          fallbackText="Sorting places by distance..."
          onSelectPlace={handleSelectPlace}
        />
      </main>
    </>
  );
}

export default App;
