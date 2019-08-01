const guiBorder = 50
const size = 10
let maps = []
let player
let playerMoves = false
let currentMap
let gui
let sprint = false
let wallImages = []
let floorImages = []
let outsideImage
const EASY = 0
const MEDIUM = 1
const HARD = 2
let difficulty = MEDIUM
let power = true
const maxStamina = 500
let stamina = maxStamina
let caution
//const maxCaution = 1000
//const minCaution = maxCaution/5*difficulty
//let caution = minCaution
const HORIZONTAL = true
const VERTICAL = false
const UP = 30
const RIGHT = 0
const DOWN = 10
const LEFT = 20
const INCREASING = true
const DECREASING = false
const CLOCKWISE = true
const ANTICLOCKWISE = false
const SENSOR = 0
const CAMERA = 1
const GUARD = 2
const POWER = 3
let gameOver = false

//maps:

const map1 = ["0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0", "0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0", "0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0", "0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0", "0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0", "0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0", "0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0", "0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0", "0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0", "0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0", "0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0", "0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0", "0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0", "0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0", "0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0", "0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0", "0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0", "0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0", "0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0", "0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0,", ""]

const testMap = [
  "0,0,0;0,0,1;0,0,3;0,0,0;0,0,0;0,0,1;0,0,2;0,0,2;0,0,3;0,0,1,0;0,0,0;0,0,2;0,0,3;0,0,0",
  "0,0,0;0,1;0,1,1;0,1;0,1,0;0,1,1;0,1;0,1,1;0,1;0,1,1;0,1;0,1,3;0,1;0,0,0",
  "0,0,3;0,1;1,0;1;0,1;0,1,2;1,0;1;0,1;0,1,3;1,0;1;0,1;0,0,2",
  "0,0,3;0,1;1,0;1;0,1;0,1,3;1,0;1;0,1;0,1,3;1,0;1;0,1;0,0,0",
  "0,0,1;0,1;1,0;1;1,0;1;1,0;1;0,1;0,1,3;1,0;1;0,1;0,0,0",
  "0,0,3;0,1;1,0;1;1,0;1;1,0;1;0,1,1;0,1;1,0;1;0,1;0,0,1",
  "0,0,0;0,1;1,0;1;0,1;0,1,2;1,0;1;0,1;0,1,3;1,0;1;0,1;0,0,2",
  "0,0,1;0,1;1,0;1;0,1;0,1,3;1,0;1;0,1;0,1,3;1,0;1;0,1;0,0,0",
  "0,0,2;0,1;0,1,3;0,1;0,1,0;0,1,2;0,1;0,1,3;0,1;0,1,3;0,1;0,1,3;0,1;0,0,3",
  "0,0,0;0,0,1;0,0,3;0,0,2;0,0,2;0,0,1;0,0,0;0,0,1;0,0,1;0,0,0;0,0,2;0,0,3;0,0,1;0,0,2",
  "0,3.3;2,0,7.2.20,40.40.5;1,2.2,2.7,3.7,3.5,6.5,6.7,7.7,7.2,6.2,6.4,3.4,3.2;2,1,3.5,0.5;2,2,6.5,5;3,5.4.1;4,7.7.2"
]

const availableMaps = [map1, testMap]

function preload() {
  loadMaps()
  wallImages = loadWallImages()
  floorImages = loadFloorImages()
  outsideImage = loadGuiOutsideImage()
}

function setup() {
  createCanvas(1100, 750)
  frameRate(60)
  currentMap = maps[1]
  currentMap.spawnPlayer()
  gui = new GUI()
  textAlign(CENTER)
  caution = new Caution()
}

function draw() {
  if (!gameOver) {
    preRender()
    update()
    render()
  } else {
    window.alert("go")
  }
}

//---

function preRender() {
  background(255, 255, 255)
}

function update() {
  updateInput()
  gui.updateStamina()
  currentMap.updateProps()
}

function render() {
  currentMap.draw()
  player.draw()
  gui.draw()
}
