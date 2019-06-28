import React from "react";
import Styles from "../Styles";

const Snake = props => {
  return (
    <div>
      {props.snakeBody.map((dot, i) => {
        return (
          <div
            key={i}
            style={{
              ...Styles.snakeStyle,
              left: `${dot[0]}%`,
              top: `${dot[1]}%`
            }}
          />
        );
      })}
    </div>
  );
};

export default Snake;
