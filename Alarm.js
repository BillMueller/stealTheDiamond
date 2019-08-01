class Alarm{
  constructor(strength, duration){
    this.strengthDepltetion = strength/duration
    this.strength = strength
    this.duration = duration
  }

  update(){
    this.strength -= strengthDepltetion
  }

  getStrength(){
    return this.strength
  }
}
