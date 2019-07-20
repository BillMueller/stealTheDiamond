class Guard {
  constructor(movementPath) {
    this.xpos = movementPath[0][0]
    this.ypos = movementPath[0][1]
    this.currentPathID = 0
    this.facing = UP
    this.movementPath = movementPath
  }

  draw() {
    stroke(0, 0, 255)
    strokeWeight(size)
    point(this.xpos, this.ypos)
  }

  updateFacing() {
    if (this.xpos == this.movementPath[this.currentPathID][0] && this.ypos == this.movementPath[this.currentPathID][1]) {
      this.currentPathID = (this.currentPathID + 1) % this.movementPath.length
    }
    if (this.xpos == this.movementPath[this.currentPathID][0]) {
      if (this.ypos > this.movementPath[this.currentPathID][1]) {
        this.facing = UP
      } else {
        this.facing = DOWN
      }
    } else if (this.ypos == this.movementPath[this.currentPathID][1]) {
      if (this.xpos > this.movementPath[this.currentPathID][0]) {
        this.facing = LEFT
      } else {
        this.facing = RIGHT
      }
    } else {
      console.error("Error with moving path!")
    }
  }

  move() {
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
