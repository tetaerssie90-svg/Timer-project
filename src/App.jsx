import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [seconds, setSeconds] = useState("");
  const [timeLeft, setTimeLeft] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (!isRunning || timeLeft <= 0) {
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [isRunning, timeLeft]);

  useEffect(() => {
    if (timeLeft === 0 && isRunning) {
      setIsRunning(false);
    }
  }, [timeLeft, isRunning]);

  function handleStart() {
    const enteredSeconds = Number(seconds);

    if (enteredSeconds <= 0 || isNaN(enteredSeconds)) {
      return;
    }

    if (timeLeft === 0) {
      setTimeLeft(enteredSeconds);
    }

    setIsRunning(true);
  }

  function handlePause() {
    setIsRunning(false);
  }

  function handleReset() {
    setIsRunning(false);
    setTimeLeft(0);
    setSeconds("");
  }

  return (
    <div className="timer-container">
      <h1>Countdown Timer</h1>

      <input
        type="number"
        placeholder="Enter seconds"
        value={seconds}
        onChange={(e) => setSeconds(e.target.value)}
      />

      <div className="time-display">
        {timeLeft > 0 ? `${timeLeft}s` : "Time's up!"}
      </div>

      <div className="buttons">
        <button onClick={handleStart}>Start Timer</button>
        <button onClick={handlePause}>Pause</button>
        <button onClick={handleReset}>Reset</button>
      </div>
    </div>
  );
}

export default App;