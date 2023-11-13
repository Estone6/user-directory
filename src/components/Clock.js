import React, { useState, useEffect } from "react";
import { getCurrentTime } from "../services/api";
import { formatDateTime } from "../utils/formatDate";
import "../styles/clock.styles.css";

const Clock = ({ selectedCountry = "UTC" }) => {
  const [currentTime, setCurrentTime] = useState("");
  const [pausedTime, setPausedTime] = useState(null);
  const [isPaused, setIsPaused] = useState(false);
  const [pauseDuration, setPauseDuration] = useState(0);

  useEffect(() => {
    const fetchTime = () => {
      getCurrentTime(selectedCountry || "UTC")
        .then((data) => {
          if (!isPaused) {
            const nextTime = new Date(
              new Date(data.utc_datetime).getTime() - pauseDuration
            );
            setCurrentTime(nextTime);
          }
        })
        .catch((error) => console.error("Error fetching current time:", error));
    };

    fetchTime();

    const interval = setInterval(() => {
      if (!isPaused) {
        fetchTime();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [selectedCountry, isPaused, pausedTime, pauseDuration]);

  const handlePause = () => {
    const pause = new Date();
    setPausedTime(pause);
    setIsPaused(true);
  };

  const handleResume = () => {
    const newTime = new Date();
    const duration = newTime - pausedTime;
    setPauseDuration((pauseDuration) => pauseDuration + duration);
    setPausedTime(null);
    setIsPaused(false);
  };

  return (
    <div className="clock-container">
      <div className="clock-display">
        <p>{formatDateTime(selectedCountry || "UTC", currentTime)}</p>
      </div>
      <div className="clock-buttons">
        {isPaused ? (
          <button onClick={handleResume}>Pause / Start</button>
        ) : (
          <button onClick={handlePause}>Pause / Start</button>
        )}
      </div>
    </div>
  );
};

export default Clock;
