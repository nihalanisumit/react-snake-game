import React from "react";
import Styles from "../Styles";

const Rat = props => {
  return (
    <div
      style={{
        ...Styles.ratStyle,
        left: `${props.dot[0]}%`,
        top: `${props.dot[1]}%`
      }}
    />
  );
};

export default Rat;
