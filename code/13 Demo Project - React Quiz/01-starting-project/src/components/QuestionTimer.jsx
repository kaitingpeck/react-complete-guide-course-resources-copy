import { useEffect } from "react";
import { useState } from "react";

export default function QuestionTimer({ timeout, onTimeout }) {
  const [remainingTime, setRemainingTime] = useState(timeout);

  console.log("Re-rendering Question timer"); // every time remainingTime changed, this is called. Because QuestionTimer never gets unmounted, the interval is never cleared so this just goes on, until interval is cleared (see below)

  useEffect(() => {
    console.log("SET TIMEOUT"); // every time app re-renders (userAnswers changed due to onTimeout), this is not called again, because onTimeout is now memoized
    const timeoutObj = setTimeout(onTimeout, timeout);

    return () => {
      clearTimeout(timeoutObj);
    };
  }, [timeout, onTimeout]); // add props as deps

  useEffect(() => {
    console.log("SET INTERVAL");
    const interval = setInterval(() => {
      setRemainingTime((prevRemainingTime) => prevRemainingTime - 100);
    }, 100);

    // when component unmounts (in strict mode, the re-render does result in the first render being unmounted)
    // however the next render never gets unmounted, because we don't recreate QuestionTimer in Quiz.jsx
    return () => {
      console.log("Clearing interval");
      clearInterval(interval);
    };
  }, []);

  return <progress id="question-time" max={timeout} value={remainingTime} />;
}
