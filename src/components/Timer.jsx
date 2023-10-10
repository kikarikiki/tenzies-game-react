import React from "react"

export default function Timer(props) {

  const [seconds, setSeconds] = React.useState(0);
  const [minutes, setMinutes] = React.useState(0);
  const formatTime = time => (time < 10 ? `0${time}` : time)

  const timer = React.useEffect(() => {
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
  }, [seconds]); // Re-run effect whenever seconds change

  return (
    <>
      <div>{minutes}:{formatTime(seconds)}</div>
    </>
  )
}
