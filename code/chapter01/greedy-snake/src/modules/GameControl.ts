import Food from "./Food";
import ScorePanel from "./ScorePanel";
import Snake from "./Snake";
class GameControl {
  food: Food;
  scorePanel: ScorePanel;
  snake: Snake;
  direction: string = "Right";
  //判断游戏是否存活
  isLive = true;
  constructor() {
    this.food = new Food();
    this.scorePanel = new ScorePanel(10, 1);
    this.snake = new Snake();
    this.init();
  }
  init() {
    document.addEventListener("keydown", this.keydownHandler.bind(this));
    this.moveDirection();
  }
  keydownHandler(event: KeyboardEvent) {
    this.direction = event.key;
  }
  //贪吃蛇移动位置

  /*
        Chrome       IE
        ArrowUp      Up
        ArrowDown    Down
        ArrowLeft    Left
        ArrowRight   Right
    */
  moveDirection() {
    let xPosition = this.snake.xPosition;
    let yPosition = this.snake.yPosition;
    switch (this.direction) {
      case "ArrowUp":
      case "Up":
        yPosition -= 10;
        break;
      case "ArrowDown":
      case "Down":
        yPosition += 10;
        break;
      case "ArrowLeft":
      case "Left":
        xPosition -= 10;
        break;
      case "ArrowRight":
      case "Right":
        xPosition += 10;
        break;
    }
    //判断蛇是否吃到食物
    this.checkEat(xPosition, yPosition);

    try {
      this.snake.xPosition = xPosition;
      this.snake.yPosition = yPosition;
    } catch (error) {
      const err = error as Error;
      alert(err.message + "Game Over");
      this.isLive = false;
    }
    this.isLive &&
      setTimeout(
        this.moveDirection.bind(this),
        300 - (this.scorePanel.level - 1) * 40
      );
  }

  checkEat(xPosition: Number, yPosition: Number) {
    if (xPosition == this.food.xPosition && yPosition == this.food.yPosition) {
      console.log("蛇吃到食物了");
      //增加积分
      this.scorePanel.addScore();
      //重置食物的位置
      this.food.changePositon();
      //蛇的身体增加
      this.snake.addBody();
    }
  }
}
export default GameControl;
