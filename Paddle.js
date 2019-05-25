class Paddle {
  constructor(x_coordinate, y_coordinate, width, height, score) {
    this.position = { x: x_coordinate, y: y_coordinate };
    this.dimension = { width: width, height: height };
    this.score = score;
  }
  show(color) {
    noStroke();
    fill(color);
    rect(
      this.position.x,
      this.position.y,
      this.dimension.width,
      this.dimension.height
    );
  }
  updatePosition(x, y) {
    if (y > screen_height - this.dimension.height) {
      y = screen_height - this.dimension.height;
    } else if (y < 0) {
      y = 0;
    }
    this.position.y = y;
    if (x > screen_width - this.dimension.width) {
      x = screen_width - this.dimension.width;
    } else if (x < 0) {
      x = 0;
    }
    this.position.x = x;
  }
}
