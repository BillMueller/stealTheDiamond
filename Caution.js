class Caution {
  constructor() {
    this.maxCaution = 1000
    this.minCaution = this.maxCaution / 5 * difficulty
    this.caution = this.minCaution
    this.alarms = []
  }

  getCaution() {
    return this.caution
  }

  getMaxCaution() {
    return this.maxCaution
  }

  getMinCaution() {
    return this.minCaution
  }

  addCaution(type) {
    switch (type) {
      case SENSOR:
      this.alarms.push(new Alarm(50,500*(difficulty+1)))
        break
      case CAMERA:
      this.alarms.push(new Alarm(100,500*(difficulty+1)))
        break
      case GUARD:
      this.alarms.push(new Alarm(100,3000*(difficulty+1)))
        break
      case POWER:
      this.alarms.push(new Alarm(150,5000*(difficulty+1)))
        break
    }
  }
}
