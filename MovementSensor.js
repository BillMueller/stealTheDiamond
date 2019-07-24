class MovementSensor{
  constructor(data){

  }

  loadData(data) {
    this.xpos = data[0][0] * size * 4 + guiBorder + size * 2
    this.ypos = data[0][1] * size * 4 + guiBorder + size * 2
    this.facing = data[0][2]
  }

  update(){

  }

  move(){

  }

  draw(){
    translate(this.xpos,this.ypos)
    rotate((facing%20)*size/5)
    rect()
  }
}
