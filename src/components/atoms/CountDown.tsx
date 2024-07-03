import React, { useState, useEffect, useRef } from 'react'

type Props = {
    initialSeconds: any, 
    timerStatus: any, 
    text?: any,
    style: string,
}

const CountdownTimer = ({initialSeconds, timerStatus, text, style}: Props) => {
    const [seconds, setSeconds] = useState(initialSeconds);
    const finished = useRef(false);

    useEffect(() => {
        // Exit early if countdown is finished
        if (seconds <= 0) {
            return;
        }

        // Set up the timer
        const timer = setInterval(() => {
            setSeconds(prevSeconds => prevSeconds - 1)
        }, 1000);
        
        // Clean up the timer
        return () => clearInterval(timer);
    }, [seconds]);

    // Format the remaining time (e.g., “00:05:10” for 5 minutes and 10 seconds)
    const formatTime = (timeInSeconds) => {
        const minutes = Math.floor(timeInSeconds / 60)
        .toString()
        .padStart(2, '0');

        const seconds = (timeInSeconds % 60).toString().padStart(2, '0');

        if(parseInt(minutes) === 0 && parseInt(seconds) === 0){
            finished.current = true
        }

        timerStatus(finished.current);

        return `${minutes}:${seconds}`;
    };

    return <span className={`${finished.current ? 'hidden' : 'block'} ${style}`}>{text !== '' && text} {formatTime(seconds)}</span>
};

export default CountdownTimer;