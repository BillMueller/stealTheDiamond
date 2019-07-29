class PowerSwitch {
  constructor(data) {
    this.loadData(data)
    this.keyDownLastFrame = false
  }

  loadData(data) {
    this.xpos = data[0][0] * size * 4 + guiBorder + size * 2
    this.ypos = data[0][1] * size * 4 + guiBorder + size * 2
    this.facing = data[0][2] * 10
  }

  update() {
    if (keyIsDown(69) && this.playerIsInRange()) { // e key
      if (!this.keyDownLastFrame) {
        this.keyDownLastFrame = true
        power = !power
      }
    } else {
      this.keyDownLastFrame = false
    }
  }

  move() {
    // doesn't move
  }

  playerIsInRange() {
    let playerPosition = player.getPosition()
    return Math.abs(playerPosition[0] - this.xpos) < 20 && Math.abs(playerPosition[1] - this.ypos) < 20
  }

  draw() {
    noStroke()
    translate(this.xpos, this.ypos)
    rotate(radians(this.facing * 9))
    fill(0)
    if (power) {
      rect(-size, -size / 2, size / 2, size)
    } else {
      rect(-size * 1.25, -size / 2, size * .5, size)
    }
    fill(50, 50, 50)
    rect(-size * 3, -size * 1.5, size * 2, size * 3)
    if (power) {
      fill(26, 230, 26)
    } else {
      fill(0, 60, 0)
    }
    circle(-size * 2, size * .75, size * .5, size * .5)
    if (!power) {
      fill(230, 26, 26)
    } else {
      fill(60, 0, 0)
    }
    circle(-size * 2, -size * .75, size * .5, size * .5)
    resetMatrix()
  }
}
