class Sprite {
  // Use {} for the argument of constructor is to benefit form the key: value form,
  // for it can illustrate the name of the argument we are manipulating, provides solid readability.
  // Down to the code which const background to check it out.
  constructor({
    anchorPoint,
    imageSrc,
    frameRate = 1,
    frameBuffer,
    scale = 1,
  }) {
    // Just like the Player class.
    this.anchorPoint = anchorPoint;
    // Create a instance of Image() class, then this.image can use the stuff inside the built-in class: Image().
    this.image = new Image();
    // Set the image src.
    this.image.src = imageSrc;
    // Solve sometimes character won't show up after F5 fresh.
    this.loaded = false;
    // Get the original size of the image.
    this.image.onload = () => {
      this.width = (this.image.width / this.frameRate) * this.scale;
      this.height = this.image.height * this.scale;
      this.loaded = true;
    };
    // Slow down the movement.
    this.frameRate = frameRate;
    this.currentFrame = 0;
    this.frameBuffer = frameBuffer;
    this.elapsedFrame = 0;
    // Shrink the character.
    this.scale = scale;
  }

  // Introduce a way to draw image on the canvas.
  draw() {
    // Read the rest before read this line.
    // This line of code provides errors, if this.image doesn't exists, return.
    if (!this.image) {
      return;
    }
    // cropping the idle image.
    const cropbox = {
      anchorPoint: {
        x: this.currentFrame * (this.image.width / this.frameRate),
        y: 0,
      },
      width: this.image.width / this.frameRate,
      height: this.image.height,
    };
    // canvas 2d API.
    c.drawImage(
      this.image,
      cropbox.anchorPoint.x,
      cropbox.anchorPoint.y,
      cropbox.width,
      cropbox.height,
      this.anchorPoint.x,
      this.anchorPoint.y,
      this.width,
      this.height
    );
  }

  updateFrames() {
    if (this.elapsedFrame % this.frameBuffer === 0) {
      if (this.currentFrame < this.frameRate - 1) {
        this.currentFrame++;
      } else {
        this.currentFrame = 0;
      }
    }
    this.elapsedFrame++;
  }

  execute() {
    this.draw();
  }
}
