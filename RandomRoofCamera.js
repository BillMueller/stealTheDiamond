class RandomRoofCamera {
  constructor(data) {
    this.loadData(data)
    this.currentAngle = 0
    this.turning = 0
    this.waiting = 1
  }

  loadData(data) {
    this.xpos = data[0][0] * size * 4 + guiBorder + size * 2
    this.ypos = data[0][1] * size * 4 + guiBorder + size * 2
    this.speed = data[1] / 5
  }

  update() {}

  move() {
    if (power) {
      if (this.turning == 0) {
        if (this.waiting == 1) {
          while (this.turning > -40 && this.turning < 40) {
            this.turning = Math.floor(random(-200, 200))
          }
        }
        this.waiting--
      } else if (this.waiting == 0) {
        if (this.turning < 0) {
          if (this.turning == -1) {
            this.waiting = Math.floor(random(20, 100))
          }
          this.currentAngle--
          this.turning++
        } else {
          if (this.turning == 1) {
            this.waiting = Math.floor(random(20, 150))
          }
          this.currentAngle++
          this.turning--
        }
      }
    }
  }

  draw() {
    translate(this.xpos, this.ypos)
    rotate(radians(this.currentAngle))
    if (difficulty != HARD && power) {
      this.drawVisionArea()
    }
    stroke(0)
    strokeWeight(size * 0.75)
    point(0, 0, 0)
    noStroke()
    fill(0)
    triangle(size * 0.9, 0, 0, size / 4, 0, -size / 4)
    resetMatrix()
  }

  testCollisionWithPlayer() {
    if (power) {
      let playerPosition = player.getPosition()
      let horizontalDistance = this.xpos - playerPosition[0]
      let verticalDistance = this.ypos - playerPosition[1]
      let distance = Math.sqrt(horizontalDistance ** 2 + verticalDistance ** 2)
      let playerAngle = degrees(Math.atan(verticalDistance / horizontalDistance))
      if (horizontalDistance >= 0) {
        playerAngle += 180
      }
      playerAngle = (playerAngle + 360) % 360
      return distance < size * .5 + 45 && playerAngle < this.currentAngle + 50 && playerAngle > this.currentAngle - 50
    } else {
      return false
    }
  }

  drawVisionArea() {
    noStroke()
    fill(0, 0, 255, 150)
    arc(0, 0, 90, 90, radians(-50), radians(50))
  }
}
