class Map {
  constructor(map, props) {
    this.map = map
    this.props = props
    this.ySize = this.map.length
    this.xSize = this.map[0].length
    this.sprites = []
    this.prepareProps()
  }

  updateProps() {
    for (let g = 0; g < this.loadedProps.length; g++) {
      this.loadedProps[g].update()
      this.loadedProps[g].move()
    }
  }

  draw() {
    for (let y = 0; y < this.ySize; y++) {
      let currentRow = this.map[y]
      for (let x = 0; x < this.xSize; x++) {
        switch (currentRow[x][0]) {
          case 0:
            this.drawWall(x, y, currentRow[x][1], currentRow[x][2])
            break
          case 1:
            this.drawEmptySpace(x, y, currentRow[x][1])
            break
        }
      }
    }
    for (let g = 0; g < this.loadedProps.length; g++) {
      this.loadedProps[g].draw()
    }
  }

  prepareProps() {
    this.loadedProps = []
    for (let p = 0; p < this.props.length; p++) {
      let currentProp = this.props[p]
      switch (currentProp[0]) {
        case 0:
          this.player = new Player(currentProp[1][0] * 4 * size + guiBorder + size * 2, currentProp[1][1] * 4 * size + guiBorder + size * 2)
          break
        case 1:
          let pathPositions = []
          for (let pp = 1; pp < currentProp.length; pp++) {
            pathPositions.push([currentProp[pp][0] * 40 + guiBorder + 20, currentProp[pp][1] * 40 + guiBorder + 20])
          }
          this.loadedProps.push(new Guard(pathPositions))
          break
        case 2:
          currentProp.shift()
          switch (currentProp.shift()) {
            case 0:
              this.loadedProps.push(new WallCamera(currentProp))
              break
            case 1:
              this.loadedProps.push(new TurningRoofCamera(currentProp))
              break
            case 2:
              this.loadedProps.push(new RandomRoofCamera(currentProp))
              break
          }
      }
    }
  }

  positionIsFree(xpos, ypos) {
    let x = Math.floor(xpos / (4 * size))
    let y = Math.floor(ypos / (4 * size))
    if (this.map[y][x][0] == 0) {
      return false
    }
    return true
  }

  drawWall(x, y, type, style) {
    switch (type) {
      case 0:
        image(wallImages[0][style], guiBorder + x * size * 4, guiBorder + y * size * 4, size * 4, size * 4)
        break
      case 1:
        image(wallImages[1], guiBorder + x * size * 4, guiBorder + y * size * 4, size * 4, size * 4)
        break
    }
  }

  drawEmptySpace(x, y, type) {
    image(floorImages[0], guiBorder + x * size * 4, guiBorder + y * size * 4, size * 4, size * 4)
  }

  spawnPlayer() {
    player = this.player
  }
}
