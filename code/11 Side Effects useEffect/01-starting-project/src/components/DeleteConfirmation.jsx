import { useEffect, useState } from "react";

const TIMER = 3000;

export default function DeleteConfirmation({ onConfirm, onCancel }) {
  const [remainingTime, setRemainingTime] = useState(TIMER);

  // creates infinite loop, because the state change for remainingTime triggers a re-render, and setInterval is run again, so that many setIntervals are running
  // simultaneously; each setInterval reduces remaining time every 10ms
  // setInterval(() => {
  // setRemainingTime((prevTime) => prevTime - 10);
  // }, 10);

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime((prevTime) => prevTime - 10);
    }, 10);

    return () => {
      clearInterval(interval);
    };
  }, []); // no deps, so setInterval only runs once

  useEffect(() => {
    console.log("TIMER SET");
    const timer = setTimeout(() => {
      onConfirm();
    }, TIMER);

    // return a clean up function that will be executed by React right before the effect function runs again,
    // or right before the component dismounts (removed from DOM)
    // clean up function would also run if the useEffect function is run again, and before the effect function runs
    // however if we have no dependencies here, so the effect function wouldn't run again
    return () => {
      clearTimeout(timer);
    };
  }, [onConfirm]);

  // if put here, runs even if component isn't rendered or visible anymore
  // setTimeout(() => {
  // onConfirm();
  // }, 3000);

  return (
    <div id="delete-confirmation">
      <h2>Are you sure?</h2>
      <p>Do you really want to remove this place?</p>
      <div id="confirmation-actions">
        <button onClick={onCancel} className="button-text">
          No
        </button>
        <button onClick={onConfirm} className="button">
          Yes
        </button>
      </div>
      <progress value={remainingTime} max={TIMER} />
    </div>
  );
}
