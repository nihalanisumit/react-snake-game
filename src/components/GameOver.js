import React from "react";
import Styles from "../Styles";

const GameOver = props => {
  let ui = (
    <div>
      <h2> Game over, {props.name}</h2>
      <h3> You scored: {props.score || 0}</h3>
      <h3> your highest score: {props.highestScore || 0}</h3>
      <button
        onClick={props.clicked}
        style={{
          alignSelf: "center",
          width: "100%",
          transition: "all 0.3 ease",
          textTransform: "uppercase",
          outline: 0
          // background: "#4caf50"
        }}
      >
        {" "}
        Play again
      </button>
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
