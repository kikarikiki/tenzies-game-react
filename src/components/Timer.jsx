import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStopwatch } from "@fortawesome/free-solid-svg-icons";

export default function Timer(props) {

  const [seconds, setSeconds] = React.useState(0);
  const [minutes, setMinutes] = React.useState(0);
  const formatTime = time => (time < 10 ? `0${time}` : time)

  React.useEffect(() => {
    let interval = null

    // Run times as long tenizies is not won
    if (!props.isWon) {
      interval = setInterval(() => {
        // Increment seconds
        setSeconds(prevSeconds => (prevSeconds === 59 ? 0 : prevSeconds + 1));

        // Increment minutes when seconds reach 59
        if (seconds === 59) {
          setMinutes(prevMinutes => prevMinutes + 1);
        }
      }, 1000);

      // Cleanup interval on component unmount
    } else if (props.isWon && (minutes !== 0 && seconds !== 0)) {
      clearInterval(interval)
    }
    return () => clearInterval(interval)
  }, [props.isWon, minutes, seconds]); // Re-run effect whenever seconds change


  return (
    <>
      <ul className="track-item timer">
        <li><i><FontAwesomeIcon icon={faStopwatch} /></i></li>
        <li>{minutes}</li>
        <li>:</li>
        <li>{formatTime(seconds)}</li>
      </ul>
    </>
  )
}
