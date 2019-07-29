class MovementSensor {
  constructor(data) {
    this.loadData(data)
  }

  loadData(data) {
    this.xpos = data[0][0] * size * 4 + guiBorder + size * 2
    this.ypos = data[0][1] * size * 4 + guiBorder + size * 2
    this.facing = (data[0][2] % 2) * 10
  }

  update() {
    // needs no update
  }

  move() {
    // doesn't move
  }

  activate() {
    power = true
  }

  deactivate() {
    power = false
  }

  draw() {
    if (power && difficulty == EASY) {
      this.drawVisionArea()
    }
    noStroke()
    fill(0)
    translate(this.xpos, this.ypos)
    rotate(radians(this.facing * 9) + HALF_PI)
    rect(size / 5, size * 2, -size / 2.5, -size / 2.5)
    rotate(PI)
    rect(size / 5, size * 2, -size / 2.5, -size / 2.5)
    resetMatrix()
  }

  testCollisionWithPlayer() {
    if (!power) {
      return false
    } else {
      let playerPosition = player.getPosition()
      if (this.facing == DOWN) {
        if (Math.abs(this.xpos - playerPosition[0]) < size / 5 && Math.abs(this.ypos - playerPosition[1]) < size * 1.6) {
          return true
        }
      } else if (this.facing == RIGHT) {
        if (Math.abs(this.ypos - playerPosition[1]) < size / 5 && Math.abs(this.xpos - playerPosition[2]) < size * 1.6) {
          return true
        }
      }
    }
    return false
  }

  drawVisionArea() {
    noStroke()
    fill(0, 0, 255, 150)
    translate(this.xpos, this.ypos)
    rotate(radians(this.facing * 9)+HALF_PI)
    rect(size / 5, size * 1.6, -size/2.5, -size * 3.2)
    resetMatrix()
  }
}
