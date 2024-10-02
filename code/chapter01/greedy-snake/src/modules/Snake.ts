class Snake {
  //表示蛇的Element
  element: HTMLElement;
  //表示蛇头的Element
  head: HTMLElement;
  //表示蛇身体的Element(包含蛇头)
  bodies: HTMLCollection;
  constructor() {
    this.element = document.getElementById("snake")!;
    this.head = document.querySelector("#snake>div") as HTMLElement;
    this.bodies = this.element.getElementsByTagName("div")!;
    this.head.style.backgroundColor = "yellow";
  }
  //获取蛇头的x坐标
  get xPosition() {
    return this.head.offsetLeft;
  }
  //获取蛇头的y坐标
  get yPosition() {
    return this.head.offsetTop;
  }

  set xPosition(value: number) {
    //如果位置相同则不做变化
    if (value === this.xPosition) {
      return;
    }
    //设置移动边界
    if (value < 0 || value > 290) {
      throw new Error("蛇已经越界！！");
    }
    //禁止反向移动
    if (
      this.bodies[1] &&
      (this.bodies[1] as HTMLElement).offsetLeft === value
    ) {
      if (value < this.head.offsetLeft) {
        value = this.head.offsetLeft + 10;
      } else {
        value = this.head.offsetLeft - 10;
      }
    }
    //蛇移动身体
    this.moveBody();
    this.head.style.left = value + "px";
    //确认是否撞到自己
    this.checkHeadBody();
  }
  set yPosition(value: number) {
    //如果位置相同则不做变化
    if (value === this.yPosition) {
      return;
    }
    //设置移动边界
    if (value < 0 || value > 290) {
      throw new Error("蛇已经越界！！");
    }
    //禁止反向移动
    if (this.bodies[1] && (this.bodies[1] as HTMLElement).offsetTop === value) {
      if (value < this.head.offsetTop) {
        value = this.head.offsetTop + 10;
      } else {
        value = this.head.offsetTop - 10;
      }
    }
    //蛇移动身体
    this.moveBody();
    this.head.style.top = value + "px";
    //确认是否撞到自己
    this.checkHeadBody();
  }

  //增加蛇的身体
  addBody() {
    this.element.insertAdjacentHTML("beforeend", "<div></div>");
  }
  //移动蛇的身体
  moveBody() {
    if (this.bodies.length > 1) {
      for (let index = this.bodies.length - 1; index > 0; index--) {
        let xPosition = (this.bodies[index - 1] as HTMLElement).offsetLeft;
        let yPosition = (this.bodies[index - 1] as HTMLElement).offsetTop;
        (this.bodies[index] as HTMLElement).style.left = xPosition + "px";
        (this.bodies[index] as HTMLElement).style.top = yPosition + "px";
      }
    }
  }

  checkHeadBody() {
    for (let index = 4; index < this.bodies.length; index++) {
      let body = this.bodies[index] as HTMLElement;
      if (
        this.head.offsetTop == body.offsetTop &&
        this.head.offsetLeft == body.offsetLeft
      ) {
        throw new Error("已经撞到身体了！！");
      }
    }
  }
}
export default Snake;
