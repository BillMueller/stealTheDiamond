class SecurityCamera {
  constructor(data) {
    this.loadData(data)
    this.currentAngle = this.minAngle
    this.angleChangingState = INCREASING
  }

  loadData(data) {
    this.xpos = data[0][0] * size * 4 + guiBorder + size * 2
    this.ypos = data[0][1] * size * 4 + guiBorder + size * 2
    this.facing = data[0][2]
    this.minAngle = this.facing*9-data[1][0]
    this.maxAngle = this.facing*9+data[1][0]
    this.speed = data[1][2] / 5
    switch (this.facing) {
      case 0:
        this.xpos -= size * 2
        break
      case 10:
        this.ypos += size * 2
        break
      case 20:
        this.xpos += size * 2
        break
      case 30:
        this.ypos -= size * 2
        break
    }
  }

  update() {
    if (this.currentAngle <= this.minAngle) {
      this.angleChangingState = INCREASING
    } else if (this.currentAngle >= this.maxAngle) {
      this.angleChangingState = DECREASING
    }
  }

  move() {
    if (this.angleChangingState == INCREASING) {
      this.currentAngle += this.speed
    } else {
      this.currentAngle -= this.speed
    }
  }

  draw() {
    noStroke()
    translate(this.xpos,this.ypos)
    rotate(radians(this.currentAngle))
    fill(50, 50, 255)
    arc(size*0.5, 0, 80, 80, radians(-50), radians(50))
    fill(0, 0, 0)
    rect(-size*0.4,-size*0.25,size,size/2)
    resetMatrix()
  }

  testCollisionWithPlayer() {
    let playerPosition = player.getPosition()
    let horizontalDistance = this.xpos - playerPosition[0]
    let verticalDistance = this.ypos - playerPosition[1]
    let distance = Math.sqrt(horizontalDistance ** 2 + verticalDistance ** 2)
    let playerAngle = degrees(Math.atan(verticalDistance / horizontalDistance))
    if(horizontalDistance >= 0){
      playerAngle+= 180
    }
    playerAngle = (playerAngle+360)%360
    return distance < size*.5+40 && playerAngle < this.currentAngle+50 && playerAngle > this.currentAngle-50
  }
}