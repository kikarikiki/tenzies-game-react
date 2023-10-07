import React from "react"
import Die from "./components/Die"

export function App() {

  // random Die values
  function allNewDice() {
    let randomNumbers = [];
    for (let i = 0; i < 10; i++) {
        let randomNumber = Math.ceil(Math.random() * 6)
        randomNumbers.push(randomNumber)
    }
      return randomNumbers
    }

    // State that holds values of Dice
    const [valuesDice, setValueDice] = React.useState(allNewDice)
    // generate Die elements + their value & render to screen
    const valueDice = valuesDice.map(num => <Die value={num} />)

    // Handle Roll Dice
    function rollDice() {
      setValueDice(allNewDice)
    }

  return (
    <>
      <div className="wrapper">
        <main>
          <div className="dice-container">
            {valueDice}
          </div>
          <button type="button" className="btn" onClick={rollDice}>Roll</button>
        </main>
      </div>
    </>
  )
}
