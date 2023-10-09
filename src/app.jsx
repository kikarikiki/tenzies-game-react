import React from "react"
import Die from "./components/Die"
import {nanoid} from "nanoid"

export function App() {

  // State that holds values/informations of Dice
  const [valuesDice, setValueDice] = React.useState(allNewDice())

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
      setValueDice(oldDice => oldDice.map(die => {
        return die.isHeld ?
            die :
            generateNewDie()
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
      <div className="wrapper">
        <main>
          <h1 className="title">Tenzies</h1>
          <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
          <div className="dice-container">
            {valueDice }
          </div>
          <button type="button" className="btn" onClick={rollDice}>Roll</button>
        </main>
      </div>
    </>
  )
}
