import * as PIXI from 'pixi.js'

export default class GameScreen {
  constructor(renderer, viewPort, stage, player, model) {
    this.renderer = renderer
    this.viewPort = viewPort
    this.stage = stage
    this.player = player
    this.model = model
  }

  render() {
    const b = new PIXI.Graphics()
    b.lineStyle(4, '0x2a9c9d', 1)
    b.drawRect(2, 2, this.viewPort.width - 4, this.viewPort.height - 4)
    this.stage.addChild(b)

    const name = `${this.player.firstName} ${this.player.lastName}`
    const lesson = `Урок ${this.player.lesson + 1}`
    const task = `Задание ${this.task + 1}`
    this.printText(this.stage, name, this.viewPort.width / 40, 10, 10)
    this.printText(this.stage, lesson, this.viewPort.width / 60, 10, 60)
    this.printText(this.stage, task, this.viewPort.width / 60, 10, 110)

    this.printRect(10, 80, 30, '0x2a9c9d', 30, this.viewPort.width / 4)
    this.printRect(15, 87.5, 15, '0x2affff', 15, 10)
    this.printRect(10, 130, 30, '0x2a9c9d', 30, this.viewPort.width / 4)
    this.printRect(15, 137.5, 15, '0x2affff', 15, this.viewPort.width / 4 - 10)
  }

  printText(stage, text, fontSize, x, y) {
    const textStyle = new PIXI.TextStyle({
      fontFamily: 'Arial',
      fontSize,
      fill: '0x2a9c9d',
      align: 'center',
    })
    const score = new PIXI.Text(text, textStyle)
    // const textMetrics = PIXI.TextMetrics.measureText(text, textStyle)
    score.x = x
    score.y = y

    stage.addChild(score)
  }

  printRect(x, y, size, color, rad, length) {
    const rect = new PIXI.Graphics()
    rect.beginFill(color, 0.5)
    rect.drawRoundedRect(x, y, length, size, rad)
    this.stage.addChild(rect)
  }
}
