export default function ProgressBar({ timer }) {
  const [remainingTime, setRemainingTime] = useState(TIMER);

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime((prevTime) => prevTime - 10);
    }, 10);

    return () => {
      clearInterval(interval);
    };
  }, []); // no deps, so setInterval only runs once

  return <progress value={remainingTime} max={TIMER} />;
}
