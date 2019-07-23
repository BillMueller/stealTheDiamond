class Guard {
  constructor(movementPath) {
    this.xpos = movementPath[0][0]
    this.ypos = movementPath[0][1]
    this.currentPathID = 0
    this.facing = UP
    this.movementPath = movementPath
    this.update()
    this.target = this.facing
  }

  draw() {
    //this.drawMovementPoints()
    noStroke()
    fill(50, 50, 255)
    arc(this.xpos, this.ypos, 80, 80, radians(this.facing * 9 - 70), radians(this.facing * 9 + 70))
    stroke(0, 0, 0)
    strokeWeight(size)
    point(this.xpos, this.ypos)
  }

  update() {
    if (this.xpos == this.movementPath[this.currentPathID][0] && this.ypos == this.movementPath[this.currentPathID][1]) {
      this.currentPathID = (this.currentPathID + 1) % this.movementPath.length
    }
    if (this.facing != this.target) {
      if (this.facing == 30 && this.target == 0) {
        this.facing = -10
      }
      if (this.facing == 0 && this.target == 30) {
        this.facing = 40
      }
      if (this.target > this.facing) {
        this.facing += .5
      } else {
        this.facing -= .5
      }
    } else if (this.xpos == this.movementPath[this.currentPathID][0]) {
      if (this.ypos > this.movementPath[this.currentPathID][1]) {
        this.target = UP
      } else {
        this.target = DOWN
      }
    } else if (this.ypos == this.movementPath[this.currentPathID][1]) {
      if (this.xpos > this.movementPath[this.currentPathID][0]) {
        this.target = LEFT
      } else {
        this.target = RIGHT
      }
    } else {
      console.error("Error with moving path!")
    }
  }

  move() {
    if (this.facing == this.target) {
      switch (this.facing) {
        case UP:
          this.ypos--
          break
        case DOWN:
          this.ypos++
          break
        case LEFT:
          this.xpos--
          break
        case RIGHT:
          this.xpos++
          break
      }
    }
  }

  drawMovementPoints() {
    for (let mp = 0; mp < this.movementPath.length; mp++) {
      strokeWeight(5)
      stroke(0, 0, 0)
      point(this.movementPath[mp][0], this.movementPath[mp][1])
    }
    stroke(255, 0, 0)
    point(this.movementPath[this.currentPathID][0], this.movementPath[this.currentPathID][1])
  }



  //testCollisionWithPlayer() {
  //  let playerPosition = player.getPosition()
  //  let horizontalDistance = Math.abs(this.xpos - playerPosition[0])
  //  let verticalDistance = Math.abs(this.ypos - playerPosition[1])
  //  let playerAngle = degrees(Math.atan(verticalDistance / horizontalDistance))
  //  if ((horizontalDistance == 0 && verticalDistance == 0) || ((Math.sqrt(horizontalDistance ** 2 + verticalDistance ** 2) < 40) && ((this.facing == RIGHT && playerAngle < 60 && this.xpos-playerPosition[0] < 0) || (this.facing == LEFT && playerAngle < 60 && this.xpos-playerPosition[0] > 0) || (this.facing == DOWN && playerAngle > 30 && this.ypos-playerPosition[1] < 0) || (this.facing == UP && playerAngle > 30 && this.ypos-playerPosition[1] > 0)))) {
  //    return true
  //  }
  //  return false
  //}

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
    return distance < size*.5+40 && playerAngle < this.facing*9+70 && playerAngle > this.facing*9-70
  }
}
