import React, { Fragment, Component } from "react";

import Snake from "./Snake";
import Food from "./Rat";
import Styles from "../Styles";
import Backdrop from "./Backdrop/Backdrop";
import GameOver from "./GameOver";

//function to get the random position for rat
const getRandomPosition = () => {
  let min = 1;
  let max = 98;
  let x = Math.floor((Math.random() * (max - min + 1) + min) / 4) * 4;
  let y = Math.floor((Math.random() * (max - min + 1) + min) / 4) * 4;
  let position = [x, y];
  return position;
};

const initialState = {
  rat: getRandomPosition(),
  gameSpeed: 200,
  snakeBody: [[0, 0], [4, 0]],
  direction: "RIGHT",
  showBackdrop: null,
  isGamePaused: false
};

let interval;
// let isGamePaused = false;

class SnakeGame extends Component {
  state = initialState;

  componentDidMount() {
    interval = setInterval(this.moveSnake, this.state.gameSpeed);
    document.onkeydown = this.onKeyPressed;
  }

  componentDidUpdate() {
    this.checkIfOutOfBorders();
    this.checkIfCollapsed();
    this.checkIfEat();
  }

  onKeyPressed = e => {
    e = e || window.event;
    switch (e.keyCode) {
      case 38:
        if (this.state.isGamePaused) {
          return;
        }
        if (this.state.direction !== "DOWN") {
          this.setState({ direction: "UP" });
        }
        break;
      case 40:
        if (this.state.isGamePaused) {
          return;
        }
        if (this.state.direction !== "UP") {
          this.setState({ direction: "DOWN" });
        }
        break;
      case 37:
        if (this.state.isGamePaused) {
          return;
        }
        if (this.state.direction !== "RIGHT") {
          this.setState({ direction: "LEFT" });
        }
        break;
      case 39:
        if (this.state.isGamePaused) {
          return;
        }
        if (
          this.state.direction !== "LEFT" ||
          this.state.direction !== "RIGHT"
        ) {
          this.setState({ direction: "RIGHT" });
        }
        break;
      case 32:
        console.log("space bar button is pressed");
        this.toggleGamePlay();
        break;
      default:
    }
  };

  toggleGamePlay = () => {
    this.setState({ isGamePaused: !this.state.isGamePaused });
    if (this.state.isGamePaused) {
      clearInterval(interval);
      //   this.setState({ showBackdrop: true });
    } else {
      interval = setInterval(this.moveSnake, this.state.gameSpeed);
      //   this.setState({ showBackdrop: false });
    }
  };

  moveSnake = () => {
    if (this.state.showBackdrop) {
      return;
    }
    let body = [...this.state.snakeBody];
    let head = body[body.length - 1];

    switch (this.state.direction) {
      case "RIGHT":
        head = [head[0] + 4, head[1]];
        break;
      case "LEFT":
        head = [head[0] - 4, head[1]];
        break;
      case "DOWN":
        head = [head[0], head[1] + 4];
        break;
      case "UP":
        head = [head[0], head[1] - 4];
        break;
      default:
        head = body[body.length - 1];
    }
    body.push(head);
    body.shift();
    this.setState({
      snakeBody: body
    });
  };

  checkIfOutOfBorders() {
    if (this.state.showBackdrop) {
      return;
    }
    let head = this.state.snakeBody[this.state.snakeBody.length - 1];
    if (head[0] >= 100 || head[1] >= 100 || head[0] < 0 || head[1] < 0) {
      this.onGameOver();
    }
  }

  checkIfCollapsed() {
    if (this.state.showBackdrop) {
      return;
    }
    let snake = [...this.state.snakeBody];
    let head = snake[snake.length - 1];
    snake.pop();
    snake.forEach(dot => {
      if (head[0] === dot[0] && head[1] === dot[1]) {
        this.onGameOver();
      }
    });
  }

  checkIfEat() {
    if (this.state.showBackdrop) {
      return;
    }
    let head = this.state.snakeBody[this.state.snakeBody.length - 1];
    let rat = this.state.rat;
    if (head[0] === rat[0] && head[1] === rat[1]) {
      this.setState({
        rat: getRandomPosition()
      });
      this.enlargeSnake();
      this.increaseSpeed();
    }
  }

  enlargeSnake() {
    let newSnake = [...this.state.snakeBody];
    newSnake.unshift([]);
    this.setState({
      snakeBody: newSnake
    });
  }

  increaseSpeed() {
    if (this.state.gameSpeed > 10) {
      this.setState({
        speed: this.state.gameSpeed - 10
      });
    }
  }

  onGameOver() {
    // alert(`Game Over. Snake length is ${this.state.snakeBody.length}`);
    this.setState({ showBackdrop: true });
    // this.setState(initialState);
  }

  onPlayAgainClicked = () => {
    this.setState(initialState);
  };
  render() {
    return (
      <div>
        <Fragment>
          <Backdrop show={this.state.showBackdrop}>
            <GameOver
              score={this.state.snakeBody.length - 2}
              highestScore={this.props.highestScore || 0}
              name={this.props.name || "Player1"}
              clicked={this.onPlayAgainClicked}
              //   resumeGame={this.toggleGamePlay}
              //   isPaused={this.state.isGamePaused}
            />
          </Backdrop>
          <div style={{ flexDirection: "row" }}>
            <div style={Styles.scoreStyle}>
              {" "}
              Score : {this.state.snakeBody.length - 2}
            </div>
            {/* <div style={Styles.scoreStyle}>
              {" "}
              Highest Score : {this.state.snakeBody.length - 2}
            </div> */}
          </div>

          <div style={Styles.frameStyle}>
            <Snake snakeBody={this.state.snakeBody} />
            <Food dot={this.state.rat} />
          </div>
        </Fragment>
      </div>
    );
  }
}

export default SnakeGame;
