class Paddle {
  constructor(x_coordinate, y_coordinate, width, height, score) {
    this.position = { x: x_coordinate, y: y_coordinate };
    this.dimension = { width: width, height: height };
    this.score = score;
  }
  show(color) {
    push();
    noStroke();
    fill(color);
    rect(
      this.position.x,
      this.position.y,
      this.dimension.width,
      this.dimension.height
    );
    pop();
  }
  updatePosition(x, y){
    this.position.x = x;
    this.position.y = y;
  }
  update(x, y) {
    if (y > _GAME_HEIGHT - this.dimension.height) {
      y = _GAME_HEIGHT - this.dimension.height;
    } else if (y < 0) {
      y = 0;
    }
    if (x > _GAME_WIDTH - this.dimension.width) {
      x = _GAME_WIDTH - this.dimension.width;
    } else if (x < 0) {
      x = 0;
    }
    this.updatePosition(x, y);
  }
}
