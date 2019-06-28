import React from "react";
import Styles from "../Styles";

const GameOver = props => {
  return (
    <div style={Styles.backdropFrameStyle}>
      <div>
        <h1> Game over bro!</h1>
        <h2> You scored {props.score || 0}</h2>
        <button onClick={props.clicked}> Play again</button>
      </div>
    </div>
  );
};

export default GameOver;
