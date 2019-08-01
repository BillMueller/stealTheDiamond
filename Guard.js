class Guard {
  constructor(movementPath) {
    this.xpos = movementPath[0][0]
    this.ypos = movementPath[0][1]
    this.currentPathID = 0
    this.facing = UP
    this.movementPath = movementPath
    this.target = this.facing
    this.caution = caution
    this.maxCautionDepletionRate = (3 - difficulty + Math.random()) * 0.5
    this.cautionDepletionRate = this.maxCautionDepletionRate
    this.maxStamina = 100
    this.stamina = this.maxStamina
    this.chasing = false
  }

  draw() {
    //if (difficulty != HARD) {
    this.drawVisionArea()
    //}
    stroke(0, 0, 0)
    strokeWeight(size)
    point(this.xpos, this.ypos)
  }

  update() {
    if (this.chasing) {
      let playerPosition = player.getPosition()
      let horizontalDistance = this.xpos - playerPosition[0]
      let verticalDistance = this.ypos - playerPosition[1]
      let playerAngle = degrees(Math.atan(verticalDistance / horizontalDistance))
      if (horizontalDistance >= 0) {
        playerAngle += 180
      }
      playerAngle = (playerAngle + 360) % 360
      this.turning = playerAngle / 9
      if (this.facing != this.turning) {
        if (Math.abs(this.facing - this.turning > 20)) {
          if (this.facing < this.turning) {
            this.facing += 40
          }
          if (this.facing > this.turning) {
            this.facing -= 40
          }
        }
        if (this.facing < this.turning) {
          this.facing++
        }
        if (this.facing > this.turning) {
          this.facing--
        }
      }
    } else {
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
      } else if (this.ypos != this.movementPath[this.currentPathID][1]) {
        if (this.ypos > this.movementPath[this.currentPathID][1]) {
          this.target = UP
        } else {
          this.target = DOWN
        }
      } else if (this.xpos != this.movementPath[this.currentPathID][0]) {
        if (this.xpos > this.movementPath[this.currentPathID][0]) {
          this.target = LEFT
        } else {
          this.target = RIGHT
        }
      } else {
        console.error("You're a wizzard, Harry")
      }
    }
    this.updateCaution()
    if (this.testCollisionWithPlayer()) {
      gameOver = true
    }
  }

  move() {
    if (this.chasing) {
      let playerPosition = player.getPosition()
      if (this.xpos < playerPosition[0]) {
        this.xpos += 1
      } else if (this.xpos > playerPosition[0]) {
        this.xpos -= 1
      }
      if (this.ypos < playerPosition[1]) {
        this.ypos += 1
      } else if (this.ypos > playerPosition[1]) {
        this.ypos -= 1
      }
    } else {
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
  }

  updateCaution() {
    if (this.testPlayerVision()) {
      this.caution = caution.getMaxCaution()
      this.cautionDepletionRate = 0
      this.chasing = true
    } else {
      this.chasing = false
      if (this.caution > caution.getMinCaution()) {
        this.caution -= this.cautionDepletionRate
      } else if (this.caution != caution.getMinCaution()) {
        this.caution = caution.getMinCaution()
      }
      if (this.cautionDepletionRate < this.maxCautionDepletionRate) {
        this.cautionDepletionRate += this.maxCautionDepletionRate / ((difficulty + 1) * 3000)
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

  drawVisionArea() {
    noStroke()
    fill(0, 0, 255, 150)
    arc(this.xpos, this.ypos, 75 + this.caution / 30, 75 + this.caution / 30, radians(this.facing * 9 - 70), radians(this.facing * 9 + 70))
  }

  testPlayerVision() {
    let playerPosition = player.getPosition()
    let horizontalDistance = this.xpos - playerPosition[0]
    let verticalDistance = this.ypos - playerPosition[1]
    let distance = Math.sqrt(horizontalDistance ** 2 + verticalDistance ** 2)
    let playerAngle = degrees(Math.atan(verticalDistance / horizontalDistance))
    if (horizontalDistance >= 0) {
      playerAngle += 180
    }
    playerAngle = (playerAngle + 360) % 360
    return distance < size * .5 + (75 + this.caution / 30) / 2 && playerAngle < this.facing * 9 + 70 && playerAngle > this.facing * 9 - 70
  }

  testCollisionWithPlayer() {
    let playerPosition = player.getPosition()
    let horizontalDistance = this.xpos - playerPosition[0]
    let verticalDistance = this.ypos - playerPosition[1]
    let distance = Math.sqrt(horizontalDistance ** 2 + verticalDistance ** 2)
    return distance < 10
  }
}
