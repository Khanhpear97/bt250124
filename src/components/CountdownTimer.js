import React, { useState, useEffect } from 'react';

const CountdownTimer = () => {
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [showCompleteMessage, setShowCompleteMessage] = useState(false);

    useEffect(() => {
        let interval;

        if (isRunning) {
            interval = setInterval(() => {
                if (hours === 0 && minutes === 0 && seconds === 0) {
                    clearInterval(interval);
                    setIsRunning(false);
                    setShowCompleteMessage(true);
                } else {
                    if (seconds === 0) {
                        if (minutes === 0) {
                            setHours((prevHours) => prevHours - 1);
                            setMinutes(59);
                        } else {
                            setMinutes((prevMinutes) => prevMinutes - 1);
                        }
                        setSeconds(59);
                    } else {
                        setSeconds((prevSeconds) => prevSeconds - 1);
                    }
                }
            }, 1000);
        }

        return () => clearInterval(interval);
    }, [isRunning, hours, minutes, seconds]);

    const handleStart = () => {
        setIsRunning(true);
        setShowCompleteMessage(false);


        setHours((prevHours) => (prevHours === '' ? 0 : prevHours));
        setMinutes((prevMinutes) => (prevMinutes === '' ? 0 : prevMinutes));
        setSeconds((prevSeconds) => (prevSeconds === '' ? 0 : prevSeconds));
    };

    const handlePause = () => {
        setIsRunning(false);
    };

    const handleReset = () => {
        setHours(0);
        setMinutes(0);
        setSeconds(0);
        setIsRunning(false);
        setShowCompleteMessage(false);
    };

    return (
        <div className="text-center mt-5">
            <h1>Countdown Timer</h1>
            <div>
                <label>Hours: </label>
                <input type="number" value={hours} onChange={(e) => setHours(e.target.value)} />
            </div>
            <div>
                <label>Minutes: </label>
                <input type="number" value={minutes} onChange={(e) => setMinutes(e.target.value)} />
            </div>
            <div>
                <label>Seconds: </label>
                <input type="number" value={seconds} onChange={(e) => setSeconds(e.target.value)} />
            </div>
            <p className="display-4">
                {String(hours).padStart(2, '0')} : {String(minutes).padStart(2, '0')} : {String(seconds).padStart(2, '0')}
            </p>
            {showCompleteMessage && <p>Countdown Complete!</p>}
            <button onClick={handleStart}>Start</button>
            <button onClick={handlePause}>Pause</button>
            <button onClick={handleReset}>Reset</button>
        </div>
    );
};

export default CountdownTimer;
