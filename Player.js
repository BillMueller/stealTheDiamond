class Player {
  constructor(xpos, ypos) {
    this.xpos = xpos
    this.ypos = ypos
    this.sprintIsActive = false
  }

  draw() {
    stroke(0, 0, 0)
    strokeWeight(size)
    point(this.xpos, this.ypos)
  }

  moveUp() {
    if (currentMap.positionIsFree(this.xpos - guiBorder, this.ypos - 1 - (size / 2) - guiBorder)) {
      this.ypos--
      playerMoves = true
      if (sprint && stamina > 5 && currentMap.positionIsFree(this.xpos - guiBorder, this.ypos - 1 - (size / 2) - guiBorder)) {
        this.ypos--
        if (!this.sprintIsActive) {
          stamina -= 6
          this.sprintIsActive = true
        }
      }
    }
  }

  moveDown() {
    if (currentMap.positionIsFree(this.xpos - guiBorder, this.ypos + 1 + (size / 2) - guiBorder)) {
      this.ypos++
      playerMoves = true
      if (sprint && stamina > 5 && currentMap.positionIsFree(this.xpos - guiBorder, this.ypos + 1 + (size / 2) - guiBorder)) {
        this.ypos++
        if (!this.sprintIsActive) {
          stamina -= 6
          this.sprintIsActive = true
        }
      }
    }
  }

  moveLeft() {
    if (currentMap.positionIsFree(this.xpos - 1 - (size / 2) - guiBorder, this.ypos - guiBorder)) {
      this.xpos--
      playerMoves = true
      if (sprint && stamina > 5 && currentMap.positionIsFree(this.xpos - 1 - (size / 2) - guiBorder, this.ypos - guiBorder)) {
        this.xpos--
        if (!this.sprintIsActive) {
          stamina -= 6
          this.sprintIsActive = true
        }
      }
    }
  }

  moveRigth() {
    if (currentMap.positionIsFree(this.xpos + 1 + (size / 2) - guiBorder, this.ypos - guiBorder)) {
      this.xpos++
      playerMoves = true
      if (sprint && stamina > 5 && currentMap.positionIsFree(this.xpos + 1 + (size / 2) - guiBorder, this.ypos - guiBorder)) {
        this.xpos++
        if (!this.sprintIsActive) {
          stamina -= 6
          this.sprintIsActive = true
        }
      }
    }
  }

  sprint() {
    sprint = true
    this.sprintIsActive = false
    playerMoves = false
  }

  resetSprint() {
    sprint = false
    this.sprintIsActive = false
    playerMoves = false
  }

  getPosition(){
    return [this.xpos,this.ypos]
  }
}
