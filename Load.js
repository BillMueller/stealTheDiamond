function loadMaps() {
  for (mID = 0; mID < availableMaps.length; mID++) {
    let loadedMap = []
    let currentMap = availableMaps[mID]
    let currentMapFormat = [currentMap[0].split(";").length, currentMap.length]
    for (line = 0; line < currentMap.length-1; line++) {
      let loadedLine = []
      currentLine = currentMap[line].split(";")
      if (currentLine.length == currentMapFormat[0]) {
        for (field = 0; field < currentLine.length; field++) {
          currentField = currentLine[field].split(",")
          let loadedField = []
          for (let attr = 0; attr < currentField.length; attr++) {
            loadedField.push(parseInt(currentField[attr]))
          }
          loadedLine.push(loadedField)
        }
        loadedMap.push(loadedLine)
      } else {
        console.error("Map " + mID + " string broken in line " + (line + 1) + "! Length is only " + currentLine.length + " (expected " + currentMapFormat[0] + ")");
        line = currentMap.length + 1
      }
    }
    let loadedProps = []
    let props = currentMap[currentMap.length-1].split(";")

    for(let p = 0; p < props.length; p++){
      loadedProps.push(stringListToInteregerList(props[p].split(",")))
    }

    if (line == currentMap.length-1) {
      maps.push(new Map(loadedMap, loadedProps))
    }
  }
}

function loadWallImages(){
  let returnImages =[]
  returnImages.push(loadGrass())
  returnImages.push(loadWalls())
  return returnImages
}

function loadFloorImages(){
  let returnImages =[]
  returnImages.push(loadFloor())
  return returnImages
}

function loadGrass() {
  let imageList = []
  for(i = 0; i < 4; i++){
    imageList.push(loadImage("assets/grass" + i +".png"))
  }
  return imageList
}

function loadWalls(){
  return loadImage("assets/wall.png")
}

function loadFloor(){
  return loadImage("assets/floor.jpg")
}

function loadGuiOutsideImage(){
  return loadImage("assets/outside.png")
}

function stringListToInteregerList(stringList){
  let intList = []
  for(let s = 0; s < stringList.length; s++){
    if(stringList[s].includes(".")){
      let splittedStringList = stringList[s].split(".")
      let partialIntList = []
      for(let ssl = 0; ssl < splittedStringList.length; ssl++){
        partialIntList.push(parseInt(splittedStringList[ssl]))
      }intList.push(partialIntList)
    }else{
    intList.push(parseInt(stringList[s]))
  }
  }
  return intList
}
