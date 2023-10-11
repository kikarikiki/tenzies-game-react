import React from "react"

export default function Timer(props) {

  const [seconds, setSeconds] = React.useState(0);
  const [minutes, setMinutes] = React.useState(0);
  const formatTime = time => (time < 10 ? `0${time}` : time)

  const timer = React.useEffect(() => {

    // Run times as long tenizies is not won
    if (!props.isWon) {
      const intervalId = setInterval(() => {
        // Increment seconds
        setSeconds(prevSeconds => (prevSeconds === 59 ? 0 : prevSeconds + 1));

        // Increment minutes when seconds reach 59
        if (seconds === 59) {
          setMinutes(prevMinutes => prevMinutes + 1);
        }
      }, 1000);

      // Cleanup interval on component unmount
      return () => clearInterval(intervalId);
    } else {
      return seconds
    }
  }, [props.isWon, seconds]); // Re-run effect whenever seconds change

  return (
    <>
      <ul className="timer">
        <li>{minutes}</li>
        <li>:</li>
        <li>{formatTime(seconds)}</li>
      </ul>
    </>
  )
}
