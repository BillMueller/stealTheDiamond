class TurningRoofCamera {
  constructor(data) {
    this.loadData(data)
    this.currentAngle = 0
  }

  loadData(data) {
    this.xpos = data[0][0] * size * 4 + guiBorder + size * 2
    this.ypos = data[0][1] * size * 4 + guiBorder + size * 2
    this.direction = data[1][0] == 0
    this.speed = data[1][1] / 5
  }

  update() {
    //---
  }

  move() {
    this.currentAngle = (this.currentAngle + 360) % 360
    if (this.direction == CLOCKWISE) {
      this.currentAngle += this.speed
    } else {
      this.currentAngle -= this.speed
    }
  }

  draw() {
    translate(this.xpos, this.ypos)
    rotate(radians(this.currentAngle))
    if (difficulty != HARD) {
      this.drawVisionArea()
    }
    stroke(0)
    strokeWeight(size*0.75)
    point(0,0,0)
    noStroke()
    fill(0)
    triangle(size*0.9,0,0,size/4,0,-size/4)
    resetMatrix()
  }

  testCollisionWithPlayer() {
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
  }

  drawVisionArea() {
    noStroke()
    fill(0, 0, 255, 150)
    arc(0, 0, 90, 90, radians(-50), radians(50))
  }
}