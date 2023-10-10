import React from "react"

export default function Die(props) {

  return (

      <div className={props.isHeld === true ? "die-container is-held" : "die-container"} onClick={props.holdDice}>

        <div className={props.value !== 1 ? "die-hidden" : "die-face num-1"}>
          <div className="dot center middle"></div>
        </div>

        <div className={props.value !== 2 ? "die-hidden" : "die-face num-2"}>
          <div className="dot left top"></div>
          <div className="dot right bottom"></div>
        </div>

        <div className={props.value !== 3 ? "die-hidden" : "die-face num-3"}>
          <div className="dot left top"></div>
          <div className="dot center middle"></div>
          <div className="dot right bottom"></div>
        </div>

        <div className={props.value !== 4 ? "die-hidden" : "die-face num-4"}>
          <div className="dot left top"></div>
          <div className="dot right top"></div>
          <div className="dot left bottom"></div>
          <div className="dot right bottom"></div>
        </div>

        <div className={props.value !== 5 ? "die-hidden" : "die-face num-5"}>
          <div className="dot left top"></div>
          <div className="dot right top"></div>
          <div className="dot center middle"></div>
          <div className="dot left bottom"></div>
          <div className="dot right bottom"></div>
        </div>

        <div className={props.value !== 6 ? "die-hidden" : "die-face num-6"}>
          <div className="dot left top"></div>
          <div className="dot right top"></div>
          <div className="dot left middle"></div>
          <div className="dot right middle"></div>
          <div className="dot left bottom"></div>
          <div className="dot right bottom"></div>
        </div>
      </div>
  )
}
