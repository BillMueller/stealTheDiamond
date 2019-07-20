function updateInput(){
  if (keyIsDown(32)){ // space key
    player.sprint()
  }else{
    player.resetSprint()
  }

  if (keyIsDown(65) || keyIsDown(37)) { // a key or left arrow
    player.moveLeft()
  }

  if (keyIsDown(68) || keyIsDown(39)) { // d key or rigth arrow
    player.moveRigth()
  }

  if (keyIsDown(87) || keyIsDown(38)) { // w key or up arrow
    player.moveUp()
  }

  if (keyIsDown(83) ||  keyIsDown(40)) { // d key or down arrow
    player.moveDown()
  }
}
