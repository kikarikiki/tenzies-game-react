import React from "react"
import Die from "./components/Die"

export function App() {

  return (
    <>
      <div className="wrapper">
        <main>
          <div className="dice-container">
            <Die value="1" />
            <Die value="1" />
            <Die value="1" />
            <Die value="1" />
            <Die value="1" />
            <Die value="1" />
            <Die value="1" />
            <Die value="1" />
            <Die value="1" />
            <Die value="1" />
          </div>
        </main>
      </div>
    </>
  )
}
