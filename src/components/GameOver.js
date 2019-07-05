import React from "react";
import Styles from "../Styles";

const GameOver = props => {
  let ui = (
    <div>
      <h1> Game over bro!</h1>
      <h2> You scored {props.score || 0}</h2>
      <button onClick={props.clicked}> Play again</button>
    </div>
  );
  if (props.isPaused) {
    ui = (
      <div>
        <h1> GAME PAUSED</h1>
        <h2> Tap spacebar or button below to resume</h2>
        <button onClick={props.resumeGame}>Resume </button>
      </div>
    );
  }
  return <div style={Styles.backdropFrameStyle}>{ui}</div>;
};

export default GameOver;
