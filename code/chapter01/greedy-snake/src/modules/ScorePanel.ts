class ScorePanel {
  score: number = 0;
  level: number = 1;
  maxLevel: number;
  upScore: number;

  //获取score跟level的Element对象
  scoreEle: HTMLElement;
  levelEle: HTMLElement;

  constructor(maxLevel = 10, upScore = 10) {
    this.maxLevel = maxLevel;
    this.upScore = upScore;
    this.scoreEle = document.getElementById("score")!;
    this.levelEle = document.getElementById("level")!;
  }

  //得分
  addScore() {
    this.scoreEle.innerText = ++this.score + "";
    //让其等级提升
    if (this.score % this.upScore === 0) {
      this.upLevel();
    }
  }
  //等级
  upLevel() {
    if (this.level < this.maxLevel) {
      this.levelEle.innerText = ++this.level + "";
    }
  }
}

export default ScorePanel;
