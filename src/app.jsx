import React from "react"
import Die from "./components/Die"
import Timer from "./components/Timer"
import {nanoid} from "nanoid"
import Confetti from "react-confetti"

export function App() {

  // State that holds values/informations of Dice
  const [valuesDice, setValueDice] = React.useState(allNewDice())

  // State that represents whether user won yet
  const [tenzies = false, setTenzies] = React.useState()

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

  // State Roll-count
  const [rolls, setRolls] = React.useState(1)


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
        setRolls(rolls + 1)
      } else {
          setTenzies(false)
          setValueDice(allNewDice)
          setRolls(1)
      }
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


  // Handle Hold Dice
  function holdDice(id) {
    // Flip .isHeld on the object that was clicked based on id
    setValueDice(oldDice => oldDice.map(die => {
        return die.id === id ?
            {...die, isHeld: !die.isHeld} :
            die
    }))
  }




  return (
    <>
      {tenzies && <Confetti />}
      <div className="wrapper">
        <main>
          <h1 className="title">Tenzies</h1>
          <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
          <div className="track">
            <div className="roll-count">Roll {rolls}</div>
            <div className="time"><Timer isWon = {tenzies} /></div>
          </div>
          <div className="dice-container">
            {valueDice}
          </div>
          <button type="button" className="btn" onClick={rollDice}>{tenzies ? "New Game" : "Roll"}</button>
        </main>
      </div>
    </>
  )
}
