class Guard {
  constructor(movementPath) {
    this.xpos = movementPath[0][0]
    this.ypos = movementPath[0][1]
    this.currentPathID = 0
    this.facing = UP
    this.movementPath = movementPath
    this.updateFacing()
    this.target = this.facing
  }

  draw() {
    this.drawMovementPoints()
    stroke(0, 0, 255)
    strokeWeight(size)
    point(this.xpos, this.ypos)
    strokeWeight(size / 3)
    let v = p5.Vector.fromAngle(radians(this.facing*9), 30);
    let vx = v.x;
    let vy = v.y;
    point(this.xpos+vx, this.ypos+v.y)
  }

  updateFacing() {
    if (this.xpos == this.movementPath[this.currentPathID][0] && this.ypos == this.movementPath[this.currentPathID][1]) {
      this.currentPathID = (this.currentPathID + 1) % this.movementPath.length
    }
    if (this.facing != this.target) {
      if(this.facing == 30 && this.target == 0){
        this.facing = -10
      }
      if(this.facing == 0 && this.target == 30){
        this.facing = 40
      }
      if (this.target > this.facing) {
          this.facing++
      } else {
        this.facing--
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

  drawMovementPoints(){
    for(let mp = 0; mp < this.movementPath.length; mp++){
      strokeWeight(5)
      stroke(0,0,0)
      point(this.movementPath[mp][0], this.movementPath[mp][1])
    }
    stroke(255,0,0)
    point(this.movementPath[this.currentPathID][0], this.movementPath[this.currentPathID][1])
  }
}
