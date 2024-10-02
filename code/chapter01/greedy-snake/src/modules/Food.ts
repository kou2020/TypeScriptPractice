class Food {
  //获取元素
  element: HTMLElement;
  constructor() {
    this.element = document.getElementById("food")!;
  }
  get xPosition() {
    return this.element.offsetLeft;
  }
  get yPosition() {
    return this.element.offsetTop;
  }
  changePositon(): void {
    //生成随机范围内的坐标(304-4-10 所以范围为0-290)
    let x = Math.round(Math.random() * 29) * 10;
    let y = Math.round(Math.random() * 29) * 10;

    //重新设置食物位置
    this.element.style.left = x + "px";
    this.element.style.top = y + "px";
  }
}

export default Food;
