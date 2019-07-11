const Styles = {
  frameStyle: {
    margin: "auto",
    width: "600px",
    height: "600px",
    border: "5px solid #164bb1",
    backgroundColor: "#000",
    position: "relative",
    boxShadow: "0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24)"
  },

  scoreStyle: {
    margin: "auto",
    width: "10%",
    height: "40px",
    borderWidth: "2px 2px 0px 2px",
    borderColor: "#164bb1",
    borderStyle: "solid",
    backgroundColor: "#000",
    color: "#fff",
    fontFamily: "Sans-serif",
    fontSize: "20px",
    // display: "flex",
    // justifyContent: "center",
    // alignItems: "center",
    textShadow: "1px 1px #164bb1"
  },

  snakeStyle: {
    position: "absolute",
    height: "4%",
    backgroundColor: "#fff",
    border: "2px solid #164bb1",
    borderRadius: "20%",
    zIndex: 2,
    width: "4%"
  },

  ratStyle: {
    position: "absolute",
    width: "4%",
    height: "4%",
    background: "red",
    border: "2px solid #fff",
    borderRadius: "50%",
    zIndex: 1
  },
  backdropFrameStyle: {
    margin: "auto",
    width: "300px",
    height: "300px",
    border: "3px solid #164bb1",
    backgroundColor: "#fff",
    position: "fixed",
    top: "0",
    right: "0",
    left: "0",
    bottom: "0",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  }
};

export default Styles;
