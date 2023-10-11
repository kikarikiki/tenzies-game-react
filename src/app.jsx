import React from "react"
import Die from "./components/Die"
import {nanoid} from "nanoid"
import Confetti from "react-confetti"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDice } from "@fortawesome/free-solid-svg-icons";
import { faStopwatch } from "@fortawesome/free-solid-svg-icons";

export function App() {

  // State that holds values/informations of Dice
  const [valuesDice, setValueDice] = React.useState(allNewDice())

  // State that represents whether user won yet
  const [tenzies = false, setTenzies] = React.useState()

  // State Timer
  const [timeStarted, setTimeStarted] = React.useState(false)
  const [seconds, setSeconds] = React.useState(0);
  const [minutes, setMinutes] = React.useState(0);

  // State Roll-count
  const [rolls, setRolls] = React.useState(1)
  // Time Format
  const formatTime = time => (time < 10 ? `0${time}` : time)


  // To keep internal States (valuesDice, tenzies) in sync
  React.useEffect(() => {
      // Check dice array for winning conditions
      const allHeld = valuesDice.every(die => die.isHeld)
      const allSameValue = valuesDice.every(die => die.value === valuesDice[0].value)

      if (allHeld && allSameValue) {
        setTenzies(true)
      }

      // Clear up
      return () => setTenzies(false)

  }, [valuesDice])


  // Helper Function
  function generateNewDie() {
    return {
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
        id: nanoid()
    }
  }

  // random Die values
  function allNewDice() {
    const randomNumbers = [];
    for (let i = 0; i < 10; i++) {
        // in order for each Dice to contain information if its being held turn into object
        randomNumbers.push(generateNewDie())
      }
      return randomNumbers
    }

    // Handle Roll Dice
    function rollDice() {
      if(!tenzies) {
        setValueDice(oldDice => oldDice.map(die => {
          return die.isHeld ?
              die :
              generateNewDie()
        }))

        // Incrementing roll-round
        setRolls(rolls => rolls + 1)

      } else {
        setRolls(0)
        setSeconds(0)
        setMinutes(0)
        setTenzies(false)
        setValueDice(allNewDice)
      }
    }


  // Timer
  React.useEffect(() => {
    let interval = null

    // Run times as long tenizies is not won
    if (!tenzies) {
      interval = setInterval(() => {
        // Increment seconds
        setSeconds(prevSeconds => (prevSeconds === 59 ? 0 : prevSeconds + 1));

        // Increment minutes when seconds reach 59
        if (seconds === 59) {
          setMinutes(prevMinutes => prevMinutes + 1);
        }
      }, 1000);

      // Cleanup interval on component unmount
    } else if (tenzies && (minutes !== 0 && seconds !== 0)) {
      clearInterval(interval)
    }
    return () => clearInterval(interval)
  }, [tenzies, minutes, seconds]); // Re-run effect whenever seconds change


  // Handle Hold Dice
  function holdDice(id) {
    // Flip .isHeld on the object that was clicked based on id
    setValueDice(oldDice => oldDice.map(die => {
        return die.id === id ?
            {...die, isHeld: !die.isHeld} :
            die
    }))
  }

  // generate Die elements + their value & render to screen
  const valueDice = valuesDice.map(num => (
    <Die
      value = {num.value}
      key = {num.id}
      isHeld = {num.isHeld}
      holdDice={() => holdDice(num.id)}
    />
  ))


  return (
    <>
      {tenzies && <Confetti />}
      <main>
        <h1 className="title">Tenzies</h1>
        <p className="instructions">Roll until all dice are the same.<br/>
        Click each die to freeze it at its current value between rolls.</p>
        <div className="track">
          <div className="time">
          <ul className="track-item timer">
            <li><i><FontAwesomeIcon icon={faStopwatch} /></i></li>
            <li>{minutes}</li>
            <li>:</li>
            <li>{formatTime(seconds)}</li>
          </ul>
          </div>
          <ul className="track-item">
            <li>{rolls}</li>
            <li style={{margin: "0 0 0 5px"}}><i><FontAwesomeIcon icon={faDice} /></i></li>
          </ul>
        </div>
        <div className="dice-container">
          {valueDice}
        </div>
        <button type="button" className="btn" onClick={rollDice}>{tenzies ? "New Game" : "Roll"}</button>
      </main>
    </>
  )
}
