import React from "react"

export default function Die(props) {

  return (

      <div className={props.isHeld === true ? "die is-held" : "die"} onClick={props.holdDice}>
        <h5 className="die-num">{props.value}</h5>
      </div>
  )
}
