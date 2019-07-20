class GUI {
  constructor() {

  }

  draw() {
    this.drawGUIBorder()
    this.drawStaminaBar()
  }

  drawStaminaBar() {
    textSize(guiBorder / 2)
    noStroke()
    fill(0, 0, 0)
    text("Stamina", width - guiBorder * 6, height - guiBorder * 0.75)
    stroke(0, 0, 0)
    strokeWeight(guiBorder / 12.5)
    noFill()
    rect(width - guiBorder * 4.75, height - guiBorder * 1.25, guiBorder * 4, guiBorder * 0.75)
    strokeWeight(guiBorder / 25)
    fill(25, 50, 255)
    rect(width - guiBorder * 4.75, height - guiBorder * 1.25, stamina * guiBorder / maxStamina * 4, guiBorder * 0.75)
  }

  drawGUIBorder() {
    for (let x = 0; x < width / 50; x++) {
      image(outsideImage, x * 50, 0, 50, guiBorder)
    }
    for (let y = 0; y < height / 50; y++) {
      image(outsideImage, 0, y * 50, guiBorder, 50)
    }
    for (let y = 0; y < height / 50; y++) {
      image(outsideImage, width, y * 50, -guiBorder, 50)
    }
    for (let y = 0; y < 2; y++) {
      for (let x = 0; x < width / 50; x++) {
        image(outsideImage, x * 50, height-(guiBorder*y), 50, -guiBorder)
      }
    }
  }

  updateStaminaBar() {
    if (stamina < maxStamina) {
      stamina++
      if (!playerMoves) {
        stamina += 2
      }
    }
    if (stamina > maxStamina) {
      stamina = maxStamina
    }
  }
}
